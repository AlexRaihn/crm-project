<script setup lang="ts">
import { TableOfContents, Edit, Trash } from "lucide-vue-next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Emits = {
  edit: [];
  delete: [];
};

type Props = {
  isDelete?: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <TableOfContents />
    </DropdownMenuTrigger>
    <DropdownMenuContent v-if="!isDelete">
      <DropdownMenuItem @click="emit('edit')">
        <Edit />
        Редактировать
      </DropdownMenuItem>
      <DropdownMenuItem @click="emit('delete')">
        <Trash />
        Удалить
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
