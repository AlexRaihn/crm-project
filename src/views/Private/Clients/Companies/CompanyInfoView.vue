<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import Card from "@/components/ui/card/Card.vue";
import Button from "@/components/ui/button/Button.vue";

import ClientsView from "../ClientsView.vue";

import { useCompaniesStore } from "@/store/clients/CompaniesStore";
import { useSalesStore } from "@/store/Sales/SalesStore";
import { useClientsStore } from "@/store/clients/ClientsStore";

import { Company, emptyCompany } from "@/types/clients/Companies";

type Props = {
  companyId?: number;
};

type CompanyPriceUsers = {
  users: number,
  sales: number,
  salesPrice: number,
}

const props = defineProps<Props>();

const router = useRouter()

const companiesStore = useCompaniesStore();
const clientsStore = useClientsStore()
const salesStore = useSalesStore()

const isLoading = ref(false);

const company = ref<Company>({
  ...emptyCompany,
  id: props.companyId,
});

const companyUsersPrices = computed<CompanyPriceUsers>(() => {
  let users = clientsStore.clients.filter(el => el.companyId === company.value.id).length
  let sales = salesStore.sales.filter(el => el.companyId === company.value.id)
  let salesPrice: number = 0
  for (const item of sales) {
    salesPrice += item.price
  }
  return {
    users,
    sales: sales.length,
    salesPrice
  }
})

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
  <div class="c-page h-full">
    <div class="flex gap-2 items-center">
      <Button @click="router.go(-1)">
        Назад
      </Button>
      <div class="font-bold text-xl">
        Информация о компании
      </div>
    </div>
    <Card
      class="flex md:flex-row! @max-xs:justify-start flex-nowrap gap-4 items-center justify-between w-full overflow-auto">
      <div class="c-flex-col">
        <div class="flex gap-1">
          Название компании: <span class="font-bold">{{ company.name }}</span>
        </div>
        <div class="flex gap-1">
          ИНН: <span class="font-bold">{{ company.inn }}</span>
        </div>
        <div class="flex gap-1">
          Отрасль: <span class="font-bold">{{ company.industry }}</span>
        </div>
        <div class="flex gap-1">
          Сайт: <span class="font-bold text-blue-500">{{ company.websiteUrl }}</span>
        </div>
      </div>
      <div class="c-flex-col">
        <div class="flex gap-1">
          Кол-во представителей компании <span class="font-bold">{{ companyUsersPrices.users }}</span>
        </div>
        <div class="flex gap-1">
          Кол-во сделок: <span class="font-bold">{{ companyUsersPrices.sales }}</span>
        </div>
        <div class="flex gap-1">
          Стоимость сделок компании: <span class="font-bold">{{ companyUsersPrices.salesPrice }}</span>
        </div>
      </div>
    </Card>
    <ClientsView :companyId="props.companyId" />
  </div>
</template>
