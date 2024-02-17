<script setup lang="ts">
var user = "Unknow"
const router = useRouter();

function getUser() {
  document.cookie = ``;
  const cookiesArray = document.cookie.split('; ');

  for (let cookie of cookiesArray) {
    var [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === 'username') {
      user = cookieValue
    }
  }
}

function resetAllCookies() {
  document.cookie = ``;
  const cookiesArray = document.cookie.split('; ');

  for (let cookie of cookiesArray) {
    const [cookieName] = cookie.split('=');
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  router.push('/login');
}
onMounted(getUser);
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
    bordered
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VIcon>ri-user-5-fill</VIcon>

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                  <VIcon>ri-user-5-fill</VIcon>
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ user }}
            </VListItemTitle>
            <VListItemSubtitle>Admin</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="resetAllCookies()">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-logout-box-r-line"
                size="22"
              />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
