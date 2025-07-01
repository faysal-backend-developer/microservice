import app from "./app"
import { config } from "./config";


const bootstrap = async () => {
    try {
        app.listen(config.port, () => {
            console.log("User service is running on port 4003");
        })
    } catch (error) {
        console.log(error)
    }
};


bootstrap();