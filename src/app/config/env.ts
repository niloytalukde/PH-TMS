/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from "dotenv"

dotenv.config()

interface EnvConfig{
       PORT :string,
    DB_URL:string,
    NODE:"development" | "production"
}

const loadEnvVariable =():EnvConfig=>{
 const requiredEnv : string[] = ["PORT","DB_URL","NODE"]

 requiredEnv.forEach(key=>{
    if(!process.env[key]){
        throw new Error(`Missing required Environment Variable ${key}`)
    }

 })

    return {
    PORT :process.env.PORT !,
    DB_URL:process.env.DB_URL!,
    NODE:process.env.NODE as "development" | "production"

}
}


export const envVars = loadEnvVariable()