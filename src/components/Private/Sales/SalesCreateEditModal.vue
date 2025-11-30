<script setup lang="ts">
import { onMounted, ref } from "vue";

import SalesForm from "./SalesForm.vue";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useSalesStore } from "@/store/Sales/SalesStore";

import { Sale, emptySaleModel } from "@/types/sales/sales";

import { DialogPlugin } from "@/composables/useDialog";
import { toast } from "vue-sonner";

type Props = {
  id?: Sale["id"];
};

type Emits = {
  save: [];
  cancel: [];
};

const props = withDefaults(defineProps<Props>(), {
  id: 0,
});
const emit = defineEmits<Emits>();

const { onDialogHide } = DialogPlugin();

const { getSaleById, updateSale, createSale } = useSalesStore();

const form = ref<Sale>({ ...emptySaleModel });
const isLoading = ref<boolean>(false);

async function getSale() {
  if (!props.id || props.id === 0) return;
  try {
    isLoading.value = true;
    const res = await getSaleById(props.id);

    form.value = {
      ...res,
    };
  } catch (error) {
    console.error("Error fetching sale:", error);
    toast.error("Ошибка при загрузке данных сделки!");
  } finally {
    isLoading.value = false;
  }
}

async function saveSale() {
  try {
    if (props.id !== 0) {
      await updateSale(form.value);
      toast.success("Сделка успешно обновлена!");
    } else {
      await createSale(form.value);
      toast.success("Сделка успешно создана!");
    }

    emit("save");
    onDialogHide();
  } catch (error) {
    console.error("Error saving sale:", error);
    toast.error("Ошибка при сохранении сделки! Пожалуйста, проверьте данные.");
  }
}

function closeModal() {
  emit("cancel");
  onDialogHide();
}

onMounted(async () => {
  await getSale();
});
</script>

<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        {{ form.id !== 0 ? "Редактировать сделку" : "Новая сделка" }}
      </DialogTitle>
    </DialogHeader>
    <SalesForm v-model:sale="form" @cancel="closeModal" @save="saveSale" />
  </DialogContent>
</template>
