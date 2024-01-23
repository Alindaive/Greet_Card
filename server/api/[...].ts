import { createRouter, defineEventHandler, useBase } from 'h3';

import * as blogCtrl from '~/server/controller/blogp';

const router = createRouter();

router.get('/pending_dash', defineEventHandler(blogCtrl.read));
router.post('/pending_dash', defineEventHandler(blogCtrl.create));
router.get('/blog/:id', defineEventHandler(blogCtrl.detail));
router.delete('/blog/:id', defineEventHandler(blogCtrl.remove));

export default useBase('/api', router.handler);
