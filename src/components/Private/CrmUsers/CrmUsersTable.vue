<script setup lang="ts">
import { computed } from "vue";

import {
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableRowActions,
} from "@/components/ui/table";
import NotFound from "@/components/ui/not-fount/NotFound.vue";

import { DialogPlugin } from "@/composables/useDialog";

import { useConfigStore } from "@/store/configStore";

import { gender } from "@/enums/gender";

type Emits = {
  loadData: [];
};

const emit = defineEmits<Emits>();

const { openDialog } = DialogPlugin();

const { crmUsers } = useConfigStore();

const clientsTable = computed(() => crmUsers);

const tableHeader = ["ID", "ФИО", "Логин", "Роль", "Пол", "Email", "Телефон"];

// function openEditModal(id: number) {
//   openDialog(, {
//     id,
//     onSave: () => emit("loadData"),
//     onCancel: () => console.log("CANCEL"),
//   });
// }
</script>

<template>
  <Table v-if="clientsTable.length !== 0">
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
        v-for="item in clientsTable"
        :key="`client-${item.id}`"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.firstName }} {{ item.middleName }} {{ item.lastName }}</td>
        <td>{{ item.login }}</td>
        <td>{{ item.role }}</td>
        <td>
          {{ gender.find((el) => item.gender === el.value).label || "" }}
        </td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
        <td>
          <TableRowActions />
        </td>
      </TableRow>
    </TableBody>
  </Table>
  <NotFound v-else />
</template>
