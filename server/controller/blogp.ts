import { H3Event } from 'h3';

import * as pendingModel from '~~/server/model/blogp';

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


export const remove = async (evt: H3Event) => {
  try {
    const result = await pendingModel.remove(evt.context.params?.id as string);

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
