import { defineStore } from "pinia"
import { ref } from "vue"
import { useFaker } from "@/composables/useFaker"

import { Company } from "@/types/clients/Companies"

const { fakerMain, createId } = useFaker()

export const useCompaniesStore = defineStore('companies', () => {
    const companies = ref<Company[]>([])

    function generateCompanies(count = 20) {
        const companiesList: Company[] = []

        for (let i = 1; i <= count; i++) {
            const company: Company = {
                id: i,
                name: fakerMain.company.name(),
                inn: fakerMain.commerce.isbn(10),
                industry: '',
                websiteUrl: '',
            }
            companiesList.push(company)
        }
        
        companies.value = []
        companies.value = [...companiesList]
    }

    async function createCompany(newCompany: Company) {
        const item: Company = { 
            ...newCompany,
            id: createId(companies.value.map(c => c.id))
        }
        companies.value.push(item)
    }

    async function updateCompany(company: Company) {
        const index = companies.value.findIndex(c => c.id === company.id)
        if (index !== -1) {
            companies.value[index] = company
        }
    }

    async function deleteCompany(id: number) {
        companies.value = companies.value.filter(c => c.id !== id)
    }

    async function getCompanyById(id: number) {
        const company = companies.value.find(c => c.id === id)
        if (!company) {
            throw new Error(`Компания с id ${id} не найдена`)
        }
        return company
    }

    async function getCompanies() {
        return [...companies.value]
    }

    return {
        companies,
        getCompanies,
        generateCompanies,
        createCompany,
        updateCompany,
        deleteCompany,
        getCompanyById,
    }
})