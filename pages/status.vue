<script setup lang="ts">
//ตรวจสอบ status

const readstatus = async () => {
  try {
    const result = await $fetch('/api/status');
    //alert(result);
    //alert(JSON.parse(result)); 
    //alert(JSON.parse(result)[0].DESTROY);
    //alert(result);
    status.status_REG = JSON.parse(result)[0].REG;
    status.status_EDIT = JSON.parse(result)[0].EDIT;
    status.status_DES = JSON.parse(result)[0].DESTROY;
    return true;
  } catch {
    alert('ST D Error');
  }
};


const status = reactive({
  status_REG: '00000',
  status_EDIT: '00000',
  status_DES: '00000',
});

onMounted(readstatus);

definePageMeta({ layout: 'blank' })
</script>

<template>
<template v-if="status.status_REG !='00000'">
  <v-alert
      color="info"
      icon="ri-user-add-line"
      title="Register Card on :"
      prominent
    >
    {{status.status_REG}}
    </v-alert>
</template>
<template v-if="status.status_EDIT !='00000'">
  <v-alert
      color="warning"
      icon="ri-user-settings-line"
      title="Edit Card on :"
      prominent
    >
    {{status.status_EDIT}}
    </v-alert>
</template>
<template v-if="status.status_DES !='00000'">
  <v-alert
      color="error"
      icon="ri-user-unfollow-line"
      title="Destroy Card on :"
      prominent
    >
    {{status.status_DES}}
    </v-alert>
</template>
<template v-if="status.status_DES =='00000' && status.status_EDIT =='00000'  && status.status_REG =='00000'">
  <v-alert
      color="undefined"
      icon="ri-loop-right-line"
      title="Waiting Status ..."
      prominent
    >
    {{status.status_DES}}
    </v-alert>
</template>
</template>
