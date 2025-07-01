import app from "./app"


const bootstrap = async () => {
    try {
        app.listen(4002, () => {
            console.log("Inventory service is running on port 4002");
        })
    } catch (error) {
        console.log(error)
    }
};


bootstrap();