<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import { searchFilterObject } from "@/composables/useFilter";
import { DialogPlugin } from "@/composables/useDialog";

import { Card } from "@/components/ui/card";
import Button from "@/components/ui/button/Button.vue";

import SalesTable from "@/components/Private/Sales/SalesTable.vue";
import SalesCreateEditModal from "@/components/Private/Sales/SalesCreateEditModal.vue";

import SearchInput from "@/components/General/SearchInput/SearchInput.vue";

import { useSalesStore } from "@/store/Sales/SalesStore";

import { Sale } from "@/types/sales/sales";

type Props = {
  companyId?: number;
  clientId?: number;
};

const props = withDefaults(defineProps<Props>(), {
  companyId: 0,
  clientId: 0,
});

const { openDialog } = DialogPlugin();

const salesStore = useSalesStore();

const isFilter = ref(null);
const search = ref("");

function openCreateClientModal() {
  openDialog(SalesCreateEditModal, {
    clientId: props.clientId || 0,
    companyId: props.companyId || 0,
  });
}

const filteredSales = computed<Sale[]>(() => {
  console.log("!!!", salesStore.sales);
  let sales = [...salesStore.sales];
  if (props.clientId !== 0)
    sales = sales.filter((sale) => sale.clientId === props.clientId);
  // if (props.companyId !== 0)
  //   sales = sales.filter((sale) => sale.companyId === props.companyId);
  if (search.value.length !== 0)
    return searchFilterObject(sales, ["id", "price"], search.value);

  return sales;
});

onMounted(() => console.log(props.clientId));
</script>

<template>
  <div class="c-page h-full">
    <div class="c-flex-row">
      <div class="font-bold text-xl">Сделки</div>
      <SearchInput
        v-model="search"
        @search="isFilter === true"
        placeholder="Введите цену или id сделки"
      />
      <Button @click="openCreateClientModal"> Добавить </Button>
    </div>
    <Card class="c-page-el">
      <SalesTable :data-table="filteredSales" />
    </Card>
  </div>
</template>
