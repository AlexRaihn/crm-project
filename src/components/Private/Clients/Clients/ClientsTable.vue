<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import {
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableRowActions,
} from "@/components/ui/table";

import NotFound from "@/components/ui/not-fount/NotFound.vue";

import { DialogPlugin } from "@/composables/useDialog";

import ClientsCreateEditModal from "./crud/ClientsCreateEditModal.vue";

import type { Client } from "@/types/clients/Clients";

import { gender } from "@/enums/gender";

type Emits = {
  loadData: [];
};

type Props = {
  dataTable: Client[];
};

const props = withDefaults(defineProps<Props>(), {
  dataTable: () => [],
});
const emit = defineEmits<Emits>();

const { openDialog } = DialogPlugin();

const tableHeader = ["ID", "ФИО", "Пол", "Email", "Телефон", "Адрес", ""];

function openEditModal(id: number) {
  openDialog(ClientsCreateEditModal, {
    id,
    onSave: () => emit("loadData"),
    onCancel: () => console.log("CANCEL"),
  });
}
</script>

<template>
  <Table v-if="props.dataTable.length !== 0">
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
      <TableRow
        class="text-base font-normal!"
        v-for="item in props.dataTable"
        :key="`client-${item.id}`"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.firstName }} {{ item.middleName }} {{ item.lastName }}</td>
        <td>
          {{ gender.find((el) => item.gender === el.value).label || "" }}
        </td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.address }}</td>
        <td>
          <TableRowActions
            @edit="openEditModal(item.id)"
            @delete="emit('loadData')"
          />
        </td>
      </TableRow>
    </TableBody>
  </Table>
  <NotFound v-else />
</template>
