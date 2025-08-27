import { createPool } from "mysql2/promise";
import {    DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE} from './config.js';

export const pool = createPool({

    HOST: DB_HOST,
    USER: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    datebase: DB_DATABASE
})