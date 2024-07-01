import {config} from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const {MONGODB_URI} = config();

export {MONGODB_URI};