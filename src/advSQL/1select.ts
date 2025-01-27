import { executeQuery } from "../utils";

export async function selectNow() {
    const result = await executeQuery(async (client) => {
        // return await client.query(`SELECT * from customers;`)
        // return await client.query(`SELECT * from customers WHERE customer_id = 1;`)
        // return await client.query(`SELECT * from customers ORDER BY first_name;`) // sort by first name in ascending order
        // return await client.query(`SELECT * from customers ORDER BY first_name DESC;`) // sort by first name in descending order


        // -----SELECT CLOUSE ----- //
        
        // return await client.query(`
        //     SELECT first_name, last_name, points FROM customers;
        // `)

        return await client.query(`
            SELECT 
                first_name, 
                last_name, 
                points, 
                points * 0.1 AS "discount amount"
            FROM customers
        `)




    }); 
    console.log(result.rows);
    console.log('🎉 Done 🎉');
}