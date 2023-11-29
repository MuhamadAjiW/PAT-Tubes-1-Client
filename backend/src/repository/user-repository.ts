import { PostgresConnection } from "../utils/connection";
import { UserRequest } from '../types/UserRequest';

export class UserRepository{

    async createUser(request: UserRequest){
        const result = await PostgresConnection.query(
            'INSERT INTO users (full_name, email, password, username) VALUES ($1, $2, $3, $4) RETURNING *',
            [request.full_name, request.email, request.password, request.username]
          );
        return result.rows[0];
    }

    async getAll(){
        const result = await PostgresConnection.query(
            'SELECT * FROM users'
        );
        return result.rows;
    }

    async getById(user_id: number){
        const result = await PostgresConnection.query(
            'SELECT * FROM users WHERE user_id = $1',
            [user_id]
        );
        return result.rows[0];
    }

    async getByEmail(email: string){
        const result = await PostgresConnection.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return result.rows[0];
    }

    async updateUser(user_id: number, request: UserRequest){
        const result = await PostgresConnection.query(
            'UPDATE users SET full_name = $1, email = $2, username = $3, password = $4 WHERE user_id = $5 RETURNING *',
            [request.full_name, request.email, request.username, request.password, user_id]
        );
        return result.rows[0];
    }

    async deleteUser(user_id: number){
        const result = await PostgresConnection.query(
            'DELETE FROM users WHERE user_id = $1 RETURNING *',
            [user_id]
        );
        return result.rows[0];
    }
}