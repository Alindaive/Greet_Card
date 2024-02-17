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

export const readhistoryfil = async (EMAIL: string) => {
  var stamemt = "SELECT history.STU_ID, history.EMAIL, history.STATUS,history.TIMEOFH FROM history LEFT JOIN member ON history.STU_ID = member.STU_ID WHERE member.GRADE = ? AND member.ROOM = ? AND history.STATUS like ? ORDER BY history.TIMEOFH DESC"
  var GRADE = EMAIL.slice(0,1);
  var ROOM = EMAIL.slice(1,2);
  var ACTION = EMAIL.slice(2);
  if(ACTION == "All"){ACTION = '%'};
  if(ACTION == "Admin"){stamemt = "SELECT * FROM history WHERE STATUS = 'Admin'"};
  if(ACTION == "Delete"){stamemt = "SELECT * FROM history WHERE STATUS = 'Delete'"};
  console.log(ACTION);
  const result = await sql({
    query: stamemt,
    values: [GRADE,ROOM,ACTION]
  });

  return result as historyModel[];
};

export const readhistorysearch = async (EMAIL: string) => {
  var split_t  = EMAIL.split('&');
  var STU_ID = split_t[0] + '%';
  var EMAIL = split_t[1] + '%';
  console.log(STU_ID+'@'+EMAIL);
  const result = await sql({
    query: "SELECT * FROM history WHERE STU_ID LIKE ? OR EMAIL LIKE ?",
    values: [STU_ID,EMAIL]
  });

  return result as historyModel[];
};
