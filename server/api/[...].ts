import { createRouter, defineEventHandler, useBase } from 'h3';

import * as blogCtrl from '~/server/controller/blogp';

const router = createRouter();

router.get('/blog', defineEventHandler(blogCtrl.read));
try{
console.log('Ctrl  a ss');
router.post('/blogp', defineEventHandler(blogCtrl.create));
}catch{'Ctrl  a er'}
router.get('/blog/:id', defineEventHandler(blogCtrl.detail));
router.delete('/blog/:id', defineEventHandler(blogCtrl.remove));

export default useBase('/api', router.handler);
