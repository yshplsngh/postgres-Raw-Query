import express from 'express';
import { getPool, closePool, executeQuery } from './utils';

const app = express();

getPool();

process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    await closePool();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT received. Shutting down gracefully...');
    await closePool();
    process.exit(0);
});

process.on('uncaughtException', async (error) => {
    console.error('Uncaught Exception:', error);
    await closePool();
    process.exit(1);
});

app.listen(3000, async() => {
    console.log('Server is running on port 3000 🎉');
    await selectNow().then(() => {
        process.exit(1);
    });
});



export async function selectNow() {
    const result = await executeQuery(async (client) => {

        return await client.query(`
            -- SELECT * from customers;
            -- SELECT * from customers WHERE customer_id = 1;
            -- SELECT * from customers ORDER BY first_name; // sort by first name in ascending order
            -- SELECT * from customers ORDER BY first_name DESC; // sort by first name in descending order

            -- SELECT CLOUSE
            -- SELECT first_name, last_name, points FROM customers;
            -- SELECT first_name, last_name, points, points * 0.1 AS "discount amount" FROM customers;
            -- SELECT DISTINCT state FROM customers; // it will return unique states
            -- SELECT name, unit_price, unit_price*1.1 AS "new price" from products;

            -- WHERE CLAUSE
            -- SELECT * FROM customers WHERE state='VA';
            SELECT * FROM customers WHERE state!='VA';
        `)
    }); 
    console.log(result.rows);
    console.log('lenght',result.rowCount);
    console.log('🎉 Done 🎉');
}
