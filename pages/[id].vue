<script lang="ts" setup>
import avatar1 from '@images/avatars/avatar-1.png';
import type { memberModel } from '~~/server/model/blogm';

const tabs = [
  { title: 'Account', icon: 'ri-group-line', tab: 'account' }
]

const route = useRoute();
const router = useRouter();

const accountData = {
  avatarImg: avatar1,
  firstName: 'john',
  lastName: 'Doe',
  email: 'johnDoe@example.com',
  org: 'ThemeSelection',
  phone: '+1 (917) 543-9876',
  address: '123 Main St, New York, NY 10001',
  state: 'New York',
  zip: '10001',
  country: 'USA',
  language: 'English',
  timezone: '(GMT-11:00) International Date Line West',
  currency: 'USD',
}

const refInputEl = ref<HTMLElement>()

const data = ref<memberModel[]>([]);

//ลงประวัติ
const Ehistorytrack = async (EMAIL: string) => {
  try {
    await $fetch('/api/member_dash/Ehistory/' + EMAIL, {
      method: 'POST'
    });

  } catch {
    alert('History Error');
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

    return JSON.parse(result)[0].EDIT;
  } catch {
    alert('ST E Error');
  }
};

//edit card
const edit_card = async (STU_ID: string) => {
  try {
    //await readstatus();
    await $fetch('/api/status/change_st_/edit/' + STU_ID, {
      method: 'POST'
    });

  } catch {
    alert('Edit Card Error');
  }
};

const onSubmit = async () => {
  const status_EDIT = await readstatus();
  if (accountDataLocal.F_NAME == ""){
    alert ('Required First Name');
  }
  else if (accountDataLocal.L_NAME == ""){
    alert ('Required Last Name');
  }
  else if (accountDataLocal.EMAIL == ""){
    alert ('Required Email');
  }
  else if (!accountDataLocal.EMAIL.includes("@")){
    alert ('Required "@" in Email');
  }
  else if (accountDataLocal.STU_ID == ""){
    alert ('Required Student ID');
  }
  else if (accountDataLocal.GRADE == ""){
    alert ('Required Grade');
  }
  else if (accountDataLocal.ROOM == ""){
    alert ('Required Room');
  }
  else if (accountDataLocal.NUMBER == null){
    alert ('Required Number');
  }
  else{

  if(status_EDIT == '00000'){
  try {
    await $fetch('/api/member_dash/edit/' + route.params.id, {
      method: 'PUT',
      body: accountDataLocal
    });
    edit_card(accountDataLocal.STU_ID);
    Ehistorytrack(accountDataLocal.EMAIL);

    router.push('/member_dash');
  } catch {
    alert('Edit Error');
  }
}else{
  alert('Have Other Edit Status');
}
}
};

const fetchData = async () => {
  try {
    const result = (await $fetch('/api/member_dash/edit/' + route.params.id)) as any;
    const data = result.data as memberModel;

    accountDataLocal.F_NAME = data.F_NAME;
    accountDataLocal.L_NAME = data.L_NAME;
    accountDataLocal.EMAIL = data.EMAIL;
    accountDataLocal.STU_ID = data.STU_ID;
    accountDataLocal.GRADE = data.GRADE;
    accountDataLocal.ROOM = data.ROOM;
    accountDataLocal.NUMBER = data.NUMBER;

    //alert(data);

  } catch {
    alert('Fetch error');
  }
};

const accountDataLocal = reactive({
  STU_ID: '',
  F_NAME: '',
  L_NAME: '',
  GRADE: '',
  ROOM: '',
  NUMBER: 0,
  EMAIL: '',
  LOGINCOUNT : '',
  LOGINCHECK : '',
  DATEOFMEM: '',
  TIMEOFMEM: '',
});

const resetForm = () => {
  fetchData();
}

onMounted(fetchData);
</script>

<template>
   <div>
    <VTabs
      show-arrows
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow
      class="mt-5 disable-tab-transition"
      :touch="false"
    >
      <!-- Account -->
      <VWindowItem value="account">
  <VRow>
    <VCol cols="12">
      <VCard title="Account Details">
        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 First Name -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="accountDataLocal.F_NAME"
                  id="F_NAME"
                  label="First Name"
                  required
                :rules="[() => accountDataLocal.F_NAME.length > 0 || 'Required First name']"
                />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="accountDataLocal.L_NAME"
                  label="Last Name"
                  required
                :rules="[() => accountDataLocal.L_NAME.length > 0 || 'Required Last name']"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="accountDataLocal.EMAIL"
                  label="E-mail"
                  type="email"
                  required
                :rules="[() => accountDataLocal.EMAIL.length > 0 || 'Required Email']"
                />
              </VCol>

         
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="accountDataLocal.STU_ID"
                  label="Student ID :"
                  type="number"
                  required
                :rules="[() => accountDataLocal.STU_ID.length > 0 || 'Required Student ID']"
                />
              </VCol>

              
              <VCol
                cols="12"
                md="4"
              >
              <v-select
                label="Grade"
                :items="['A', 'B', 'C', 'D', 'E']"
                v-model="accountDataLocal.GRADE"
                required
                :rules="[() => accountDataLocal.GRADE.length > 0 || 'Required Grade']"
              ></v-select>
              </VCol>

             
              <VCol
                cols="12"
                md="4"
              >
              <v-select
                label="Room"
                :items="['1', '2', '5', '6', 'G','W']"
                v-model="accountDataLocal.ROOM"
                required
                :rules="[() => accountDataLocal.ROOM.length > 0 || 'Required Room']"
              ></v-select>
              </VCol>

              <VCol
                cols="12"
                md="4"
              >
              <VTextField
                v-model="accountDataLocal.NUMBER"
                label="No. "
                type="number"
                required
                :rules="[() => accountDataLocal.NUMBER != null || 'Required Number']"
              />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn @click.prevent="onSubmit">Save changes</VBtn>

                <VBtn
                  color="secondary"
                  variant="outlined"
                  type="reset"
                  @click.prevent="resetForm"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</VWindowItem>      
</VWindow>
</div>
</template>
