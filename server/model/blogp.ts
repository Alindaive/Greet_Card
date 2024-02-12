import { sql } from '~~/server/db/index';

export type pendingModel = {
  STU_ID: string;
  F_NAME: string;
  L_NAME: string;
  GRADE: string;
  ROOM: string;
  NUMBER: number;
  EMAIL: string;
  DATEOFREG: string;
  TIMEOFREG: string;
};


export const read = async () => {
  const result = await sql({
    query: 'SELECT STU_ID, F_NAME, L_NAME, GRADE, ROOM, NUMBER, EMAIL, DATEOFREG ,TIMEOFREG FROM pending'
  });

  return result as pendingModel[];
};

export const create = async (dataP: Pick<pendingModel, 
  'STU_ID' | 'F_NAME'| 'L_NAME' | 'GRADE' | 'ROOM' | 'NUMBER' | 'EMAIL'
  >) => {
  const result = (await sql({
    query: 'INSERT INTO pending (STU_ID, F_NAME, L_NAME, GRADE, ROOM, NUMBER, EMAIL) VALUES (?,?,?,?,?,?,?)',
    values: [dataP.STU_ID,dataP.F_NAME,dataP.L_NAME,dataP.GRADE,dataP.ROOM,dataP.NUMBER,dataP.EMAIL]
  })) as any;

  return result.length === 1 ? (result[0] as pendingModel) : null;
};

export const detail = async (STU_ID: string) => {
  const result = (await sql({
    query: 'SELECT STU_ID, F_NAME, L_NAME, GRADE, ROOM, NUMBER, EMAIL,TIME FROM pending WHERE id = ?',
    values: [STU_ID]
  })) as any;

  return result.length === 1 ? (result[0] as pendingModel) : null;
};

export const remove = async (EMAIL: string) => {
  await sql({
    query: 'DELETE FROM pending WHERE EMAIL = ?',
    values: [EMAIL]
  });

  return true;
};

export const movepending = async (EMAIL: string) => {
  await sql({
    query: 'INSERT INTO member(STU_ID,F_NAME,L_NAME,GRADE,ROOM,NUMBER,EMAIL) SELECT STU_ID,F_NAME,L_NAME,GRADE,ROOM,NUMBER,EMAIL FROM pending WHERE EMAIL = ?',
    values: [EMAIL]
  });

  return true;
};

export const Phispending = async (EMAIL: string) => {
  await sql({
    query: "INSERT INTO history(STU_ID,EMAIL,STATUS) SELECT member.STU_ID,member.EMAIL,'Registor' FROM member WHERE member.EMAIL = ?",
    values: [EMAIL]
    
  });

  return true;
};
