<script setup lang="ts">
import { onMounted, ref } from "vue";

import SalesView from "../Sales/SalesView.vue";

import { useClientsStore } from "@/store/clients/ClientsStore";

import { Client, emptyClient } from "@/types/clients/Clients";

type Props = {
  clientId: number;
};

const props = defineProps<Props>();

const clientsStore = useClientsStore();

const isLoading = ref(false);

const client = ref<Client>({
  ...emptyClient,
  id: props.clientId,
});

onMounted(async () => {
  try {
    isLoading.value = true;
    const res = await clientsStore.getClientById(Number(props.clientId));
    if (res) client.value = res;
  } catch {
    console.log("!Ошибка при загрузке информации о клиенте");
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="c-page h-full gap-6">
    <div class="font-bold text-xl">
      Информация о клиенте: {{ client.firstName }} {{ client.middleName }}
      {{ client.lastName }}
    </div>
    <SalesView
      v-if="!isLoading"
      :clientId="client.id"
      :companyId="client.companyId"
    />
  </div>
</template>
