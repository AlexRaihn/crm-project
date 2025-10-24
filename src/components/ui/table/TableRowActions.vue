<script setup lang="ts">
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
    <DropdownMenuTrigger>Действия</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem @click="emit('edit')">Редактировать</DropdownMenuItem>
      <DropdownMenuItem @click="emit('delete')">Удалить</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
