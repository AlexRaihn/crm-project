<script lang="ts" setup>
import Button from "@/components/ui/button/Button.vue";
</script>

<template>
  <div class="flex flex-col gap4 h-full justify-center items-center">
    <div>Добро пожаловать!</div>
    <div>
      <router-link :to="{ name: 'AuthView' }">
        <Button> Авторизация в системе </Button>
      </router-link>
    </div>
  </div>
</template>
