import 'module-alias/register'
import fs from "fs"
import dotenv from "dotenv"
import {MongoHelper} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-helper";
import {MONGODB_URI, PORT} from "@/application/config/environment";


if (fs.existsSync(".env")) dotenv.config({ path: ".env" })

MongoHelper.connect(MONGODB_URI).then(async () => {
    console.log("Connected mongoDB")
    const app = (await import('./config/app')).default
    app.listen(PORT, () => console.log("Server an running on port: " + PORT))
}).catch(err => console.log(err))
