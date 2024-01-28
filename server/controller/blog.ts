import { H3Event } from 'h3';

import * as authenModel from '~~/server/model/bloga';
import * as adminModel from '~~/server/model/blogad';
import * as historyModel from '~~/server/model/blogh';
import * as memberModel from '~~/server/model/blogm';
import * as pendingModel from '~~/server/model/blogp';
import * as statusModel from '~~/server/model/blogs';

//เรียกดูข้อมูล history
export const readhistory = async () => {
  try {
    console.log('Ctrl  hr ss');
    const result = await historyModel.readhistory();

    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

//เรียกดูข้อมูล pending
export const read = async () => {
  try {
    console.log('Ctrl  r ss');
    const result = await pendingModel.read();

    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

//สร้างแทรกข้อมูล pending
export const create = async (evt: H3Event) => {
  try {
    console.log('Ctrl  c ss');
    const body = await readBody(evt);
    const result = await pendingModel.create({
      STU_ID: body.STU_ID,
      F_NAME: body.F_NAME,
      L_NAME: body.L_NAME,
      GRADE: body.GRADE,
      ROOM: body.ROOM,
      NUMBER: body.NUMBER,
      EMAIL: body.EMAIL
    });

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const detail = async (evt: H3Event) => {
  try {
    const result = await pendingModel.detail(evt.context.params?.id as string);

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

//ลบข้อมูล pending
export const remove = async (evt: H3Event) => {
  try {
    const result = await pendingModel.remove(evt.context.params?.EMAIL as string);

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

//ย้ายข้อมูล pending -> member
export const Movepending = async (evt: H3Event) => {
  try {
    console.log('Ctrl  mp ss');
    const result = await pendingModel.movepending(evt.context.params?.EMAIL as string);

    return {
      data: result
    };
  } catch {
    console.log('Ctrl  mp er');
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

//เรียกดูข้อมูล member
export const readmember = async () => {
  try {
    console.log('Ctrl  rm ss');
    const result = await memberModel.readmember();

    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

//ลบข้อมูล member
export const removemember = async (evt: H3Event) => {
  try {
    const result = await memberModel.removemember(evt.context.params?.EMAIL as string);

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

//สร้างแทรกข้อมูล authen
export const createauthen = async (evt: H3Event) => {
  try {
    console.log('Ctrl  ca ss');
    const body = await readBody(evt);
    const result = await authenModel.createauthen({
      F_NAME: body.F_NAME,
      L_NAME: body.L_NAME,
      EMAIL: body.EMAIL,
      PASSWORD: body.PASSWORD
    });
    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

//เรียกดูข้อมูล authen
export const readauthen = async () => {
  try {
    console.log('Ctrl  ra ss');
    const result = await authenModel.readauthen();

    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

//ย้ายข้อมูล authen -> admin
export const moveauthen = async (evt: H3Event) => {
  try {
    const result = await authenModel.moveauthen(evt.context.params?.EMAIL as string);

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

//ลบข้อมูล authen
export const removeauthen = async (evt: H3Event) => {
  try {
    const result = await authenModel.removeauthen(evt.context.params?.EMAIL as string);

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

//ลงประวัติ การเพิ่ม admin
export const Mhisauthen = async (evt: H3Event) => {
  try {
    const result = await authenModel.Mhisauthen(evt.context.params?.EMAIL as string);

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

//ลงประวัติ การลบ pending,member,authen
export const Dhisauthen = async (evt: H3Event) => {
  try {
    const result = await authenModel.Dhisauthen(evt.context.params?.EMAIL as string);

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

//ลงประวัติ การเพิ่ม member
export const Phispending = async (evt: H3Event) => {
  try {
    const result = await pendingModel.Phispending(evt.context.params?.EMAIL as string);

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const adminlogin = async (evt: H3Event) => {
  try {
    console.log('Ctrl  ad ss');
    const result = await adminModel.readAdmin(evt.context.params?.EMAIL as string);

    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const login = async (evt: H3Event) => {
  try {
    console.log('Ctrl login ss');
    const result = await memberModel.login(evt.context.params?.STU_ID as string);
    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const readstatus = async () => {
  try {
    console.log('Ctrl  rs ss');
    const result = await statusModel.readstatus();

    return JSON.stringify(result);
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const change_st_reg = async (evt: H3Event) => {
  try {
    console.log('Ctrl change st reg ss');
    const result = await statusModel.change_st_reg(evt.context.params?.STU_ID as string);
    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const change_st_edit = async (evt: H3Event) => {
  try {
    console.log('Ctrl change st edit ss');
    const result = await statusModel.change_st_edit(evt.context.params?.STU_ID as string);
    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const change_st_des = async (evt: H3Event) => {
  try {
    console.log('Ctrl change st des ss');
    const result = await statusModel.change_st_des(evt.context.params?.STU_ID as string);
    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const reset_st_reg = async () => {
  try {
    console.log('Ctrl reset st reg ss');
    const result = await statusModel.reset_st_reg();
    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const reset_st_edit = async () => {
  try {
    console.log('Ctrl reset st edit ss');
    const result = await statusModel.reset_st_edit();
    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const reset_st_des = async () => {
  try {
    console.log('Ctrl reset st des ss');
    const result = await statusModel.reset_st_des();
    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};