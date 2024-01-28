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
    alert('Fetch error');
  }
  console.log(data);
};

const handleonlogin = async (EMAIL: string,PASSWORD: string) => {
  try {
    const user_data_db = await get_passwordof(EMAIL);
    const user_data_re = '{"EMAIL":"'+EMAIL+'","'+'PASSWORD":"'+ PASSWORD +'"}';
    if(user_data_db==user_data_re){
      alert('Login Sucess');
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
  try {
    await $fetch('/api/pending_dash', {
      method: 'POST',
      body: reg_form
    });
    alert('Request Card Successful');

    router.push('/login');
  } catch {
    alert('Request Card Error');
    console.log();
  }
};

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light'
    ? authV1MaskLight
    : authV1MaskDark
})

const isPasswordVisible = ref(false)

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
        <VForm @submit.prevent="() => {}">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="login_form.email"
                label="Email : "
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="login_form.password"
                label="Password : "
                placeholder="············"
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

                <a
                  class="ms-2 mb-1"
                  href="javascript:void(0)"
                >
                  Forgot Password?
                </a>
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
    
      <VForm @submit.prevenr="() => {}">
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
              />
            </VCol>
            <!-- L_name -->
            <VCol cols="6">
              <VTextField
                v-model="reg_form.L_NAME"
                label="Last Name : "
                type="text"
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
                ></v-select>
            </VCol>

            <!-- ROOM -->
            <VCol cols="3.5">
              <v-select
                label="Room"
                :items="['1', '2', '5', '6', 'G','W']"
                v-model="reg_form.ROOM"
                ></v-select>
            </VCol>

            <!-- NUMBER -->
            <VCol cols="5">
              <VTextField
                v-model="reg_form.NUMBER"
                label="No. "
                type="number"
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
