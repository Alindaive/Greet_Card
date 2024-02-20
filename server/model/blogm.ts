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

export const readmemberfil = async (EMAIL: string) => {
  var GRADE = EMAIL.slice(0,1);
  var ROOM = EMAIL.slice(1);
  console.log(GRADE+ROOM);
  const result = await sql({
    query: 'SELECT * FROM member WHERE GRADE = ? AND ROOM = ?',
    values: [GRADE,ROOM]
  });

  return result as memberModel[];
};

export const preeditmember = async (EMAIL: string) => {
  const result = (await sql({
    query: 'SELECT * FROM member WHERE EMAIL = ?',
    values: [EMAIL]
  }))as any;

  return result.length === 1 ? (result[0] as memberModel) : null;
};

export const posteditmember = async (EMAIL: string, data: Pick<memberModel, 'F_NAME' | 'L_NAME' | 'EMAIL' | 'STU_ID'| 'GRADE' | 'ROOM' | 'NUMBER'>) => {
  await sql({
    query: `
      UPDATE member
      SET
        F_NAME = ?,
        L_NAME = ?,
        EMAIL = ?,
        STU_ID = ?,
        GRADE = ?,
        ROOM = ?,
        NUMBER = ?
      WHERE EMAIL = ?
    `,
    values: [data.F_NAME, data.L_NAME, data.EMAIL, data.STU_ID, data.GRADE,data.ROOM,data.NUMBER, EMAIL]
  });

  return await preeditmember(EMAIL);
};

export const Ehismember = async (EMAIL: string) => {
  await sql({
    query: "INSERT INTO history(STU_ID,EMAIL,STATUS) SELECT member.STU_ID,member.EMAIL,'edit' FROM member WHERE member.EMAIL = ?",
    values: [EMAIL]
  });

  return true;
};

export const Lhismember = async (STU_ID: string) => {
  await sql({
    query: "INSERT INTO history(STU_ID,EMAIL,STATUS) SELECT member.STU_ID,member.EMAIL,'login' FROM member WHERE member.STU_ID = ?",
    values: [STU_ID]
  });

  return true;
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
      query: "UPDATE member SET LOGINCOUNT = LOGINCOUNT + 1 , LOGINCHECK = '1' WHERE STU_ID = ?",
      values: [STU_ID]
    })) as any;
  
    return result.length === 1 ? (result[0] as memberModel) : null;
  }catch{
    console.log('sql f');
  }
  };

export const loginc = async (STU_ID: string) => {
    try{
      console.log('sql login check');
      const result = (await sql({
        query: "SELECT LOGINCHECK FROM member WHERE STU_ID = ?",
        values: [STU_ID]
      })) as any;
    
      return result as memberModel[];
    }catch{
      console.log('sql f');
    }
};

export const logincount = async (STU_ID: string) => {
  try{
    //console.log('sql login ss');
    const result = (await sql({
      query: 'SELECT LOGINCOUNT FROM member WHERE STU_ID = ?',
      values: [STU_ID]
    })) as any;
  
    return result as memberModel[];
  }catch{
    console.log('sql f');
  }
};
