<script setup lang="ts">
import { Card } from "@/components/ui/card";

import CrmUsersTable from "@/components/Private/CrmUsers/CrmUsersTable.vue";

import { useConfigStore } from "@/store/configStore";
import { computed } from "vue";

const { crmUsers } = useConfigStore();

const filteredCrmUsers = computed(() => {
  return crmUsers.filter(el => el.role !== 1)
})
</script>

<template>
  <Card class="p-4 w-full h-full">
    <CrmUsersTable :data-table="filteredCrmUsers" />
  </Card>
</template>
