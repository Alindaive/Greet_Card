<template>
  <div>
    <h1>This Board Log Login</h1>
    <h2>STU_ID : {{$route.query.STU_ID}}</h2>
    <h3>STATUS : {{$route.query.STATUS}}</h3>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.query.STU_ID); // john
    const STU_ID = this.$route.query.STU_ID
    const result = $fetch('/api/status');
    console.log(JSON.stringify(result));
  },
};
</script>
