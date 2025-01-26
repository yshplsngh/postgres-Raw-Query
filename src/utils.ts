import { Pool, PoolClient } from 'pg';

class DatabasePool {
    private static instance: Pool | null = null;

    private constructor() {}

    public static getInstance(): Pool {
        if (!DatabasePool.instance) {
            DatabasePool.instance = new Pool({
                user: 'postgres',
                host: 'localhost',
                database: 'postgres',
                password: 'postgres',
                port: 5432,
                max: 20,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 2000,
            });

            DatabasePool.instance.on('error', (err) => {
                console.error('Unexpected error on idle client', err);
            });
        }
        return DatabasePool.instance;
    }

    public static async closePool(): Promise<void> {
        if (DatabasePool.instance) {
            await DatabasePool.instance.end();
            DatabasePool.instance = null;
        }
    }
}

export const getPool = (): Pool => DatabasePool.getInstance();
export const closePool = (): Promise<void> => DatabasePool.closePool();

export async function getClient() {
    try {
        const client = await getPool().connect();
        return client;
    } catch (error) {
        console.error('Error acquiring client from pool:', error);
        throw error;
    }
}

export async function executeQuery<T>(queryFn: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await getClient();
    try {
        return await queryFn(client);
    } finally {
        client.release();
    }
}