<script setup lang="ts">
import {
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableRowActions,
} from "@/components/ui/table";

import NotFound from "@/components/ui/not-fount/NotFound.vue";
import DeleteModal from "@/components/General/DeleteModal/DeleteModal.vue";

import { DialogPlugin } from "@/composables/useDialog";
import { toast } from "vue-sonner";

import { useCompaniesStore } from "@/store/clients/CompaniesStore";

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

const { openDialog } = DialogPlugin();
const { deleteCompany } = useCompaniesStore();

const tableHeader = [
  "ID",
  "Наименование организации",
  "Статус",
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

function openDeleteModal(el: Company) {
  openDialog(
    DeleteModal,
    {
      item: {
        id: el.id,
        title: "Клиента",
        entity: `${el.name}`,
      },
    },
    {
      delete: () => {
        deleteCompany(el.id);
        toast.error("Организация успешно удалена");
        emit("loadData");
      },
      cancel: () => {},
    }
  );
}
</script>

<template>
  <Table v-if="props.dataTable.length !== 0">
    <TableHeader>
      <TableRow>
        <td
          v-for="item in tableHeader"
          :key="`client-table-header-${item}`"
          v-text="item"
        />
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="item in props.dataTable" :key="`client-${item.id}`">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.isDelete }}</td>
        <td>
          {{ item.inn }}
        </td>
        <td>{{ item.industry }}</td>
        <td>
          <span class="text-blue-500 cursor-pointer">{{
            item.websiteUrl
          }}</span>
        </td>
        <td>
          <TableRowActions
            v-if="!item.isDelete"
            :is-delete="item.isDelete"
            @delete="openDeleteModal(item)"
          />
        </td>
      </TableRow>
    </TableBody>
  </Table>
  <NotFound v-else />
</template>

<style scoped></style>
