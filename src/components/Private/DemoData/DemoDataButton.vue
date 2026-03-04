<script setup lang="ts">
import { ref } from "vue";

import Button from "@/components/ui/button/Button.vue";

import { useClientsStore } from "@/store/clients/ClientsStore";
import { useCompaniesStore } from "@/store/clients/CompaniesStore";
import { useSalesStore } from "@/store/Sales/SalesStore";
import { useConfigStore } from "@/store/configStore";

import { toast } from "vue-sonner";

const clientsStore = useClientsStore();
const companiesStore = useCompaniesStore();
const salesStore = useSalesStore()
const configStore = useConfigStore()

const isLoading = ref<boolean>(false);

async function loadDemoData() {
  isLoading.value = true;
  try {
    const salersIds = configStore.crmUsers.filter(el => el.role === 5 || el.role === 3).map(el => el.id)

    await companiesStore.generateCompanies();
    console.log("Companies:", companiesStore.companies);
    const companyIds = companiesStore.companies.map(el => el.id)

    await clientsStore.generateClients(companyIds);
    console.log("Clients:", clientsStore.clients);
    const clientIds = clientsStore.clients.map(el => el.id)

    await salesStore.generateSales(salersIds, companyIds, clientIds)
    console.log("Sales:", salesStore.sales);

    console.log("Demo data loaded on mount.");
    toast.success("Демо данные успешно созданы!");
  } catch (error) {
    console.error("Error fetching data on mount:", error);
  } finally {
    await setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
}
</script>

<template>
  <Button :is-loading="isLoading" @click="loadDemoData">
    Загрузить демо данные
  </Button>
</template>
