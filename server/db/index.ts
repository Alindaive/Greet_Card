import { createPool } from 'mysql2/promise';

interface Options {
  query: string;
  values?: any[];
}

const pool = createPool({
  host: 'greet-card.cpmkke0quzqm.ap-southeast-2.rds.amazonaws.com',
  user: 'root',
  database: 'greet_card',
  password: 'Root10320790'
});

export const sql = async ({ query, values }: Options) => {
  const [rows] = await pool.query(query, values);
  return rows;
};

