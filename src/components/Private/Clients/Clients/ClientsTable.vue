<script setup lang="ts">
import {
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableRowActions,
} from "@/components/ui/table";

import NotFound from "@/components/ui/not-fount/NotFound.vue";

import { DialogPlugin } from "@/composables/useDialog";
import { toast } from "vue-sonner";

import ClientsCreateEditModal from "./crud/ClientsCreateEditModal.vue";
import DeleteModal from "@/components/General/DeleteModal/DeleteModal.vue";

import { useClientsStore } from "@/store/clients/ClientsStore";

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

const { deleteClient } = useClientsStore();

const tableHeader = ["ID", "ФИО", "Пол", "Почта", "Телефон", "Адрес", ""];

function openEditModal(id: number) {
  openDialog(
    ClientsCreateEditModal,
    {
      id,
    },
    {
      save: () => {
        toast.success("Клиент успешно обновлён");
        emit("loadData");
      },
      cancel: () => console.log("CANCEL"),
    }
  );
}

function openDeleteModal(el: Client) {
  openDialog(
    DeleteModal,
    {
      item: {
        id: el.id,
        title: "Клиента",
        entity: `${el.firstName} ${el.middleName} ${el.lastName}`,
      },
    },
    {
      delete: () => {
        deleteClient(el.id);
        toast.error("Клиент успешно удален");
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
      <tr>
        <td
          v-for="item in tableHeader"
          :key="`client-table-header-${item}`"
          v-text="item"
        />
      </tr>
    </TableHeader>
    <TableBody>
      <TableRow v-for="item in props.dataTable" :key="`client-${item.id}`">
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
            @delete="openDeleteModal(item)"
          />
        </td>
      </TableRow>
    </TableBody>
  </Table>
  <NotFound v-else />
</template>
