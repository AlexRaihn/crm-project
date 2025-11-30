<script setup lang="ts">
import { ref } from "vue";

import Button from "@/components/ui/button/Button.vue";

import { useClientsStore } from "@/store/clients/ClientsStore";
import { useCompaniesStore } from "@/store/clients/CompaniesStore";
import router from "@/router";

const clientsStore = useClientsStore();
const companiesStore = useCompaniesStore();

const isLoading = ref<boolean>(false);

async function loadDemoData() {
  isLoading.value = true;
  try {
    await clientsStore.generateClients();
  } finally {
    await setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 items-center justify-center h-full">
    <div>Загрузка демо данных</div>
    <Button :is-loading="isLoading" @click="loadDemoData">
      Загрузить демо данные
    </Button>
    <Button @click="router.push({ name: 'HomeView' })">На главную</Button>
  </div>
</template>
