import { Client } from 'pg';

export async function getClient() {
    const client = new Client("postgres://szoisduf:qgtVVbsC9_1qXFBx4KBBpYsmMhj4RvO3@flora.db.elephantsql.com/szoisduf");
    await client.connect();
    return client;
}