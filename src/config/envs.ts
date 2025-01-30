import 'dotenv/config';
import * as joi from 'joi';
import { validateEnvVars } from 'shared-kit';

export const envs = validateEnvVars({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
});
