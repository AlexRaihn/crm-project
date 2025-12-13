import { defineStore } from "pinia"
import { ref } from "vue"
import { useFaker } from "@/composables/useFaker"

// Adjust the import path to where your Sale interface and status options are located
import { Sale } from "@/types/sales/sales"
import { salesStatusOptions } from "@/enums/sales"

const { fakerMain, createId } = useFaker()

export const useSalesStore = defineStore('sales', () => {
    const sales = ref<Sale[]>([])

    function generateSales(count = 100) {
        const salesList: Sale[] = []
        
        for (let i = 1; i <= count; i++) {
            // Pick a random status from your options
            const randomStatusIndex = fakerMain.number.int({ min: 0, max: salesStatusOptions.length - 1 })
            const statusValue = salesStatusOptions[randomStatusIndex].value

            // Generate logical dates
            const startDate = fakerMain.date.past()
            const endDate = new Date(startDate)
            endDate.setDate(endDate.getDate() + fakerMain.number.int({ min: 1, max: 30 }))

            salesList.push({
                id: i,
                clientId: 0,
                companyId: 0,
                description: fakerMain.commerce.productDescription(),
                salerId: 0,
                price: parseFloat(fakerMain.commerce.price({ min: 100, max: 10000 })),
                dateStart: null,
                dateEnd: null,
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