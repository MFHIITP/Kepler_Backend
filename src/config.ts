import dotenv from "dotenv"
dotenv.config();

interface envVariablesInterface { 
    JWT_ACCESS_SECRET: string | undefined,
    JWT_REFRESH_SECRET: string | undefined,
    RAZORPAY_KEY_ID: string | undefined,
    RAZORPAY_SECRET: string | undefined,
    PORT: string | undefined,
    REDIS_URL: string | undefined,
    GOOGLE_CLIENT_ID: string | undefined,
    GOOGLE_CLIENT_SECRET: string | undefined,
    GOOGLE_CALLBACK_URL: string | undefined,
    BREVO_API_KEY: string | undefined,
    GMAIL_USER: string | undefined,
    GMAIL_PASS: string | undefined
};

const config: envVariablesInterface = {
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,   
    PORT: process.env.PORT,
    REDIS_URL: process.env.REDIS_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS
}

export default config;