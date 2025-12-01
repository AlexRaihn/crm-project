<script setup lang="ts">
import { onMounted, ref } from "vue";

import ClientsView from "../ClientsView.vue";

import { useCompaniesStore } from "@/store/clients/CompaniesStore";

import { Company, emptyCompany } from "@/types/clients/Companies";

type Props = {
  companyId?: number;
};

const props = defineProps<Props>();

const companiesStore = useCompaniesStore();

const isLoading = ref(false);

const company = ref<Company>({
  ...emptyCompany,
  id: props.companyId,
});

onMounted(async () => {
  try {
    isLoading.value = true;
    const res = await companiesStore.getCompanyById(Number(props.companyId));
    if (res) company.value = res;
  } catch {
    console.log("!Ошибка при загрузке информации о клиенте");
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="c-page h-full gap-6">
    <div class="font-bold text-xl">
      Информация о клиентах из этой компании:
      {{ company.name }}
    </div>
    <ClientsView :companyId="props.companyId" />
  </div>
</template>
