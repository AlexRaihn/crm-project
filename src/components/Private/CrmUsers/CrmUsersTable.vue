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

import { useConfigStore } from "@/store/configStore";

import { gender } from "@/enums/gender";
import { userRole } from "@/enums/role";

import { CrmUser } from "@/types/config";

type Emits = {
  loadData: [];
};

type Props = {
  dataTable: CrmUser[];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//const { openDialog } = DialogPlugin();

const tableHeader = ["ID", "ФИО", "Логин", "Роль", "Пол", "Email"];

// function openEditModal(id: number) {
//   openDialog(, {
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
        <td v-for="item in tableHeader" :key="`client-table-header-${item}`" v-text="item" />
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow class="text-base font-normal!" v-for="item in props.dataTable" :key="`client-${item.id}`">
        <td>{{ item.id }}</td>
        <td>{{ item.firstName }} {{ item.middleName }} {{ item.lastName }}</td>
        <td>{{ item.login }}</td>
        <td>
          {{userRole.find((el) => el.value === item.role)?.label || ""}}
        </td>
        <td>
          {{gender.find((el) => item.gender === el.value).label || ""}}
        </td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
        <!-- <td>
          <TableRowActions />
        </td> -->
      </TableRow>
    </TableBody>
  </Table>
  <NotFound v-else />
</template>
