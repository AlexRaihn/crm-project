<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import {
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableEmpty,
  TableRowActions,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

import ClientsCreateEditModal from "./crud/ClientsCreateEditModal.vue";

import { useClientsStore } from "@/store/clients/ClientsStore";

import { gender } from "@/enums/gender";

const { clients, getClients } = useClientsStore();

const clientsTable = computed(() => clients);

const isLoading = ref(false);
const isOpenModal = ref(false);
const clientId = ref<number>(0);

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

function openEditModal(id: number) {
  clientId.value = id;
  isOpenModal.value = true;
}

onMounted(async () => {
  await loadData();
});
</script>

<template>
  <Card class="p-4">
    <Table>
      <TableHeader>
        <TableRow>
          <th class="px-4 py-3 text-sm font-medium">ID</th>
          <th class="px-4 py-3 text-sm font-medium">ФИО</th>
          <th class="px-4 py-3 text-sm font-medium">Пол</th>
          <th class="px-4 py-3 text-sm font-medium">Email</th>
          <th class="px-4 py-3 text-sm font-medium">Телефон</th>
          <th class="px-4 py-3 text-sm font-medium">Адрес</th>
          <th class="px-4 py-3 text-sm font-medium">Действия</th>
        </TableRow>
      </TableHeader>
      <TableBody>
        <td
          colspan="7"
          class="p-4"
          v-if="clientsTable.length === 0 && !isLoading"
        >
          <div class="inset-0 flex items-center justify-center">
            <TableEmpty> Нет данных для отображения </TableEmpty>
          </div>
        </td>
        <TableRow
          class="text-base font-normal!"
          v-else
          v-for="item in clientsTable"
          :key="`client-${item.id}`"
        >
          <th>{{ item.id }}</th>
          <th>
            {{ item.firstName }} {{ item.middleName }} {{ item.lastName }}
          </th>
          <th>
            {{ gender.find((el) => item.gender === el.value).label || "" }}
          </th>
          <th>{{ item.email }}</th>
          <th>{{ item.phone }}</th>
          <th>{{ item.address }}</th>
          <th>
            <TableRowActions @edit="openEditModal(item.id)" />
          </th>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
  <ClientsCreateEditModal
    v-if="isOpenModal"
    :id="clientId"
    v-model:open="isOpenModal"
    @cancel="isOpenModal = false"
    @save="
      () => {
        isOpenModal = false;
        loadData();
      }
    "
  />
</template>
