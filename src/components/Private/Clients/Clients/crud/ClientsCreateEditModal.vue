<script setup lang="ts">
import { onMounted, ref } from "vue";

import ClientForm from "../ClientForm.vue";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useClientsStore } from "@/store/clients/ClientsStore";

import { Client, emptyClient } from "@/types/clients/Clients";

import { DialogPlugin } from "@/composables/useDialog";
import { toast } from "vue-sonner";

type Props = {
  id?: Client["id"];
  companyId?: Client["companyId"];
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

const form = ref<Client>({ ...emptyClient });
const isLoading = ref<boolean>(false);

async function getCLient() {
  if (props.companyId) form.value.companyId = props.companyId;

  if (!props.id || props.id === 0) return;

  isLoading.value = true;
  try {
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
    if (props.id !== 0) {
      await updateClient(form.value);
      toast.success("Клиент успешно обновлён!");
    } else {
      await createClient(form.value);
      toast.success("Клиент успешно создан!");
    }

    emit("save");
    onDialogHide();
  } catch (error) {
    console.error("Error saving client:", error);
    toast.error("Ошибка при создании клиента!");
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
        {{ form.id !== 0 ? "Редактировать клиента" : "Новый клиент" }}
      </DialogTitle>
    </DialogHeader>
    <ClientForm v-model:client="form" @cancel="closeModal" @save="saveClient" />
  </DialogContent>
</template>
