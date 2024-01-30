import { sql } from '~~/server/db/index';

export type memberModel = {
  STU_ID: string;
  F_NAME: string;
  L_NAME: string;
  GRADE: string;
  ROOM: string;
  NUMBER: number;
  EMAIL: string;
  LOGINCOUNT : number;
  LOGINCHECK : string;
  DATEOFMEM: string;
  TIMEOFMEM: string;
};


export const readmember = async () => {
  const result = await sql({
    query: 'SELECT * FROM member'
  });

  return result as memberModel[];
};

export const checkmember = async (STU_ID: string) => {
  const result = await sql({
    query: 'SELECT STU_ID FROM member WHERE STU_ID = ?',
    values: [STU_ID]
  });

  return result as memberModel[];
};

export const removemember = async (EMAIL: string) => {
  await sql({
    query: 'DELETE FROM member WHERE EMAIL = ?',
    values: [EMAIL]
  });

  return true;
};

export const login = async (STU_ID: string) => {
  try{
    //console.log('sql login ss');
    const result = (await sql({
      query: 'UPDATE member SET LOGINCOUNT = LOGINCOUNT + 1 , LOGINCHECK = "1" WHERE STU_ID = ?',
      values: [STU_ID]
    })) as any;
  
    return result.length === 1 ? (result[0] as memberModel) : null;
  }catch{
    console.log('sql f');
  }
  };

  export const loginc = async (STU_ID: string) => {
    try{
      //console.log('sql login ss');
      const result = (await sql({
        query: 'SELECT LOGINCHECK FROM member WHERE STU_ID = ?',
        values: [STU_ID]
      })) as any;
    
      return result as memberModel[];
    }catch{
      console.log('sql f');
    }
    };
