<script setup lang="ts">
import { useTheme } from 'vuetify'

import logo from '@images/logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'

import console from 'console'
import type { adminModel } from '~~/server/model/blogad'

const login_form = ref({
  email: '',
  password: '',
  remember: false,
})

const reg_form = reactive({
  STU_ID: '',
  F_NAME: '',
  L_NAME: '',
  GRADE: '',
  ROOM: '',
  NUMBER: '',
  EMAIL: ''
});

const router = useRouter();

const data = ref<adminModel[]>([]);

const get_passwordof = async (EMAIL: string) => {
  try {
    const result = await $fetch('/api/admin/' + EMAIL) as any;
    data.value = result.data as adminModel[];
    //alert(JSON.stringify(data.value));

    return JSON.stringify(data.value);
  } catch {
    alert('Login Error');
  }
  console.log(data);
};

const state =  reactive({
  username : '',
  
  error : ''
})
//ปุ่มlogin
const handleonlogin = async (EMAIL: string,PASSWORD: string) => {
  try {
    const user_data_db = await get_passwordof(EMAIL);
    const user_data_re = '{"EMAIL":"'+EMAIL+'","'+'PASSWORD":"'+ PASSWORD +'"}';
    //ถ้าข้อมูลในฐานข้อมูลกับข้อมูลในฟอร์มตรงกัน
    if(user_data_db==user_data_re){
      alert('Login Sucess');
      //state.username = EMAIL;
      //localStorage.setItem('CURRENT_USER', EMAIL);
      setCookie('username', EMAIL, 1);
      window.location.replace('/');
    }
    else{
      alert('Wrong e-mail or password');
    }
    //alert(user_data_re+'=='+user_data_db);
  } catch {
    alert('Fetch error');
  }
};

const onSubmit_Reg = async () => {

  if (reg_form.F_NAME == ""){
    alert ('Required First Name');
  }
  else if (reg_form.L_NAME == ""){
    alert ('Required Last Name');
  }
  else if (reg_form.EMAIL == ""){
    alert ('Required Email');
  }
  else if (!reg_form.EMAIL.includes("@")){
    alert ('Required "@" in Email');
  }
  else if (reg_form.STU_ID == ""){
    alert ('Required Student ID');
  }
  else if (reg_form.GRADE == ""){
    alert ('Required Grade');
  }
  else if (reg_form.ROOM == ""){
    alert ('Required Room');
  }
  else if (reg_form.NUMBER == ""){
    alert ('Required Number');
  }
  else{

  try {
    await $fetch('/api/pending_dash', {
      method: 'POST',
      body: reg_form
    });
    alert('Request Card Successful');

    window.location.replace("/login");
  } catch {
    alert('Request Card Error');
    console.log();
  }
};

}
const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light'
    ? authV1MaskLight
    : authV1MaskDark
})

const isPasswordVisible = ref(false)

function setCookie(name: String, value : String, days :number) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;

  //alert(document.cookie);
}

definePageMeta({ layout: 'blank' })
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="848"
    >
    <VRow>
      <VCol>
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          Greet_Card
        </VCardTitle>
      </VCardItem>
      </VCol>
    </VRow>


      <VRow>
      <VCol>
      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Welcome to Greet_Card! 👋🏻
        </h5>
        <p class="mb-0">
          Please sign-in to your account
        </p>
      </VCardText>

      <VCardText>
        <VForm>
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="login_form.email"
                label="Email : "
                type="email"
                required
                :rules="[() => login_form.email.length > 0 || 'Required Email']" 
              /><!-- check lenght -->
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="login_form.password"
                label="Password : "
                placeholder="············"
                required
                :rules="[() => login_form.password.length > 0 || 'Required Password']"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="login_form.remember"
                  label="Remember me"
                />

                
              </div>

              <!-- login button -->
              <VBtn
                block
                @click="() => handleonlogin(login_form.email,login_form.password)"
              >
                Login
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>New on our platform?</span>
              <NuxtLink
                class="text-primary ms-2"
                to="/register"
              >
                Create an account
              </NuxtLink>
            </VCol>

            <VCol
              cols="12"
              class="d-flex align-center"
            >
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCol>
    <v-divider class="border-opacity-50" color="info" vertical></v-divider>
  <VCol>

    <VCardText>
    
      <VForm>
        <VRow>
        <p class="mb-0">
          Please in-form to your card</p>
        </VRow>

        <VRow>
            <!-- F_name -->
            <VCol cols="6">
              <VTextField
                v-model="reg_form.F_NAME"
                label="First Name : "
                type="text"
                required
                :rules="[() => reg_form.F_NAME.length > 0 || 'Required First name']"
              />
            </VCol>
            <!-- L_name -->
            <VCol cols="6">
              <VTextField
                v-model="reg_form.L_NAME"
                label="Last Name : "
                type="text"
                required
                :rules="[() => reg_form.L_NAME.length > 0 || 'Required Last name']"
              />
            </VCol>
          </VRow>

          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="reg_form.EMAIL"
                label="Email : "
                type="email"
                required
                :rules="[() => reg_form.EMAIL.length > 0 || 'Required Email']"
              />
            </VCol>
          </VRow>

          <VRow>
            <!-- STU ID -->
            <VCol cols="12">
              <VTextField
                v-model="reg_form.STU_ID"
                label="Student ID : "
                type="number"
                required
                :rules="[() => reg_form.STU_ID.length > 0 || 'Required Student ID']"
              />
            </VCol>
          </VRow>

          <VRow>
            <!-- Grade-->
            <VCol cols="3.5">
              <v-select
                label="Grade"
                :items="['A', 'B', 'C', 'D', 'E']"
                v-model="reg_form.GRADE"
                required
                :rules="[() => reg_form.GRADE.length > 0 || 'Required Grade']"
                ></v-select>
            </VCol>

            <!-- ROOM -->
            <VCol cols="3.5">
              <v-select
                label="Room"
                :items="['1', '2', '5', '6', 'G','W']"
                v-model="reg_form.ROOM"
                required
                :rules="[() => reg_form.ROOM.length > 0 || 'Required Room']"
                ></v-select>
            </VCol>

            <!-- NUMBER -->
            <VCol cols="5">
              <VTextField
                v-model="reg_form.NUMBER"
                label="No. "
                type="number"
                required
                :rules="[() => reg_form.NUMBER.length > 0 || 'Required Number']"
              />
            </VCol>

          </VRow>
          <VRow><p class="mb-0">  </p></VRow>
        <VRow>
          <!-- login button -->
          <VBtn
                block
                @click="onSubmit_Reg"
              >
                Request Card
              </VBtn>
            </VRow>
            <VRow><p class="mb-0"> </p></VRow>
            <VRow><p class="mb-0"> </p></VRow>
            <VRow><p class="mb-0"> </p></VRow>

      </VForm>
    </VCardText>

  </VCol>
      </VRow>
    </VCard>
    


    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>
