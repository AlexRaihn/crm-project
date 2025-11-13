<script setup lang="ts">
import { ref, computed } from "vue";

// import { searchFilterObject } from "@/composables/useFilter";

import { Card } from "@/components/ui/card";

import SearchInput from "@/components/General/SearchInput/SearchInput.vue";
//import ActiveSelect from "@/components/General/ActiveSelect/ActiveSelect.vue";

//import { useCompaniesStore } from "@/store/clients/CompaniesStore";

import { Sale } from "@/types/sales/sales";

//const companiesStore = useCompaniesStore();

const search = ref("");

const filteredCompanies = computed<Sale[]>(() => {
  return [];

  //   if (search.value.length === 0 && isActive.value === null)
  //     return companiesStore.companies;

  //   let filterClients: Sale[] = companiesStore.companies;

  //   if (search.value.length > 0)
  //     filterClients = searchFilterObject(
  //       companiesStore.companies,
  //       ["name", "inn", "websiteUrl"],
  //       search.value
  //     );

  //   if (isActive.value !== null)
  //     filterClients = filterClients.filter(
  //       (el) => el.isDelete === isActive.value
  //     );

  //   return filterClients;
});
</script>

<template>
  <div class="c-page h-full">
    <div class="c-flex-row">
      <div class="font-bold text-xl w-full">Сделки компании</div>
      <SearchInput
        v-model="search"
        placeholder="Введите номер сделки, ИНН или наимнование организации"
      />
      <!-- <ActiveSelect v-model="isActive" /> -->
    </div>
    <Card class="c-page-el"> </Card>
  </div>
</template>
