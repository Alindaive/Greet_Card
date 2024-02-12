<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
import avatar7 from '@images/avatars/avatar-7.png'
import avatar8 from '@images/avatars/avatar-8.png'

import type { memberModel } from '~~/server/model/blogm'

const route = useRoute();

const headers = [
{ title: 'No.', key: 'number' },
{ title: 'User', key: 'username' },
{ title: 'Student ID', key: 'stu_id' },
{ title: 'Log-in(n)', key: 'login' },
{ title: 'PASS/NOT', key: 'cal' },
{ title: 'Action', key: 'action' },
]

const userData = [
  {
    stu_id: 65309010001,
    fullName: 'Galasasen Slixby',
    company: 'Yotz PVT LTD',
    status: 'edit',
    grade:'E',
    room:'1',
    number:'3',
    username: 'gslixby0',
    country: 'El Salvador',
    contact: '(479) 232-9151',
    email: 'gslixby0@abc.net.au',
    currentPlan: 'enterprise',
    avatar: avatar1,
    time : '12:22:02-01/01/2024'
  },
  {
    stu_id: 65309010002,
    fullName: 'Halsey Redmore',
    company: 'Skinder PVT LTD',
    status: 'delete',
    grade:'E',
    room:'1',
    number:'6',
    username: 'hredmore1',
    country: 'Albania',
    contact: '(472) 607-9137',
    email: 'hredmore1@imgur.com',
    currentPlan: 'team',
    avatar: avatar2,
    time : '12:28:04-01/01/2024'
  },
  {
    stu_id: 65309010003,
    fullName: 'Marjory Sicely',
    company: 'Oozz PVT LTD',
    status: 'registor',
    grade:'E',
    room:'1',
    number:'15',
    username: 'msicely2',
    country: 'Russia',
    contact: '(321) 264-4599',
    email: 'msicely2@who.int',
    currentPlan: 'enterprise',
    avatar: avatar3,
    time : '12:28:56-01/01/2024'
  },
  {
    stu_id: 65309010004,
    fullName: 'Cyrill Risby',
    company: 'Oozz PVT LTD',
    status: 'Admin',
    grade:'E',
    room:'1',
    number:'11',
    username: 'crisby3',
    country: 'China',
    contact: '(923) 690-6806',
    email: 'crisby3@wordpress.com',
    currentPlan: 'team',
    avatar: avatar4,
    time : '12:34:03-01/01/2024'
  },
  {
    stu_id: 65309010005,
    fullName: 'Maggy Hurran',
    company: 'Aimbo PVT LTD',
    status: 'log-in',
    grade:'E',
    room:'1',
    number:'18',
    username: 'mhurran4',
    country: 'Pakistan',
    contact: '(669) 914-1078',
    email: 'mhurran4@yahoo.co.jp',
    currentPlan: 'enterprise',
    avatar: avatar5,
    time : '12:44:26-01/01/2024'
  },
  {
    stu_id: 65309010006,
    fullName: 'Silvain Halstead',
    company: 'Jaxbean PVT LTD',
    status: 'delete',
    grade:'E',
    room:'1',
    number:'20',
    username: 'shalstead5',
    country: 'China',
    contact: '(958) 973-3093',
    email: 'shalstead5@shinystat.com',
    currentPlan: 'company',
    avatar: avatar6,
    time : '12:48:12-01/01/2024'
  },
  {
    stu_id: 65309010007,
    fullName: 'Breena Gallemore',
    company: 'Jazzy PVT LTD',
    status: 'log-in',
    grade:'E',
    room:'1',
    number:'23',
    username: 'bgallemore6',
    country: 'Canada',
    contact: '(825) 977-8152',
    email: 'bgallemore6@boston.com',
    currentPlan: 'company',
    avatar: avatar7,
    time : '12:52:56-01/01/2024'
  },
  {
    stu_id: 65309010008,
    fullName: 'Kathryne Liger',
    company: 'Pixoboo PVT LTD',
    status: 'log-in',
    grade:'E',
    room:'1',
    number:'34',
    username: 'kliger7',
    country: 'France',
    contact: '(187) 440-0934',
    email: 'kliger7@vinaora.com',
    currentPlan: 'enterprise',
    avatar: avatar8,
    time : '13:02:44-01/01/2024'
  },
]

