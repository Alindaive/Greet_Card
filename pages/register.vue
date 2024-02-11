<script setup lang="ts">
import { useTheme } from 'vuetify'

import logo from '@images/logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'

const admin_form = reactive({
  F_NAME: '',
  L_NAME: '',
  EMAIL: '',
  PASSWORD:''
});

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light'
    ? authV1MaskLight
    : authV1MaskDark
})

const isPasswordVisible = ref(false)

const router = useRouter();


const onSubmit_Admin = async () => {
  if (admin_form.F_NAME == ""){
    alert ('Required First Name');
  }
  else if (admin_form.L_NAME == ""){
    alert ('Required Last Name');
  }
  else if (admin_form.EMAIL == ""){
    alert ('Required Email');
  }
  else if (!admin_form.EMAIL.includes("@")){
    alert ('Required "@" in Email');
  }
  else if (admin_form.PASSWORD == ""){
    alert ('Required Password');
  }
  else{

  try {
    await $fetch('/api/register', {
      method: 'POST',
      body: admin_form
    });
    alert('Request Authen Successful');

    router.push('/login');
  } catch {
    alert('Request Error');
  }
};
}

definePageMeta({ layout: 'blank' })
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
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

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Admin task starts here 🚀
        </h5>
        <p class="mb-0">
          Request admin account here!
        </p>
      </VCardText>

      <VCardText>
        <VForm>
          <VRow>
            <!-- F_name -->
            <VCol cols="6">
              <VTextField
                v-model="admin_form.F_NAME"
                label="First name"
                placeholder="John"
                required
                :rules="[() => admin_form.F_NAME.length > 0 || 'Required First name']"
              />
            </VCol>
            <!-- L_name -->
            <VCol cols="6">
              <VTextField
                v-model="admin_form.L_NAME"
                label="Last name"
                placeholder="doe"
                required
                :rules="[() => admin_form.L_NAME.length > 0 || 'Required Last name']"
              />
            </VCol>

            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="admin_form.EMAIL"
                label="Email"
                placeholder="johndoe@email.com"
                type="email"
                required
                :rules="[() => admin_form.EMAIL.length > 0 || 'Required Email']"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="admin_form.PASSWORD"
                label="Password"
                placeholder="············"
                required
                :rules="[() => admin_form.PASSWORD.length > 0 || 'Required Password']"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <div class="d-flex align-center mt-1 mb-4">
                <VLabel
                  for="privacy-policy"
                  style="opacity: 1;"
                >
                  <span class="me-1"></span>
                  <a
                    href="javascript:void(0)"
                    class="text-primary"
                  ></a>
                </VLabel>
              </div>

              <VBtn
                block
                @click="onSubmit_Admin"
              >
                Sign up
              </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Already have an account?</span>
              <NuxtLink
                class="text-primary ms-2"
                to="login"
              >
                Sign in instead
              </NuxtLink>
            </VCol>

          </VRow>
        </VForm>
      </VCardText>
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
