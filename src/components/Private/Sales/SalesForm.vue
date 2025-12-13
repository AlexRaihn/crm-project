<script setup lang="ts">
import { Input, CalendarInput } from "@/components/ui/input";
import Button from "@/components/ui/button/Button.vue";

import { Sale, emptySaleModel } from "@/types/sales/sales";

type Emits = {
  save: [];
  cancel: [];
};

const emit = defineEmits<Emits>();

const sale = defineModel<Sale>("sale", {
  default: { ...emptySaleModel },
});

function save() {
  emit("save");
}
</script>

<template>
  <div class="c-flex-col gap-4">
    <Input v-model="sale.description" placeholder="Описание сделки" />

    <Input v-model="sale.price" type="number" placeholder="Цена" />

    <div class="flex gap-2">
      <CalendarInput
        placeholder="Дата начала"
        type="date"
        v-model="sale.dateStart"
      />
      <CalendarInput
        placeholder="Дата окончания"
        type="date"
        v-model="sale.dateEnd"
      />
    </div>

    <div class="flex justify-end gap-2 w-full mt-2">
      <Button variant="outline" @click="emit('cancel')">Отмена</Button>
      <Button @click="save">Сохранить</Button>
    </div>
  </div>
</template>
