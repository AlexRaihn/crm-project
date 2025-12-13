<script setup lang="ts">
import { ChevronDownIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateValue } from "reka-ui";

type Props = {
  placeholder?: string;
};

const props = defineProps<Props>();

const date = defineModel<DateValue | null>({
  default: null,
  required: true,
});
</script>

<template>
  <div>
    <Popover>
      <PopoverTrigger as-child>
        <Button id="date" variant="outline">
          <div class="flex gap-2 items-center">
            {{ date || props.placeholder || "Выберите дату" }}
            <ChevronDownIcon />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto overflow-hidden p-0" align="start">
        <Calendar
          v-model="date"
          layout="month-and-year"
          @update:model-value="
            (value) => {
              if (value) {
                date = value;
              }
            }
          "
        />
      </PopoverContent>
    </Popover>
  </div>
</template>
