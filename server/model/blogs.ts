import { sql } from '~~/server/db/index';

export type statusModel = {
  INDEX_NUM: string;
  REG: string;
  EDIT: string;
  DESTROY: string;
  TIMEOFS: string;
};

export const readstatus = async () => {
  const result = await sql({
    query: 'SELECT * FROM status'
  });

  return result as statusModel[];
};

export const change_st_reg = async (STU_ID : string) => {
  await sql({
    query: 'UPDATE status SET REG = ? WHERE INDEX_NUM = 1',
    values: [STU_ID]
  });

  return true;
};

export const change_st_edit = async (STU_ID : string) => {
  await sql({
    query: 'UPDATE status SET EDIT = ? WHERE INDEX_NUM = 1',
    values: [STU_ID]
  });

  return true;
};

export const change_st_des = async (STU_ID : string) => {
  await sql({
    query: 'UPDATE status SET DESTROY = ? WHERE INDEX_NUM = 1',
    values: [STU_ID]
  });

  return true;
};

export const reset_st_reg = async () => {
  await sql({
    query: 'UPDATE status SET REG = ? WHERE INDEX_NUM = 1',
    values: ['00000']
  });

  return true;
};

export const reset_st_edit = async () => {
  await sql({
    query: 'UPDATE status SET EDIT = ? WHERE INDEX_NUM = 1',
    values: ['00000']
  });

  return true;
};

export const reset_st_des = async () => {
  await sql({
    query: 'UPDATE status SET DESTROY = ? WHERE INDEX_NUM = 1',
    values: ['00000']
  });

  return true;
};
