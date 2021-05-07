import 'module-alias/register'
import {PORT} from "@/application/config/environment";

async function main() {
    const app = (await import('./config/app')).default
    app.listen(PORT, () => console.log("Server an running on port: " + PORT))
}

main().then(r => r).catch(e => console.log(e))
