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

// Semua users
app.get('/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users');

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// user by ID
app.get('/user', async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

// update user by id
app.put('/user', async (req: Request, res: Response) => {
  const { userId } = req.query;
  const { fullName, email, username, password } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET full_name = $1, email = $2, username = $3, password = $4 WHERE user_id = $5 RETURNING *',
      [fullName, email, username, password, userId]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// delete user by id
app.delete('/user', async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [userId]);

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

// history
app.post('/booking', async (req: Request, res: Response) => {
  const { kursi_id, acara_id, email, shouldFail } = req.body;

  try {
      if (shouldFail) {
          const result = await pool.query(
            'INSERT INTO histories (kursi_id, acara_id, email, waktu, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
              [kursi_id, acara_id, email, new Date(), 'FAILED']
          );
          res.status(200).send({ message: 'History added successfully', history: result.rows[0] });
      } else {
          const result = await pool.query(
              'INSERT INTO histories (kursi_id, acara_id, email, waktu, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
              [kursi_id, acara_id, email, new Date(), 'BOOKED']
          );

          res.status(200).send({ message: 'History added successfully', history: result.rows[0] });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error generating history', error });
  }
});


app.listen(5174, () => {
  console.log('Server is running on port 5174');
});