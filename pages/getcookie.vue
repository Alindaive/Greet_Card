<script setup>
function getCookie() {
  document.cookie = ``;
  alert(document.cookie);
}

function resetAllCookies() {
  document.cookie = ``;
  const cookiesArray = document.cookie.split('; ');

  for (let cookie of cookiesArray) {
    const [cookieName] = cookie.split('=');
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}


</script>

<template>
  <div>
    <button @click="getCookie()">get</button>
    <button @click="resetAllCookies()">reset</button>
  </div>
</template>
