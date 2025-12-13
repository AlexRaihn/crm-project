<script setup lang="ts">
import { vMaska } from "maska/vue";

import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
import Checkbox from "@/components/ui/checkbox/Checkbox.vue";
import ObjectSelector from "@/components/General/Selects/ObjectSelector.vue";

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
    <div class="flex gap-2 items-center">
      <Checkbox
        @update:model-value="
          () => {
            if (client.gender === 0) client.gender = 1;
            else client.gender = 0;
          }
        "
      />
      {{ gender[client.gender].label }}
    </div>
    <Input v-model="client.email" placeholder="Email" class="col-span-2" />
    <Input
      v-model="client.phone"
      v-maska="'+7 (###)-###-##-##'"
      placeholder="Телефон"
    />
    <ObjectSelector
      v-model="client.companyId"
      placeholder="Компания"
      class="w-full"
      :items="
        companies.map((el) => {
          return {
            label: el.name,
            value: el.id,
          };
        })
      "
    />
    <Input v-model="client.address" placeholder="Адрес" class="col-span-2" />
    <div class="flex justify-end gap-2 w-full">
      <Button variant="outline" @click="emit('cancel')">Отмена</Button>
      <Button @click="getValues">Сохранить</Button>
    </div>
  </div>
</template>
