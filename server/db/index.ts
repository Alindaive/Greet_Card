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
  try{
    console.log('Ctrl  sql ss');
    const [rows] = await pool.query(query, values);
    console.log(rows);
    return rows;
  }catch{
    console.log('Ctrl  sql ss');
  }
};
