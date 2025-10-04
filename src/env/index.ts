import "dotenv/config";
import {z}from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    JWT_SECRET:z.string(),
    NODE_ENV: z.enum(["dev", "test", "production"]).default("dev")
})

const _env = envSchema.safeParse(process.env);

if(_env.success == false){

    console.log("Invalid Environment Variables  " + _env.error.format());
    throw new Error("Invalid Environment Variables");
}

export const env = _env.data;