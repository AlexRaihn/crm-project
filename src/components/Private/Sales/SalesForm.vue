<script setup lang="ts">
import { Input, CalendarInput } from "@/components/ui/input";
import Button from "@/components/ui/button/Button.vue";
import ObjectSelector from "@/components/General/Selects/ObjectSelector.vue";

import { salesStatusOptions } from "@/enums/sales";

import { Sale, emptySaleModel } from "@/types/sales/sales";

import { useConfigStore } from "@/store/configStore";
import { computed, ref } from "vue";

type Emits = {
  save: [];
  cancel: [];
};

const emit = defineEmits<Emits>();

const { crmUsers } = useConfigStore()

const sale = defineModel<Sale>("sale", {
  default: { ...emptySaleModel },
});

const salers = computed(() => {
  return crmUsers.filter(el => el.role === 3 || el.role === 5)
})

const test1 = ref(new Date('2024-09-20'))

function save() {
  emit("save");
}
</script>

<template>
  <div class="c-flex-col gap-4">
    <Input v-model="sale.description" placeholder="Описание сделки" />
    <Input v-model.number.trim="sale.price" type="number" placeholder="Цена" />
    <div class="c-flex-col gap-2!">
      <div class="font-bold">Статус сделки</div>
      <ObjectSelector :items="salesStatusOptions" v-model="sale.status" />
    </div>
    <div class="c-flex-col gap-2!">
      <div class="font-bold">Менеджер</div>
      <ObjectSelector placeholder="Выберите менеджера" :items="salers.map(el => {
        return {
          label: `${el.firstName} ${el.middleName} ${el.lastName}`,
          value: el.id
        }
      })" v-model="sale.salerId" />
    </div>
    <div class="flex gap-2">
      <CalendarInput placeholder="Дата начала" type="date" v-model="sale.dateStart" />
      <CalendarInput placeholder="Дата окончания" type="date" v-model="sale.dateEnd" />
    </div>
    <div class="flex justify-end gap-2 w-full mt-2">
      <Button variant="outline" @click="emit('cancel')">Отмена</Button>
      <Button @click="save">Сохранить</Button>
    </div>
  </div>
</template>
