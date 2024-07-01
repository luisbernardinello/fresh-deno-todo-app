import {
    Database,
    MongoClient,

} from "https://deno.land/x/mongo@v0.32.0/mod.ts";

import {MONGODB_URI} from "./config.ts" ;

let db :Database;
async function createMongoDBConnection() {
    try {
        const client = new MongoClient();
        await client.connect(MONGODB_URI);
        console.log("MongoDB connection established...");
        return client.database('todos-app')
    } catch(error) {
        throw new Error(error);
    }

}

db = await createMongoDBConnection();
export {createMongoDBConnection, db};