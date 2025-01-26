import { executeQuery } from "../utils";

export async function selectNow() {
    const result = await executeQuery(async (client) => {
        return await client.query('SELECT NOW()');
    });
    // console.log(result);
    console.log('🎉 Done 🎉');
}