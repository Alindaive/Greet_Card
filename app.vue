<script setup lang="ts">

const { isMobile } = useDevice()
if (isMobile)
  configStore.appContentLayoutNav = 'vertical'
</script>

<template>
  <VApp>
    <NuxtLayout>
      <title>My page title</title>
      <NuxtPage />
    </NuxtLayout>
  </VApp>
</template>
