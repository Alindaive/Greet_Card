import { createPool } from 'mysql2/promise';

interface Options {
  query: string;
  values?: any[];
}

const pool = createPool({
  host: 'localhost',
  user: 'root',
  database: 'GREET_CARD',
  password: 'Root'
});

export const sql = async ({ query, values }: Options) => {
  const [rows] = await pool.query(query, values);
  return rows;
};

