import { defineStore } from "pinia"
import { ref } from "vue"
import { useFaker } from "@/composables/useFaker"

import { Client } from "@/types/clients/Clients"

const { fakerMain, createId } = useFaker()

export const useClientsStore = defineStore('clients', () => {
    const clients = ref<Client[]>([])

    function generateClients(count = 20) {
        const clientsList: Client[] = []
        for (let i = 1; i <= count; i++) {
            clientsList.push({
                id: i,
                firstName: fakerMain.person.firstName(),
                middleName: fakerMain.person.middleName(),
                lastName: fakerMain.person.lastName(),
                gender: fakerMain.datatype.boolean() ? 1 : 0,
                companyId: 0,
                email: fakerMain.internet.email(),
                phone: fakerMain.phone.number(),
                address: fakerMain.location.streetAddress(),
            })
        }
        
        clients.value = []
        clients.value = [...clientsList]
    }

    async function createClient(newCompany: Client) {
        const item: Client = { 
            ...newCompany,
            id: createId(clients.value.map(c => c.id))
        }
        clients.value.push(item)
    }

    async function updateClient(company: Client) {
        const index = clients.value.findIndex(c => c.id === company.id)
        if (index !== -1) {
            clients.value[index] = company
        }
    }

    async function deleteClient(id: number) {
        clients.value = clients.value.filter(c => c.id !== id)
    }

    async function getClientById(id: number) {
        const company = clients.value.find(c => c.id === id)
        if (!company) {
            throw new Error(`Компания с id ${id} не найдена`)
        }
        return company
    }

    async function getClients() {
        return [...clients.value]
    }

    return {
        clients,
        getClients,
        generateClients,
        createClient,
        updateClient,
        deleteClient,
        getClientById,
    }
})