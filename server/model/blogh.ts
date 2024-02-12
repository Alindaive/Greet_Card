import { sql } from '~~/server/db/index';

export type historyModel = {
  STU_ID: string;
  EMAIL: string;
  STATUS: string;
  TIMEOFH: string;
};


export const readhistory = async () => {
  const result = await sql({
    query: 'SELECT * FROM history ORDER BY TIMEOFH DESC'
  });

  return result as historyModel[];
};
