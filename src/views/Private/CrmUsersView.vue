<script setup lang="ts">
import { Card } from "@/components/ui/card";

import CrmUsersTable from "@/components/Private/CrmUsers/CrmUsersTable.vue";

import { useConfigStore } from "@/store/configStore";

const { crmUsers } = useConfigStore();
</script>

<template>
  <Card class="p-4 w-full h-full">
    <CrmUsersTable :data-table="crmUsers" />
  </Card>
</template>
