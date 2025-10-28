<script setup lang="ts">
import { onMounted, ref } from "vue";

import { Card } from "@/components/ui/card";

import CrmUsersTable from "@/components/Private/CrmUsers/CrmUsersTable.vue";

import { useConfigStore } from "@/store/configStore";

const { getCrmUsers, crmUsers } = useConfigStore();

const isLoading = ref(false);

async function loadData() {
  isLoading.value = true;
  try {
    await getCrmUsers();
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
    <CrmUsersTable :data-table="crmUsers" />
  </Card>
</template>
