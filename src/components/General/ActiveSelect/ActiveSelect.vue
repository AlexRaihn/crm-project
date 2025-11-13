<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

import { statusOptions, type Options } from "@/enums/status";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  label?: string;
};

const props = defineProps<Props>();

// если вы используете Vue Macros / defineModel — ок.
// Иначе, если не работает — замените на defineProps/emit v-model реализацию.
const model = defineModel<boolean | null>({ default: false });

const isSelect = ref<Options | undefined>(undefined);

watch(isSelect, (newVal) => {
  model.value = newVal ? newVal.value : null;
});

onMounted(() => {
  isSelect.value = statusOptions.find((el) => el.value === model.value);
});
</script>

<template>
  <Select v-model="isSelect">
    <SelectTrigger class="w-[180px]">
      <!-- безопасно: если нет выбора — показываем props.label -->
      <SelectValue :placeholder="isSelect ? isSelect.label : props.label" />
    </SelectTrigger>

    <SelectContent>
      <SelectGroup>
        <SelectLabel>{{ props.label }}</SelectLabel>

        <!-- передаём в value весь объект item, чтобы v-model получал Options -->
        <SelectItem
          v-for="item in statusOptions"
          :key="item.label"
          :value="item"
        >
          {{ item.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
