<script setup lang="ts">
import { ref, computed } from "vue";

import { searchFilterObject } from "@/composables/useFilter";
import { DialogPlugin } from "@/composables/useDialog";

import { Card } from "@/components/ui/card";
import Button from "@/components/ui/button/Button.vue";

import CompaniesTable from "@/components/Private/Clients/Companies/CompaniesTable.vue";
import SearchInput from "@/components/General/SearchInput/SearchInput.vue";
import ActiveSelect from "@/components/General/ActiveSelect/ActiveSelect.vue";

import CompaniesEditCreateModal from "@/components/Private/Clients/Companies/crud/CompaniesEditCreateModal.vue";
import { useCompaniesStore } from "@/store/clients/CompaniesStore";

import type { Company } from "@/types/clients/Companies";

const companiesStore = useCompaniesStore();
const { openDialog } = DialogPlugin();

const search = ref("");
const isActive = ref(false);

function createCompanyModal() {
  openDialog(CompaniesEditCreateModal)
}

const filteredCompanies = computed<Company[]>(() => {
  if (search.value.length === 0 && isActive.value === null)
    return companiesStore.companies;

  let filterClients: Company[] = companiesStore.companies;

  if (search.value.length > 0)
    filterClients = searchFilterObject(
      companiesStore.companies,
      ["name", "inn", "websiteUrl"],
      search.value
    );

  if (isActive.value !== null)
    filterClients = filterClients.filter(
      (el) => el.isDelete === isActive.value
    );

  return filterClients;
});
</script>

<template>
  <div class="c-page h-full">
    <div class="c-flex-row">
      <SearchInput v-model="search" placeholder="Введите наименование, ИНН или вебсайт компании" />
      <ActiveSelect v-model="isActive" />
      <Button @click="createCompanyModal">Добавить</Button>
    </div>
    <Card class="c-page-el">
      <CompaniesTable :data-table="filteredCompanies" />
    </Card>
  </div>
</template>
