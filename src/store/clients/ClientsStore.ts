import { defineStore } from "pinia"
import { ref } from "vue"
import { useFaker } from "@/composables/useFaker"

import { Client } from "@/types/clients/Clients"

const { fakerMain, createId } = useFaker()

export const useClientsStore = defineStore('clients', () => {
    const clients = ref<Client[]>([])

    function generateClients(count = 100) {
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
                phone: '+7 ' + fakerMain.phone.number(),
                address: fakerMain.location.streetAddress(),
            })
        }
        
        clients.value = []
        clients.value = [...clientsList]
    }

    async function createClient(newClient: Client) {
        const item: Client = { 
            ...newClient,
            id: createId(clients.value.map(c => c.id))
        }
        clients.value.push(item)
        return item
    }

    async function updateClient(client: Client) {
        clients.value.forEach((item, index) => {
            if(item.id === client.id)
                clients.value[index] = {...client}
        })
        return client
    }

    async function deleteClient(id: number) {
        clients.value = clients.value.filter(c => c.id !== id)
    }

    async function getClientById(id: number) {
        const client = clients.value.find(c => c.id === id)
        if (!client)
            throw new Error(`Клиент с id ${id} не найден`)

        return client
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