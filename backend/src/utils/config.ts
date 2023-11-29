export const SERVER_API_KEY: string ="clientServerApiToken"
export const SERVER_PORT: number = process.env.PORT? +process.env.PORT : 5174;

export const PG_USER: string = process.env.DB_USER? process.env.DB_USER : 'postgres';
export const PG_HOST: string = process.env.DB_HOST? process.env.DB_HOST : 'client-app-db';
export const PG_NAME: string = process.env.DB_NAME? process.env.DB_NAME : 'clientdb';
export const PG_PASS: string = process.env.DB_PASS? process.env.DB_PASS : 'postgres';
export const PG_PORT: number = process.env.DB_PORT? +process.env.DB_PORT : 5433;

export const RABBITMQ_URL: string = process.env.RABBITMQ_URL? process.env.RABBITMQ_URL : 'amqp://test-user:test-user@central-queue:5672';
export const PAYMENT_SERVER_URL = process.env.PAYMENT_URL? process.env.PAYMENT_URL : 'http://payment-app:8080'
export const BOOKING_SERVER_URL = process.env.CLIENT_URL? process.env.CLIENT_URL: 'http://booking-app:3000'