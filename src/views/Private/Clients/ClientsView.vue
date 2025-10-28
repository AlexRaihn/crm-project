<script setup lang="ts">
import { onMounted, ref } from "vue";

import { Card } from "@/components/ui/card";

import ClientsTable from "@/components/Private/Clients/Clients/ClientsTable.vue";

import { useClientsStore } from "@/store/clients/ClientsStore";

const { getClients } = useClientsStore();

const isLoading = ref(false);

async function loadData() {
  isLoading.value = true;
  try {
    await getClients();
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  loadData();
});
</script>

<template>
  <Card class="p-4 w-full h-full">
    <ClientsTable />
  </Card>
</template>
