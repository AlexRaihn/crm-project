<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";
</script>

<template>
  <div class="bg-gray-50 h-[100vh] dark:bg-gray-900 overflow-hidden">
    <RouterView />
    <Toaster richColors />
  </div>
</template>
