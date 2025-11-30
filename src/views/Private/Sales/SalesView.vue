<script setup lang="ts">
import { ref, computed } from "vue";

import { searchFilterObject } from "@/composables/useFilter";
import { DialogPlugin } from "@/composables/useDialog";

import { Card } from "@/components/ui/card";
import Button from "@/components/ui/button/Button.vue";

import SalesTable from "@/components/Private/Sales/SalesTable.vue";
import SalesCreateEditModal from "@/components/Private/Sales/SalesCreateEditModal.vue";

import SearchInput from "@/components/General/SearchInput/SearchInput.vue";

import { useSalesStore } from "@/store/Sales/SalesStore";

import { Sale } from "@/types/sales/sales";

const { openDialog } = DialogPlugin();

const salesStore = useSalesStore();

const isFilter = ref(null);
const search = ref("");

function openCreateClientModal() {
  openDialog(SalesCreateEditModal, {});
}

const filteredSales = computed<Sale[]>(() => {
  if (search.value.length !== 0)
    return searchFilterObject(salesStore.sales, ["id", "price"], search.value);

  return salesStore.sales;
});
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
