import { sql } from '~~/server/db/index';

export type adminModel = {
  EMAIL: string;
  PASSWORD: string;
};


export const readAdmin = async (EMAIL: string) => {
  const result = (await sql({
    query: 'SELECT * FROM admin WHERE EMAIL = ?',
    values: [EMAIL]
  })) as any;

  return result.length === 1 ? (result[0] as adminModel) : null;
};
