import app from "./app"
import { config } from "./config";


const bootstrap = async () => {
    try {
        app.listen(config.port, () => {
            console.log("Auth service is running on port 4004");
        })
    } catch (error) {
        console.log(error)
    }
};


bootstrap();