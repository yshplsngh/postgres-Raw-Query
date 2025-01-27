import { executeQuery } from "../utils";

export async function selectNow() {
    const result = await executeQuery(async (client) => {
        // return await client.query(`SELECT * from customers;`)
        // return await client.query(`SELECT * from customers WHERE customer_id = 1;`)
        // return await client.query(`SELECT * from customers ORDER BY first_name;`) // sort by first name in ascending order
        // return await client.query(`SELECT * from customers ORDER BY first_name DESC;`) // sort by first name in descending order

        // -----SELECT CLOUSE ----- //
        
    }); 
    console.log(result.rows);
    console.log('🎉 Done 🎉');
}