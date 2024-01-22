<template>
  <div>
    <h1>This is the Persons page</h1>
    <h2>Name: {{$route.query.name}}</h2>
    <h3>Id: {{$route.query.id}}</h3>
  </div>
</template>

<script setup>
const { $mysql } = useNuxtApp()
</script>

<script>
export default {
  created() {
    console.log(this.$route.query.name); // john
  },
};
</script>
