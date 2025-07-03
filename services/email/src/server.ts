import app from "./app"
import { config } from "./config";


const bootstrap = async () => {
    try {
        app.listen(config.port, () => {
            console.log("Email Service is running on port 4005");
        })
    } catch (error) {
        console.log(error)
    }
};


bootstrap();