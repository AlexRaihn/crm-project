<script setup lang="ts">
import { onMounted, ref } from "vue";

import CompanyForm from "../CompanyForm.vue";

import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { useCompaniesStore } from "@/store/clients/CompaniesStore";

import { Company, emptyCompany } from "@/types/clients/Companies";

import { DialogPlugin } from "@/composables/useDialog";
import { toast } from "vue-sonner";

type Props = {
    id: Company["id"];
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

const { getCompanyById, updateCompany, createCompany } = useCompaniesStore();

const form = ref<Company>({ ...emptyCompany });
const isLoading = ref<boolean>(false);

async function getCompany() {
    if (!props.id || props.id === 0) return;

    isLoading.value = true;
    try {
        const res = await getCompanyById(props.id);
        form.value = {
            ...res,
        };
    } catch (error) {
        console.error("Error fetching company:", error);
    } finally {
        isLoading.value = false;
    }
}

async function saveCompany() {
    try {
        if (props.id !== 0) {
            await updateCompany(form.value);
            toast.success("Компания успешно обновлена!");
        } else {
            await createCompany(form.value);
            toast.success("Компания успешно создана!");
        }

        emit("save");
        onDialogHide();
    } catch (error) {
        console.error("Error saving company:", error);
        toast.error("Ошибка при создании компании!");
    }
}

function closeModal() {
    emit("cancel");
    onDialogHide();
}

onMounted(async () => {
    await getCompany();
});
</script>

<template>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
                {{ form.id !== 0 ? "Редактировать организацию" : "Новая организация" }}
            </DialogTitle>
        </DialogHeader>
        <CompanyForm v-model:company="form" @cancel="closeModal" @save="saveCompany" />
    </DialogContent>
</template>