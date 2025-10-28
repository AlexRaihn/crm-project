<script setup lang="ts">
import {
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import Button from "@/components/ui/button/Button.vue";

import { DialogPlugin } from "@/composables/useDialog";

type DeleteItem = {
  id: number;
  title?: string;
  entity: string;
};

type Props = {
  item: DeleteItem;
};

type Emits = {
  delete: DeleteItem["id"][];
  cancel: [];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { onDialogHide } = DialogPlugin();

async function deleteReq() {
  emit("delete", props.item.id);
}

function closeModal() {
  emit("cancel");
  onDialogHide();
}
</script>

<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle> Удалить {{ props.item.title }} </DialogTitle>
    </DialogHeader>
    {{ `Вы уверены, что хотите удалить данную ${props.item.entity}?` }}
    <DialogFooter>
      <div class="flex justify-end gap-2 w-full">
        <Button variant="outline" @click="closeModal">Отмена</Button>
        <Button class="bg-red-1000" @click="deleteReq">Удалить</Button>
      </div>
    </DialogFooter>
  </DialogContent>
</template>
