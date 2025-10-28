<script setup lang="ts">
import { ref } from "vue";

import Button from "@/components/ui/button/Button.vue";

import { useClientsStore } from "@/store/clients/ClientsStore";
import { useCompaniesStore } from "@/store/clients/CompaniesStore";

const clientsStore = useClientsStore();
const companiesStore = useCompaniesStore();

const isLoading = ref<boolean>(false);

async function loadDemoData() {
  isLoading.value = true;
  try {
    await clientsStore.generateClients();
    console.log("Clients:", clientsStore.clients);

    await companiesStore.generateCompanies();
    console.log("Companies:", companiesStore.companies);

    console.log("Demo data loaded on mount.");
  } catch (error) {
    console.error("Error fetching data on mount:", error);
  } finally {
    await setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
}
</script>

<template>
  <Button :is-loading="isLoading" @click="loadDemoData">
    Загрузить демо данные
  </Button>
</template>
