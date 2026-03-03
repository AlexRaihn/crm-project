import { defineStore } from "pinia"
import { ref } from "vue"
import { useFaker } from "@/composables/useFaker"

import { fromDate, getLocalTimeZone } from '@internationalized/date'

import { useClientsStore } from "../clients/ClientsStore"

// Adjust the import path to where your Sale interface and status options are located
import { Sale } from "@/types/sales/sales"
import { salesStatusOptions } from "@/enums/sales"

const { fakerMain, createId } = useFaker()

export const useSalesStore = defineStore('sales', () => {
    const clientsStore = useClientsStore()

    const sales = ref<Sale[]>([])

    async function generateSales(salersIds: number[], companyIds: number[], clientIds: number[], count = 100) {
        const salesList: Sale[] = []
        for (let i = 1; i <= count; i++) {
            // Pick a random status from your options
            const randomStatusIndex = fakerMain.number.int({ min: 0, max: salesStatusOptions.length - 1 })
            const statusValue = salesStatusOptions[randomStatusIndex].value

            const salerId = salersIds[fakerMain.number.int({min: 0, max: salersIds.length - 1})]
            const clientId = clientIds[fakerMain.number.int({min: 0, max: clientIds.length - 1})]
            let companyId: number = 0
            try {
                const res = await clientsStore.getClientById(clientId)
                if(res.companyId)
                    companyId = res.companyId
            } catch {

            }
            // Generate logical dates
            const ONE_DAY = 24 * 60 * 60 * 1000

            const defaultDate: Date = fakerMain.date.past()

            const dateStart = fromDate(defaultDate, getLocalTimeZone())
            const dateEnd = fromDate(new Date(defaultDate.getTime() + ONE_DAY), getLocalTimeZone())

            // dateStart: fromDate(new Date(), getLocalTimeZone()),
            // dateEnd: fromDate(new Date(Date.now() + 24 * 60 * 60 * 1000), getLocalTimeZone()),

            salesList.push({
                id: i,
                clientId,
                companyId,
                description: 'Описание',
                salerId,
                price: parseFloat(fakerMain.commerce.price({ min: 100, max: 10000 })),
                dateStart,
                dateEnd,
                status: statusValue
            })
        }
        
        sales.value = []
        sales.value = [...salesList]
    }

    async function createSale(newSale: Sale) {
        const item: Sale = { 
            ...newSale,
            id: createId(sales.value.map(s => s.id))
        }
        sales.value.push(item)
        return item
    }

    async function updateSale(sale: Sale) {
        sales.value.forEach((item, index) => {
            if(item.id === sale.id)
                sales.value[index] = {...sale}
        })
        return sale
    }

    async function deleteSale(id: number) {
        sales.value = sales.value.filter(s => s.id !== id)
    }

    async function getSaleById(id: number) {
        const sale = sales.value.find(s => s.id === id)
        if (!sale)
            throw new Error(`Продажа с id ${id} не найдена`)

        return sale
    }

    async function getSales() {
        return [...sales.value]
    }

    return {
        sales,
        getSales,
        generateSales,
        createSale,
        updateSale,
        deleteSale,
        getSaleById,
    }
})