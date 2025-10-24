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

import { DialogPlugin } from "@/composables/useDialog";

import ClientsCreateEditModal from "./crud/ClientsCreateEditModal.vue";

import { useClientsStore } from "@/store/clients/ClientsStore";

import { gender } from "@/enums/gender";

const { openDialog } = DialogPlugin();

const { clients, getClients } = useClientsStore();

const clientsTable = computed(() => clients);

const isLoading = ref(false);
const isOpenModal = ref(false);

const tableHeader = [
  "ID",
  "ФИО",
  "Пол",
  "Email",
  "Телефон",
  "Адрес",
  "Действия",
];

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
  isOpenModal.value = true;
  openDialog(ClientsCreateEditModal, {
    id,
    onSave: () => loadData(),
    onCancel: () => console.log("CANCEL"),
  });
}

onMounted(async () => {
  await loadData();
});

defineExpose({
  loadData,
});
</script>

<template>
  <Card class="p-4 w-full h-full">
    <Table>
      <TableHeader>
        <TableRow>
          <td
            v-for="item in tableHeader"
            class="text-center"
            :key="`client-table-header-${item}`"
            v-text="item"
          />
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
          <td>{{ item.id }}</td>
          <td>
            {{ item.firstName }} {{ item.middleName }} {{ item.lastName }}
          </td>
          <td>
            {{ gender.find((el) => item.gender === el.value).label || "" }}
          </td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.address }}</td>
          <td>
            <TableRowActions @edit="openEditModal(item.id)" />
          </td>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
</template>
