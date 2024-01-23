<template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <div class="text-xl font-semibold">Request Card</div>

    <div class="mb-6">
      <label for="STU_ID" class="block mb-2 text-sm font-medium text-gray-900">Student ID :</label>
      <input
        v-model="form.STU_ID"
        type="number"
        id="STU_ID"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Enter Student ID"
        required
      />
    </div>

    <div class="mb-6">
      <label for="F_NAME" class="block mb-2 text-sm font-medium text-gray-900">First Name :</label>
      <input
        v-model="form.F_NAME"
        type="text"
        id="F_NAME"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Enter First Name "
        required
      />
    </div>

    <div class="mb-6">
      <label for="L_NAME" class="block mb-2 text-sm font-medium text-gray-900">Last Name :</label>
      <input
        v-model="form.L_NAME"
        type="text"
        id="L_NAME"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Enter Last Name "
        required
      />
    </div>

    <div>
      <label for="GRADE">GRADE :</label>
      <input
        v-model="form.GRADE"
        type="text"
        id="GRADE"
        placeholder="Enter GRADE"
        required
      />
    </div>

    <div>
      <label for="ROOM">ROOM :</label>
      <input
        v-model="form.ROOM"
        type="text"
        id="ROOM"
        placeholder="Enter ROOM"
        required
      />
    </div>

    <div>
      <label for="NUMBER">No.</label>
      <input
        v-model="form.NUMBER"
        type="number"
        id="NUMBER"
        placeholder="Enter NUMBER"
        required
      />
    </div>

    <div>
      <label for="EMAIL">E-Mail : </label>
      <input
        v-model="form.EMAIL"
        type="text"
        id="EMAIL"
        placeholder="Enter EMAIL :"
        required
      />
    </div>


    <div class="relative flex justify-end mb-7">
      <NuxtLink
        to="/blogp"
        class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none mr-2"
      >
        Back
      </NuxtLink>
      <button
        @click="onSubmit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Add Blog'
});

const form = reactive({
  STU_ID: '',
  F_NAME: '',
  L_NAME: '',
  GRADE: '',
  ROOM: '',
  NUMBER: '',
  EMAIL: ''
});

const router = useRouter();

const onSubmit = async () => {
  try {
    await $fetch('/api/blogp', {
      method: 'POST',
      body: form
    });
    alert('Successful');

    router.push('/blogp');
  } catch {
    alert('Post blog error');
    console.log();
  }
};
</script>
