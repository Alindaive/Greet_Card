import { createPool } from 'mysql2/promise';

interface Options {
  query: string;
  values?: any[];
}

const pool = createPool({
  host: 'mysql-187897c4-kcice50-9d8d.a.aivencloud.com',
  user: 'avnadmin',
  database: 'greet_card',
  password: 'AVNS_T14WU4AmTF7uU_Wk4oK',
  port: 24293,
});

export const sql = async ({ query, values }: Options) => {
  const [rows] = await pool.query(query, values);
  return rows;
};

