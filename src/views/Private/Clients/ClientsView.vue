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
import Checkbox from "@/components/ui/checkbox/Checkbox.vue";

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
const isCompany = ref(false)

function openCreateClientModal() {
  openDialog(ClientsCreateEditModal, {
    companyId: props.companyId
  });
}

const filteredClients = computed<Client[]>(() => {
  let clients = clientsStore.clients;
  if (props.companyId !== 0)
    clients = clientsStore.clients.filter(
      (client) => client.companyId === Number(props.companyId)
    );
  if (isCompany.value === true)
    clients = clientsStore.clients.filter(client => client.companyId !== 0)
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
      <Card class="w-full" v-if="!companyId">
        <div class="flex gap-1 items-center" @click="isCompany = !isCompany">
          Представители компании
          <Checkbox :model-value="isCompany" />
        </div>
      </Card>
    </div>
    <div class="c-flex-row">
      <SearchInput v-model="search" @search="isFilter === true" placeholder="Введите ФИО" />
      <Button @click="openCreateClientModal"> Добавить </Button>
    </div>
    <Card class="c-page-el">
      <ClientsTable :companyId="props.companyId" :data-table="filteredClients" />
    </Card>
  </div>
</template>
