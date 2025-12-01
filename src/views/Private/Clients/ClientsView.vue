<script setup lang="ts">
import { ref, computed } from "vue";

import { searchFilterObject } from "@/composables/useFilter";
import { DialogPlugin } from "@/composables/useDialog";

import { Card } from "@/components/ui/card";
import Button from "@/components/ui/button/Button.vue";

import ClientsTable from "@/components/Private/Clients/Clients/ClientsTable.vue";
import ClientsCreateEditModal from "@/components/Private/Clients/Clients/crud/ClientsCreateEditModal.vue";

import SearchInput from "@/components/General/SearchInput/SearchInput.vue";

import { useClientsStore } from "@/store/clients/ClientsStore";

import type { Client } from "@/types/clients/Clients";

type Props = {
  companyId?: number;
};

const props = withDefaults(defineProps<Props>(), {
  companyId: 0,
});

const { openDialog } = DialogPlugin();

const clientsStore = useClientsStore();

const isFilter = ref(null);
const search = ref("");

function openCreateClientModal() {
  openDialog(ClientsCreateEditModal, {
    companyId: props.companyId,
  });
}

const filteredClients = computed<Client[]>(() => {
  let clients = clientsStore.clients;
  if (props.companyId !== 0)
    clients = clientsStore.clients.filter(
      (client) => client.companyId === Number(props.companyId)
    );

  if (search.value.length !== 0)
    return searchFilterObject(
      clients,
      ["firstName", "middleName", "lastName"],
      search.value
    );

  return clients;
});
</script>

<template>
  <div class="c-page h-full">
    <div class="c-flex-row">
      <div class="font-bold text-xl">Клиенты</div>
      <SearchInput
        v-model="search"
        @search="isFilter === true"
        placeholder="Введите ФИО клиента"
      />
      <Button @click="openCreateClientModal"> Добавить </Button>
    </div>
    <Card class="c-page-el">
      <ClientsTable
        :companyId="props.companyId"
        :data-table="filteredClients"
      />
    </Card>
  </div>
</template>
