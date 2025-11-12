/* eslint-disable no-console */
import app from "./app";
import { Server } from "http";
import  mongoose  from 'mongoose';
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server 

const startServer = async () => {
    try {
        await mongoose.connect("mongodb+srv://NoteApp:4LmlGoSh3LQZttua@cluster0.njtaw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Connected To db");
        server = app.listen(envVars.PORT, () => {
            console.log(`Server is Running on ${envVars.PORT}`);
        });
          
    } catch (error) {
        console.log(error);
    }
}



(async()=>{
await startServer()
await  seedSuperAdmin()
})()

process.on("unhandledRejection", (err) => {
    console.log("unhandledRejection detected.... Server shutting down",err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }

    process.exit(1)
});


process.on("uncaughtException", (err) => {
    console.log("uncaughtException detected.... Server shutting down",err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }

    process.exit(1)
});

process.on("SIGTERM", (err) => {
    console.log("SIGTERM Signal Recived.... Server shutting down",err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1)
});