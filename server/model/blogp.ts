import { sql } from '~~/server/db/index';

export type pendingModel = {
  STU_ID: number;
  F_NAME: string;
  L_NAME: string;
  GRADE: string;
  ROOM: string;
  NUMBER: number;
  EMAIL: string;
  TIME: string;
};

export const read = async () => {
  const result = await sql({
    query: 'SELECT STU_ID, F_NAME, L_NAME, GRADE, ROOM, NUMBER, EMAIL, TIME FROM pending'
  });

  return result as pendingModel[];
};

export const create = async (dataP: Pick<pendingModel, 
  'STU_ID' | 'F_NAME'| 'L_NAME' | 'GRADE' | 'ROOM' | 'NUMBER' | 'EMAIL'
  >) => {
  console.log('Ctrl  m ss');
  const result = (await sql({
    query: `
      INSERT INTO pending (
        STU_ID, F_NAME, L_NAME, GRADE, ROOM, NUMBER, EMAIL
      ) VALUES (
        ?,?,?,?,?,?,?
      ) RETURNING *
    `,
    values: ['2','g','g','g','g','g','g']
  })) as any;
  console.log(result);
  return result.length === 1 ? (result[0] as pendingModel) : null;
};

export const detail = async (STU_ID: string) => {
  const result = (await sql({
    query: 'SELECT STU_ID, F_NAME, L_NAME, GRADE, ROOM, NUMBER, EMAIL,TIME FROM pending WHERE id = ?',
    values: [STU_ID]
  })) as any;

  return result.length === 1 ? (result[0] as pendingModel) : null;
};

export const remove = async (STU_ID: string) => {
  await sql({
    query: 'DELETE FROM pending WHERE STU_ID = ?',
    values: [STU_ID]
  });

  return true;
};
