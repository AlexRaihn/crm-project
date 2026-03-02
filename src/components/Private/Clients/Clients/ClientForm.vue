<script setup lang="ts">
import { vMaska } from "maska/vue";

import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
import ObjectSelector from "@/components/General/Selects/ObjectSelector.vue";
import Tabs from "@/components/ui/tabs/Tabs.vue";
import TabsList from "@/components/ui/tabs/TabsList.vue";
import TabsTrigger from "@/components/ui/tabs/TabsTrigger.vue";

import { useCompaniesStore } from "@/store/clients/CompaniesStore";

import { gender } from "@/enums/gender";

import { Client, emptyClient } from "@/types/clients/Clients";

type Emits = {
  save: [];
  cancel: [];
};

const emit = defineEmits<Emits>();

const client = defineModel<Client>("client", {
  default: { ...emptyClient },
});

const { companies } = useCompaniesStore();

function getValues() {
  emit("save");
}
</script>

<template>
  <div class="c-flex-col">
    <Input v-model="client.firstName" placeholder="Имя" />
    <Input v-model="client.lastName" placeholder="Фамилия" />
    <Input v-model="client.middleName" placeholder="Отчество" />
    <Tabs v-model="client.gender" :default-value="gender[0].value">
      <TabsList>
        <TabsTrigger :value="gender[0].value">
          {{ gender[0].label }}
        </TabsTrigger>
        <TabsTrigger :value="gender[1].value">
          {{ gender[1].label }}
        </TabsTrigger>
      </TabsList>
    </Tabs>
    <Input v-model="client.email" placeholder="Email" class="col-span-2" />
    <Input v-model="client.phone" v-maska="'+7 (###)-###-##-##'" placeholder="Телефон" />
    <ObjectSelector v-model="client.companyId" placeholder="Компания" class="w-full" :items="companies.map((el) => {
      return {
        label: el.name,
        value: el.id,
      };
    })
      " />
    <Input v-model="client.address" placeholder="Адрес" class="col-span-2" />
    <div class="flex justify-end gap-2 w-full">
      <Button variant="outline" @click="emit('cancel')">Отмена</Button>
      <Button @click="getValues">Сохранить</Button>
    </div>
  </div>
</template>
