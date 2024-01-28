import { sql } from '~~/server/db/index';

export type authenModel = {
  F_NAME: string;
  L_NAME: string;
  EMAIL: string;
  PASSWORD: string;
};

export const readauthen = async () => {
  const result = await sql({
    query: 'SELECT * FROM authen'
  });

  return result as authenModel[];
};

export const createauthen = async (dataA: Pick<authenModel, 
  'F_NAME'| 'L_NAME' | 'EMAIL' | 'PASSWORD'
  >) => {
  const result = (await sql({
    query: 'INSERT INTO authen(F_NAME, L_NAME,EMAIL,PASSWORD) VALUES (?,?,?,?)',
    values: [dataA.F_NAME,dataA.L_NAME,dataA.EMAIL,dataA.PASSWORD]
  })) as any;

  console.log('ss');

  return result.length === 1 ? (result[0] as authenModel) : null;
};

export const moveauthen = async (EMAIL: string) => {
  await sql({
    query: 'INSERT INTO admin(EMAIL,PASSWORD) SELECT EMAIL,PASSWORD FROM authen WHERE EMAIL = ?',
    values: [EMAIL]
  });

  return true;
};

export const removeauthen = async (EMAIL: string) => {
  await sql({
    query: 'DELETE FROM authen WHERE EMAIL = ?',
    values: [EMAIL]
  });

  return true;
};

export const Mhisauthen = async (EMAIL: string) => {
  await sql({
    query: 'INSERT INTO history(EMAIL,STATUS)  VALUES (?,?)',
    values: [EMAIL,'Admin']
  });

  return true;
};

export const Dhisauthen = async (EMAIL: string) => {
  await sql({
    query: 'INSERT INTO history(EMAIL,STATUS)  VALUES (?,?)',
    values: [EMAIL,'Delete']
  });

  return true;
};
