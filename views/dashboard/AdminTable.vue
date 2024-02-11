<script setup lang="ts">

import type { adminModel } from '~~/server/model/blogad';

const headers = [
{ title: 'E-mail', key: 'email' },
{ title: 'Password', key: 'password' },
{ title: 'Action', key: 'action' },
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

const data = ref<adminModel[]>([]);

const fetchData = async () => {
  try {
    const result = await $fetch('/api/admin');
    data.value = result.data as adminModel[];
  } catch {
    alert('Fetch error');
  }
};

const Dhistorytrack = async (EMAIL: string) => {
  try {
    await $fetch('/api/authen_dash/Dhistory/' + EMAIL, {
      method: 'POST'
    });

  } catch {
    alert('DHistory Error');
  }
};

const onDelete = async (EMAIL: string,WHTRACK: string) => {
  if (WHTRACK==='True'){
    await Dhistorytrack(EMAIL);
    alert('Delete Admin Sucess');
  }

  try {
    await $fetch('/api/admin/' + EMAIL, {
      method: 'DELETE'
    });
    
    await fetchData();
  } catch {
    alert('Clear Authen Request Error');
  }
};

onMounted(fetchData);

</script>

<template>

  <VCard>
    <VDataTable
      :headers="headers"
      :items="data"
      item-value="PASSWORD"
      class="text-no-wrap"
    >

    
    <!-- Email -->
    <template #item.email="{ item }">
          {{ item.EMAIL }}
      </template>  

      <!-- Password -->
      <template #item.password="{ item }">
          {{ item.PASSWORD }}
      </template>

      <!-- Time -->
      <template #item.action="{ item }">
          <VBtn color="error" @click="() => onDelete(item.EMAIL,'True')">
          <VIcon icon="ri-user-unfollow-line" size="22"/>
          </VBtn>
      </template>
      

      <template #bottom />
    </VDataTable>
  </VCard>
</template>
