// server.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Pool } from 'pg';

const pool = new Pool({
        host: 'client-app-db',
        port: 5433,
        user: 'postgres',
        password: 'postgres',
        database: 'client',
      });

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.post('/register', async (req: Request, res: Response) => {
        const { fullName, email, password, username } = req.body;

        try {
                const result = await pool.query(
                'INSERT INTO users (full_name, email, password, username, isAdmin) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [fullName, email, password, username, false]
                );

                res.status(200).send({ message: 'User registered successfully', user: result.rows[0] });
        } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error registering user', error });
              }
        });

app.listen(5174, () => {
  console.log('Server is running on port 5174');
});