const resolveUserstatusVariant = (status: string) => {
  const statusLowerCase = status.toLowerCase()

  if (statusLowerCase === 'log-in')
    return { color: 'success', icon: 'ri-user-received-line' }
  if (statusLowerCase === 'delete')
    return { color: 'error', icon:' ri-user-unfollow-line' }
  if (statusLowerCase === 'registor')
    return { color: 'info', icon: 'ri-user-follow-line' }
  if (statusLowerCase === 'edit')
    return { color: 'warning', icon: 'ri-user-settings-line' }
  if (statusLowerCase === 'admin')
    return { color: 'primary', icon: 'ri-user-star-line' }

  return { color: 'undefined', icon: 'ri-user-line' }
}

const data = ref<memberModel[]>([]);

const fetchData = async (GRADE:string,ROOM:string) => {
  try {
    const result = await $fetch('/api/member_dash/filter/'+GRADE+ROOM);
    data.value = result.data as memberModel[];
  } catch {
    alert('Fetch error');
  }
};

//บันทึกประวัติลง history
const Dhistorytrack = async (EMAIL: string) => {
  try {
    await $fetch('/api/authen_dash/Dhistory/' + EMAIL, {
      method: 'POST'
    });

  } catch {
    alert('DHistory Error');
  }
};

//ตรวจสอบ status
const readstatus = async () => {
  try {
    const result = await $fetch('/api/status');
    //alert(result);
    //alert(JSON.parse(result)); 
    //alert(JSON.parse(result)[0].DESTROY);
    //alert(result);
    const status_REG = JSON.parse(result)[0].REG;
    const status_EDIT = JSON.parse(result)[0].EDIT;
    const status_DES = JSON.parse(result)[0].DESTROY;
    return status_REG + status_EDIT + status_DES
  } catch {
    alert('ST D Error');
  }
};

//ระเบิด card
const destroy_card = async (STU_ID: string) => {
  try {
    //await readstatus();
    await $fetch('/api/status/change_st_/des/' + STU_ID, {
      method: 'POST'
    });

  } catch {
    alert('Destroy Card Error');
  }
};

//WHTRACK คือเก็บลงหน้าประวัติ historyมั้ย
//มันจะมีลบสองแบบ ลบด้วยแอดมินกดลบ(เก็บ) กับ ลบเพราะโดนย้าย(ไม่เก็บ)
const onDelete = async (EMAIL: string,WHTRACK: string,STU_ID: string) => {
  const status = await readstatus();
  console.log(status);

  //ถ้าstatus_DES ว่าง ให้ เก็บลงหน้าประวัติ -> เพิ่มบัตรรอทำลายได้ -> ลบออกจาก member
  if(status == '000000000000000'){

    if (WHTRACK=='True'){
      await Dhistorytrack(EMAIL);
      alert('Delete Member Sucess');
    }
    //ระเบิด card
    await destroy_card(STU_ID);
    //ลบ member ใน db
    try {
      await $fetch('/api/member_dashdel/' + EMAIL, {method: 'DELETE'});
      fetchData(mem_cal.GRADE,mem_cal.ROOM);
    } catch {
    alert('Delete Member Error');
    }
}
  //ถ้าstatus_DES ไม่ว่าง
else{
  alert('Have Other Status');
}
};

const onEdit = async (EMAIL: string) => {
  window.location.replace("/" + EMAIL);
};

const onCal = async (GRADE:string,ROOM:string,MAX_HOUR: number) =>{
  mem_cal.MAX_HOUR = MAX_HOUR;
  fetchData(GRADE,ROOM);
};

