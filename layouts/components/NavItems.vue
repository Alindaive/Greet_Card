<script lang="ts" setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue';
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';
</script>

<template>
    <!-- 👉 Admin Card -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Admin Task',
    }"
  />

  <VerticalNavLink
      :item="{
        title: 'Hitory',
        to: '/history_dash',
        icon: 'ri-time-line',
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'Pending',
        to: '/pending_dash',
        icon: 'ri-user-add-line',
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'Member',
        to: '/member_dash',
        icon: 'ri-profile-line',
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'Authentication',
        to: '/authen_dash',
        icon: 'ri-lock-unlock-line',
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'Admin',
        to: '/admin_dash',
        icon: 'ri-user-star-line',
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'About Us',
        to: '/about_us_dash',
        icon: 'ri-question-line',
      }"
    />
</template>
