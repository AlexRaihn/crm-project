<script lang="ts" setup>
import Button from "@/components/ui/button/Button.vue";

import { useAccountStore } from "@/store/Account/AccountStore";

const { account, logOut } = useAccountStore();
</script>

<template>
  <div class="flex gap-4 w-full items-center justify-between">
    <div>{{ account.firstName }}</div>
    <Button v-text="'Выйти'" @click="logOut" />
  </div>
</template>
