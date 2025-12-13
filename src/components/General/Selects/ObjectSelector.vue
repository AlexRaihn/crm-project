<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectItemObject {
  label: string;
  value: any;
}

const props = defineProps<{
  items: SelectItemObject[];
  placeholder?: string;
}>();

const modelValue = defineModel<unknown>({
  default: undefined,
});
</script>

<template>
  <Select v-model="modelValue">
    <SelectTrigger class="w-full">
      <SelectValue :placeholder="props.placeholder || 'Выберите элемент...'" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem
        v-for="item in props.items"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
