import { z } from 'zod';
import dotenv from 'dotenv';


process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var isProduction = process.env.NODE_ENV === 'production';
var isDevelopment = process.env.NODE_ENV === 'development';

// Load environment-specific config file based on NODE_ENV
dotenv.config({
    path: isProduction ? '.env.production' : isDevelopment ? '.env.development' : '.env.test'
});


// Define validation schema with Zod
var envSchema = z.object({
    // Node environment
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),

    // Server configuration
    PORT: z.coerce.number().positive().default(3000),
    HOST: z.string().default('localhost'),

    // Database
    DATABASE_URL: z.string().startsWith('postgresql://'),
    DATABASE_POOL_MIN: z.coerce.number().min(0).default(2),
    DATABASE_POOL_MAX: z.coerce.number().positive().default(10),

    // JWT & Authentication
    JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
    JWT_EXPIRES_IN: z.string().default('7d'),
    REFRESH_TOKEN_SECRET: z.string().min(32).optional(),
    REFRESH_TOKEN_EXPIRES_IN: z.string().default('30d'),

    // Security
    BCRYPT_ROUNDS: z.coerce.number().min(10).max(20).default(12),

    // CORS configuration
    CORS_ORIGIN: z
        .string()
        .or(z.array(z.string()))
        .transform((val) => {
        if (typeof val === 'string') {
            return val.split(',').map((origin) => origin.trim())
        }
        return val
        })
        .default([]),

    // Logging
    LOG_LEVEL: z
        .enum(['error', 'warn', 'info', 'debug', 'trace'])
        .default(isProduction ? 'info' : 'debug'),
});

try {
    var env = envSchema.parse(process.env);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.error('Invalid environment variables:', error.errors);
        console.error(
            JSON.stringify(error.flatten((issue) => issue.message).fieldErrors, null, 2)
        )

        // Detailed error messages
        if (error.errors && Array.isArray(error.errors)) {
            error.errors.forEach((err) => {
                const path = err.path.join('.')
                console.error(`  ${path}: ${err.message}`)
            })
        }
        process.exit(1);
    }
    throw error;
}

export const isProd = () => env.NODE_ENV === 'production';
export const isDev = () => env.NODE_ENV === 'development';
export const isTest = () => env.NODE_ENV === 'test';

export default env;
