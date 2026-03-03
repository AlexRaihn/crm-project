<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { EditIcon } from "lucide-vue-next";
import Card from "@/components/ui/card/Card.vue";
import Button from "@/components/ui/button/Button.vue";

import { DialogPlugin } from "@/composables/useDialog";
import { toast } from "vue-sonner";

import CompaniesEditCreateModal from "@/components/Private/Clients/Companies/crud/CompaniesEditCreateModal.vue";
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

const { openDialog } = DialogPlugin();

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

async function getCompany() {
  try {
    isLoading.value = true;
    const res = await companiesStore.getCompanyById(Number(props.companyId));
    if (res) company.value = res;
  } catch {
    console.log("!Ошибка при загрузке информации о клиенте");
  } finally {
    isLoading.value = false;
  }
}

function openEditModal() {
  openDialog(
    CompaniesEditCreateModal,
    {
      id: company.value.id,
    },
    {
      save: async () => {
        await getCompany()
      },
      cancel: () => console.log("CANCEL"),
    }
  );
}

onMounted(async () => {
  await getCompany()
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
      <Button class="rounded-full" @click="openEditModal">
        <EditIcon />
      </Button>
    </div>
    <Card class="flex flex-col lg:flex-row gap-4 items-start lg:items-center lg:justify-between w-full overflow-auto">
      <div class="c-flex-col">
        <div>
          Название: <span class="font-bold">{{ company.name }}</span>
        </div>
        <div>
          ИНН: <span class="font-bold">{{ company.inn }}</span>
        </div>
        <div>
          Отрасль: <span class="font-bold">{{ company.industry }}</span>
        </div>
        <div>
          Сайт: <span class="font-bold text-blue-500">{{ company.websiteUrl }}</span>
        </div>
      </div>
      <div class="c-flex-col">
        <div>
          Кол-во представителей <span class="font-bold">{{ companyUsersPrices.users }}</span>
        </div>
        <div>
          Кол-во сделок: <span class="font-bold">{{ companyUsersPrices.sales }}</span>
        </div>
        <div>
          Стоимость сделок: <span class="font-bold">{{ companyUsersPrices.salesPrice }}</span>
        </div>
      </div>
    </Card>
    <div class="flex-col flex gap-1">
      <span class="font-bold">Информация о клиентах из этой компании: {{ company.name }}</span>
      <ClientsView :companyId="props.companyId" />
    </div>
  </div>
</template>
