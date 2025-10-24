<script setup lang="ts">
import { onMounted, ref } from "vue";
import { vMaska } from "maska/vue";

import {
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { createEmptyMock } from "@/composables/defaultModel";

import { useClientsStore } from "@/store/clients/ClientsStore";

import { Client } from "@/types/clients/Clients";

import { DialogPlugin } from "@/composables/useDialog";

type Props = {
  id?: Client["id"];
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

const { getClientById, updateClient, createClient } = useClientsStore();

const form = ref<Client>(createEmptyMock<Client>({ id: 0 }));
const isLoading = ref<boolean>(false);

async function getCLient() {
  isLoading.value = true;
  try {
    if (!props.id || props.id === 0) return;
    const res = await getClientById(props.id);
    form.value = {
      ...res,
    };
  } catch (error) {
    console.error("Error fetching client:", error);
  } finally {
    isLoading.value = false;
  }
}

async function saveClient() {
  try {
    let res = null;
    if (props.id !== 0) res = await updateClient(form.value);
    else res = await createClient(form.value);

    console.log("Client saved:", res);

    emit("save");
    onDialogHide();
  } catch (error) {
    console.error("Error saving client:", error);
  }
}

function closeModal() {
  emit("cancel");
  onDialogHide();
}

onMounted(async () => {
  await getCLient();
});
</script>

<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        {{ props.id !== 0 ? "Редактировать клиента" : "Новый клиент" }}
      </DialogTitle>
    </DialogHeader>
    <form v-if="!isLoading" class="grid grid-cols-2 gap-3">
      <Input v-model="form.firstName" placeholder="Имя" />
      <Input v-model="form.lastName" placeholder="Фамилия" />
      <Input v-model="form.middleName" placeholder="Отчество" />
      <Input v-model="form.email" placeholder="Email" class="col-span-2" />
      <Input
        v-model="form.phone"
        v-maska="'+7 (###)-###-##-##'"
        placeholder="Телефон"
      />
      <Input v-model="form.address" placeholder="Адрес" class="col-span-2" />
    </form>
    <DialogFooter>
      <div class="flex justify-end gap-2 w-full">
        <Button variant="outline" @click="closeModal">Отмена</Button>
        <Button @click="saveClient">Сохранить</Button>
      </div>
    </DialogFooter>
  </DialogContent>
</template>
