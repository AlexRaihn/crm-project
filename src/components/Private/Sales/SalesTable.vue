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
import { formatToLocaleDate } from "@/composables/useFormatData";

//import ClientsCreateEditModal from "./crud/ClientsCreateEditModal.vue";
import SalesCreateEditModal from "./SalesCreateEditModal.vue";
import DeleteModal from "@/components/General/DeleteModal/DeleteModal.vue";

import { useSalesStore } from "@/store/Sales/SalesStore";

import { Sale } from "@/types/sales/sales";

type Emits = {
  loadData: [];
};

type Props = {
  dataTable: Sale[];
  clientId?: number;
  companyId?: number;
};

const props = withDefaults(defineProps<Props>(), {
  dataTable: () => [],
  clientId: 0,
  companyId: 0,
});
const emit = defineEmits<Emits>();

const { openDialog } = DialogPlugin();

const { deleteSale } = useSalesStore();

const tableHeader = ["ID", "Цена", "Статус", "Дата начала", "Дата окончания"];

function openEditModal(id: number) {
  openDialog(
    SalesCreateEditModal,
    {
      id,
      clientId: props.clientId || 0,
      companyId: props.companyId || 0,
    },
    {
      save: () => {
        toast.success("Сделка успешно обновлена");
        emit("loadData");
      },
      cancel: () => console.log("CANCEL"),
    }
  );
}

function openDeleteModal(el: Sale) {
  openDialog(
    DeleteModal,
    {
      item: {
        id: el.id,
        title: "сделку",
        entity: `${el.id}`,
      },
    },
    {
      delete: () => {
        deleteSale(el.id);
        toast.error("Сделка успешно удален");
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
        <td>{{ item.price }}</td>
        <td>{{ item.status }}</td>
        <td>{{ formatToLocaleDate(item.dateStart) }}</td>
        <td>
          {{ formatToLocaleDate(item.dateEnd) }}
        </td>
        <td>
          <TableRowActions
            @delete="openDeleteModal(item)"
            @edit="openEditModal(item.id)"
          />
        </td>
      </TableRow>
    </TableBody>
  </Table>
  <NotFound v-else />
</template>
