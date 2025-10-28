<script setup lang="ts">
import {
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableRowActions,
} from "@/components/ui/table";

import NotFound from "@/components/ui/not-fount/NotFound.vue";

//import { DialogPlugin } from "@/composables/useDialog";

import type { Company } from "@/types/clients/Companies";

type Emits = {
  loadData: [];
};

type Props = {
  dataTable: Company[];
};

const props = withDefaults(defineProps<Props>(), {
  dataTable: () => [],
});
const emit = defineEmits<Emits>();

//const { openDialog } = DialogPlugin();

const tableHeader = [
  "ID",
  "Наименование организации",
  "ИНН",
  "Индустрия",
  "Сайт",
  "",
];

// function openEditModal(id: number) {
//   openDialog(ClientsCreateEditModal, {
//     id,
//     onSave: () => emit("loadData"),
//     onCancel: () => console.log("CANCEL"),
//   });
// }
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
        <td class="text-center">{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td class="text-center">
          {{ item.inn }}
        </td>
        <td class="text-center">{{ item.industry }}</td>
        <td>{{ item.websiteUrl }}</td>
        <td>
          <TableRowActions />
        </td>
      </TableRow>
    </TableBody>
  </Table>
  <NotFound v-else />
</template>
