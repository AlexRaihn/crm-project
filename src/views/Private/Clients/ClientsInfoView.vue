<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";

import SalesView from "../Sales/SalesView.vue";

import { useClientsStore } from "@/store/clients/ClientsStore";
import { gender } from "@/enums/gender";

import { Client, emptyClient } from "@/types/clients/Clients";
import { useSalesStore } from "@/store/Sales/SalesStore";

type Props = {
  clientId: number;
};

type SalesAnalystic = {
  sales: number,
  price: number
}

const props = defineProps<Props>();

const router = useRouter()

const clientsStore = useClientsStore();
const salesStore = useSalesStore()

const isLoading = ref(false);

const client = ref<Client>({
  ...emptyClient,
  id: props.clientId,
});

const salesAnalystic = computed<SalesAnalystic>(() => {
  let sales = salesStore.sales.filter(el => el.clientId === client.value.id)
  let price: number = 0
  for (const el of sales) {
    price += el.price
  }
  return {
    sales: sales.length,
    price
  }
})

onMounted(async () => {
  try {
    isLoading.value = true;
    const res = await clientsStore.getClientById(Number(props.clientId));
    if (res) client.value = res;
  } catch {
    console.log("!Ошибка при загрузке информации о клиенте");
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="c-page h-full gap-6">
    <div class="flex gap-2 items-center">
      <Button @click="router.go(-1)">
        Назад
      </Button>
      <div class="font-bold text-xl">
        Информация о клиенте
      </div>
    </div>
    <Card class="c-flex-col w-full overflow-auto">
      <div class="flex gap-1">
        Фамилия: <span class="font-bold">{{ client.lastName }}</span>
      </div>
      <div class="flex gap-1">
        Имя: <span class="font-bold">{{ client.middleName }}</span>
      </div>
      <div class="flex gap-1">
        Отчество: <span class="font-bold">{{ client.lastName }}</span>
      </div>
      <div class="flex gap-1">
        Пол: <span class="font-bold">{{ gender[client.gender].label }}</span>
      </div>
      <div class="flex gap-1">
        Адрес: <span class="font-bold">{{ client.address }}</span>
      </div>
      <div class="flex gap-1">
        Телефон: <span class="font-bold">{{ client.phone }}</span>
      </div>
      <div class="flex gap-1">
        Почта: <span class="font-bold">{{ client.email }}</span>
      </div>
    </Card>
    <Card class="c-flex-col w-full">
      <div class="flex gap-1">
        Кол-во сделок: <span class="font-bold">{{ salesAnalystic.sales }}</span>
      </div>
      <div class="flex gap-1">
        Общая стоимость сделок <span class="font-bold">{{ salesAnalystic.price }}</span>
      </div>
    </Card>

    <SalesView v-if="!isLoading" :clientId="client.id" :companyId="client.companyId" />
  </div>
</template>
