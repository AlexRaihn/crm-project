<script lang="ts" setup>
import router from "@/router";

import Button from "@/components/ui/button/Button.vue";

import { useAccountStore } from "@/store/Account/AccountStore";

const { account } = useAccountStore();

function logOut() {
  localStorage.removeItem("user");
  router.push("/");
}
</script>

<template>
  <div class="flex gap-4 w-full items-center justify-between">
    <div>{{ account.firstName }}</div>
    <Button v-text="'Выйти'" @click="logOut" />
  </div>
</template>
