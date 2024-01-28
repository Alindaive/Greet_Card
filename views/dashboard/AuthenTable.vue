<script setup lang="ts">

import type { authenModel } from '~~/server/model/bloga';

const headers = [
{ title: 'User', key: 'username' },
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

const data = ref<authenModel[]>([]);

const fetchData = async () => {
  try {
    const result = await $fetch('/api/authen_dash');
    data.value = result.data as authenModel[];
  } catch {
    alert('Fetch error');
  }
};

const Mhistorytrack = async (EMAIL: string) => {
  try {
    await $fetch('/api/authen_dash/Mhistory/' + EMAIL, {
      method: 'POST'
    });

  } catch {
    alert('History Error');
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

const onMove = async (EMAIL: string) => {
  try {
    await $fetch('/api/authen_dash/' + EMAIL, {
      method: 'POST'
    });
    alert('Add Admin Sucess');
    await Mhistorytrack(EMAIL);
    await onDelete(EMAIL,'Flase');
  } catch {
    alert('Add Admin Error');
  }
};


const onDelete = async (EMAIL: string,WHTRACK: string) => {
  if (WHTRACK==='True'){
    await Dhistorytrack(EMAIL);
    alert('Delete Authen Request Sucess');
  }

  try {
    await $fetch('/api/authen_dash/' + EMAIL, {
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

    <!-- User -->
    <template #item.username="{ item }" slot="item.EMAIL" scope="props">
        <div class="d-flex align-center gap-x-4">
          {{ $props }}
          <div class="d-flex flex-column">
            <h6 class="text-h6 font-weight-medium user-list-name">
              {{ item.F_NAME }}  {{ item.L_NAME }} 
            </h6>
          </div>
        </div>
      </template>
    
    <!-- Email -->
    <template #item.email="{ item }">
          {{ item.EMAIL }}
      </template>  

      <!-- Password -->
      <template #item.password="{ item }">
          {{ item.F_NAME }}
      </template>

      <!-- Time -->
      <template #item.action="{ item }">
          <v-btn @click="() => onMove(item.EMAIL)"> 
            <VIcon icon="ri-user-star-line" size="22"/>
        </v-btn>
          <h> &nbsp;</h>
          <VBtn color="error" @click="() => onDelete(item.EMAIL,'True')">
          <VIcon icon="ri-user-unfollow-line" size="22"/>
          </VBtn>
      </template>
      

      <template #bottom />
    </VDataTable>
  </VCard>
</template>
