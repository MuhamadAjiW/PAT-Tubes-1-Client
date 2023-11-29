// tugas-besar-pat-booking/src/connection.tsx

import { Pool } from 'pg';
import amqp from 'amqplib';
import { PG_HOST, PG_NAME, PG_PASS, PG_PORT, PG_USER, RABBITMQ_URL } from './config';

// Ini harusnya autocommit by default
export const PostgresConnection = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_NAME,
  password: PG_PASS,
  port: PG_PORT, 
});

export class RabbitMQConnection{
  static connection: any;

  static async getConnection() {
    try {
      if(RabbitMQConnection.connection){
        console.log("Already connected to central RabbitMQ");
        return RabbitMQConnection.connection;
      }

      RabbitMQConnection.connection = await amqp.connect(RABBITMQ_URL);
      console.log("Connected to central RabbitMQ");

      return RabbitMQConnection.connection;
    } catch (error) {
      console.log("Failed connecting to RabbitMQ");
      console.log(error);
    }
  }

  static async createChannel(){
    try {
      const connection = await RabbitMQConnection.getConnection();
      const channel = await connection.createChannel();
      return channel;
    } catch (error) {
      console.log("Failed creating RabbitMQ channel");
      console.log(error)
    }
  }
}
