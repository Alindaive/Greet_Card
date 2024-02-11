import { sql } from '~~/server/db/index';

export type adminModel = {
  EMAIL: string;
  PASSWORD: string;
};

export const adminread = async () => {
  const result = await sql({
    query: 'SELECT * FROM admin'
  });

  return result as adminModel[];
};

export const readAdmin = async (EMAIL: string) => {
  const result = (await sql({
    query: 'SELECT * FROM admin WHERE EMAIL = ?',
    values: [EMAIL]
  })) as any;

  return result.length === 1 ? (result[0] as adminModel) : null;
};

export const removeadmin = async (EMAIL: string) => {
  await sql({
    query: 'DELETE FROM admin WHERE EMAIL = ?',
    values: [EMAIL]
  });

  return true;
};
