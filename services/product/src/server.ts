import app from "./app"
import { config } from "./config";


const bootstrap = async () => {
    try {
        app.listen(config.port, () => {
            console.log("Product service is running on port 4001");
        })
    } catch (error) {
        console.log(error)
    }
};


bootstrap();