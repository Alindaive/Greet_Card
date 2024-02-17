<script setup lang="ts">

function setCookie(name: String, value : String, days :number) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;

  alert(document.cookie);
}

</script>

<template>
  <div>
    <button @click="setCookie('username', 'test', 30)">set</button>
  </div>
</template>
