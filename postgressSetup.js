import pg from "pg";
import dotenv from'dotenv';

dotenv.config();

const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"BlogDite",
    password:process.env.PgPASSWORD,
    port:5432,
})

db.connect();

export default db