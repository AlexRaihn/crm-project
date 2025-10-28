<script setup lang="ts">
import { onMounted, ref } from "vue";

import { Card } from "@/components/ui/card";

import CompaniesTable from "@/components/Private/Clients/Companies/CompaniesTable.vue";

import { useCompaniesStore } from "@/store/clients/CompaniesStore";

const { getCompanies, companies } = useCompaniesStore();

const isLoading = ref(false);

async function loadData() {
  isLoading.value = true;
  try {
    await getCompanies();
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
    <CompaniesTable :data-table="companies" />
  </Card>
</template>
