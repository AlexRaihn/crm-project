<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useFaker } from "@/composables/useFaker";

import { LineChart } from "@/components/ui/chart-line";

import { Card, CardTitle } from "@/components/ui/card";

type Sale = {
  idx: number;
  sales: number;
};

const { fakerMain } = useFaker();

const isLoading = ref();
const data = ref<Sale[]>([]);

async function createFakeSales(): Promise<Sale[]> {
  let res: Sale[] = [];

  for (let i = 0; i < 100; i++) {
    res.push({
      idx: i,
      sales: fakerMain.number.int({ min: 1000, max: 10000 }),
    });
  }

  return res;
}

onMounted(async () => {
  isLoading.value = true;
  try {
    data.value = await createFakeSales();
  } catch (error) {
    console.error("Error generating fake sales data:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <Card class="p-4 w-full">
    <CardTitle> Продажи за месяц {{ data[0] }}</CardTitle>
    <LineChart
      v-if="data.length > 0 && !isLoading"
      :data="
        data.map((el) => {
          return {
            ...el,
            Продажи_за_месяц: el.sales,
          };
        })
      "
      index="idx"
      :colors="['green']"
      :categories="['Продажи_за_месяц']"
    />
  </Card>
</template>
