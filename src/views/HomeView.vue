<script lang="ts" setup>
import { useClientsStore } from "@/store/clients/ClientsStore";

const { clients } = useClientsStore();
</script>

<template>
  <div>{{ clients }}</div>
</template>