const mem_cal = reactive({
  GRADE: 'E',
  ROOM: '1',
  MAX_HOUR: 18
});

onMounted(async () => {
await onCal(mem_cal.GRADE,mem_cal.ROOM,mem_cal.MAX_HOUR);
});

const grade_mem =['A', 'B', 'C', 'D','E']
const room_mem =['1', '2', '5', '6','G','W']
</script>

<template>
  <VCard>
    <div>
      <VRow><p> </p></VRow>
    <VRow>
      <VCol cols="1">
    <v-text sm="6">
      <div class="text-capitalize text-high-emphasis" >
        &nbsp&nbsp&nbsp&nbsp&nbsp
        <VIcon
            icon="ri-filter-2-line"
            color="info"
            size="28"
          />&nbsp&nbsp&nbsp{{ 'Filter :' }}
    </div>
    </v-text>
    </VCol>
      <VCol cols="3">
    <v-select
      :items="grade_mem"
      density="compact"
      label="Grade"
      v-model="mem_cal.GRADE"
    ></v-select>
    </VCol>

    <VCol cols="3">
    <v-select
      :items="room_mem"
      density="compact"
      label="Room"
      v-model="mem_cal.ROOM"
    ></v-select>
    </VCol>

    <VCol cols="3">
      <VTextField
                v-model="mem_cal.MAX_HOUR"
                label="Max Hour "
                type="number"
              />
    </VCol>

    <VCol cols="1">
      <VBtn @click="() => onCal(mem_cal.GRADE,mem_cal.ROOM,mem_cal.MAX_HOUR)">Cal</VBtn>
    </VCol>
  </VRow>
  <VRow><p> </p></VRow>
</div>
    <VDataTable
      :headers="headers"
      :items="data"
      item-value="email"
      class="text-no-wrap"
    >
    <template #item.grade="{ item }" >
    <template v-if="item.GRADE == mem_cal.GRADE">
    </template>
  </template>
    

      <!-- number -->
      <template #item.number="{ item }">
       {{ item.NUMBER }}
      </template>

      <!-- User -->
      <template #item.username="{ item }">
        <div class="d-flex align-center gap-x-4">

          <div class="d-flex flex-column">
            <h6 class="text-h6 font-weight-medium user-list-name">
              {{ item.F_NAME }} {{ item.L_NAME }} 
            </h6>

            <span class="text-sm text-medium-emphasis">{{ item.EMAIL }}</span>
          </div>
        </div>
      </template>

      <!-- Email -->
      <template #item.email="{ item }">
       {{ item.EMAIL }}
      </template>

      <!-- number -->
      <template #item.stu_id="{ item }">
       {{ item.STU_ID }}
      </template>

      <!-- login -->
      <template #item.login="{ item }">
       {{ item.LOGINCOUNT }} / {{ mem_cal.MAX_HOUR }}
      </template>

      <!-- pass -->
      <template #item.cal="{ item }">
        <template v-if="item.LOGINCOUNT > (mem_cal.MAX_HOUR/2)">
          <div class="text-capitalize text-high-emphasis">
            <VIcon
            icon="ri-check-double-line"
            color="success"
            size="22"
          /> {{'PASS'}}
          </div>
        </template>
        <template v-else="">
          <div class="text-capitalize text-high-emphasis">
            <VIcon
            icon="ri-hourglass-fill"
            color="error"
            size="22"
          /> {{'NOT PASS'}}
          </div>
        </template>
      </template>

      <!-- Action -->
      <template #item.action="{ item }">
          <v-btn color="warning" @click="() => onEdit(item.EMAIL)"> 
            <VIcon icon="ri-edit-2-line" size="22"/>
        </v-btn>
          <h> &nbsp;</h>
          <VBtn color="error" @click="() => onDelete(item.EMAIL,'True',item.STU_ID)">
          <VIcon icon="ri-delete-bin-2-line" size="22"/>
          </VBtn>
      </template>

      <template #bottom />
      
    </VDataTable>
  </VCard>
</template>
