<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
import avatar7 from '@images/avatars/avatar-7.png'
import avatar8 from '@images/avatars/avatar-8.png'

const headers = [
{ title: 'User', key: 'username' },
{ title: 'E-mail', key: 'email' },
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

</script>

<template>
  <VCard>
    <VDataTable
      :headers="headers"
      :items="userData"
      item-value="id"
      class="text-no-wrap"
    >

      <!-- index -->
      <template #item.index="{ item }">
        {{ item.grade }}{{ item.room }} / {{ item.number }}
      </template>

      <!-- User -->
      <template #item.username="{ item }">
        <div class="d-flex align-center gap-x-4">
          <VAvatar
            size="34"
            :variant="!item.avatar ? 'tonal' : undefined"
            :color="!item.avatar ? resolveUserstatusVariant(item.status).color : undefined"
          >
            <VImg
              v-if="item.avatar"
              :src="item.avatar"
            />
          </VAvatar>

          <div class="d-flex flex-column">
            <h6 class="text-h6 font-weight-medium user-list-name">
              {{ item.fullName }}
            </h6>

            <span class="text-sm text-medium-emphasis">@{{ item.email }}</span>
          </div>
        </div>
      </template>
      
      <!-- Time -->
      <template #item.time="{ item }">
          {{ item.time }}
      </template>

      <!-- Time -->
      <template #item.action="{ item }">
          <v-btn> 
            <VIcon icon="ri-user-star-line" size="22"/>
        </v-btn>
          <h> &nbsp;</h>
          <VBtn
          color="error"
          >
          <VIcon icon="ri-user-unfollow-line" size="22"/>
          </VBtn>
      </template>
      

      <template #bottom />
    </VDataTable>
  </VCard>
</template>
