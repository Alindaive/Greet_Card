import { createRouter, defineEventHandler, useBase } from 'h3';

import * as blogCtrl from '~/server/controller/blog';

const router = createRouter();


router.get('/history_dash', defineEventHandler(blogCtrl.readhistory)); //เรียกดูข้อมูล history

router.get('/pending_dash', defineEventHandler(blogCtrl.read)); //เรียกดูข้อมูล pending
router.post('/pending_dash', defineEventHandler(blogCtrl.create)); //สร้างแทรกข้อมูล pending
//router.get('/blog/:id', defineEventHandler(blogCtrl.detail));
router.delete('/pending_dash/:EMAIL', defineEventHandler(blogCtrl.remove));//ลบข้อมูล pending
router.post('/pending_dash/Move/:EMAIL', defineEventHandler(blogCtrl.Movepending));//ย้ายข้อมูล pending -> member

router.get('/member_dash', defineEventHandler(blogCtrl.readmember)); //เรียกดูข้อมูล member
router.delete('/member_dash/:EMAIL', defineEventHandler(blogCtrl.removemember)); //ลบข้อมูล member

router.post('/register', defineEventHandler(blogCtrl.createauthen)); //สร้างแทรกข้อมูล authen
router.get('/authen_dash', defineEventHandler(blogCtrl.readauthen)); //เรียกดูข้อมูล authen
router.post('/authen_dash/:EMAIL', defineEventHandler(blogCtrl.moveauthen));//ย้ายข้อมูล authen -> admin
router.delete('/authen_dash/:EMAIL', defineEventHandler(blogCtrl.removeauthen));//ลบข้อมูล authen

router.post('/authen_dash/Mhistory/:EMAIL', defineEventHandler(blogCtrl.Mhisauthen));//ลงประวัติ การเพิ่ม admin
router.post('/authen_dash/Dhistory/:EMAIL', defineEventHandler(blogCtrl.Dhisauthen));//ลงประวัติ การลบ pending,member,authen
router.post('/pending_dash/Phistory/:EMAIL', defineEventHandler(blogCtrl.Phispending));//ลงประวัติ การเพิ่ม member

router.get('/admin/:EMAIL', defineEventHandler(blogCtrl.adminlogin)); //เรียกดูข้อมูล admin

router.post('/login/:STU_ID', defineEventHandler(blogCtrl.login)); //

router.get('/status', defineEventHandler(blogCtrl.readstatus)); //
router.get('/status/reg', defineEventHandler(blogCtrl.readstatusreg)); //
router.get('/status/edit', defineEventHandler(blogCtrl.readstatusedit)); //
router.get('/status/des', defineEventHandler(blogCtrl.readstatusdes)); //
router.post('/status/change_st_/reg/:STU_ID', defineEventHandler(blogCtrl.change_st_reg)); //
router.post('/status/change_st_/edit/:STU_ID', defineEventHandler(blogCtrl.change_st_edit)); //
router.post('/status/change_st_/des/:STU_ID', defineEventHandler(blogCtrl.change_st_des));

router.post('/status/reset_st_/reg', defineEventHandler(blogCtrl.reset_st_reg)); //
router.post('/status/reset_st_/edit', defineEventHandler(blogCtrl.reset_st_edit)); //
router.post('/status/reset_st_/des', defineEventHandler(blogCtrl.reset_st_des));

export default useBase('/api', router.handler);
