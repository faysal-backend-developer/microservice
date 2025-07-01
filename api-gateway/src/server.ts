import app from "./app"
import { config } from "./config";


const bootstrap = async () => {
    try {
        app.listen(config.port, () => {
            console.log(`${config.name} is running by port ${config.port}`);
        })
    } catch (error) {
        console.log(error)
    }
};


bootstrap();