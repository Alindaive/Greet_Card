<script lang="ts">
import type { statusModel } from '~~/server/model/blogs';

const data = ref<statusModel[]>([]);

const fetchData = async () => {
  try {
    const result = await $fetch('/api/status');
    data.value = result.data as statusModel[];
  } catch {
    alert('Fetch error');
  }
};
  definePageMeta({ layout: 'blank' })
  onMounted(fetchData);
</script>

<template>
  <v-card
    class="mx-auto"
    width="600"
    height="400"
    prepend-icon="mdi-home"
  >


  </v-card>
</template>
