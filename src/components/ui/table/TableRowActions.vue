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

const emit = defineEmits<Emits>();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <TableOfContents />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
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
