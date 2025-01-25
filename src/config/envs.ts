import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
}


const envVarsSchema = joi.object({
    PORT: joi.number().required(),
}).unknown(true);

const { error, value: validatedEnvVars } = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: EnvVars = validatedEnvVars;

export const envs = {
    PORT: envsVars.PORT,
}

