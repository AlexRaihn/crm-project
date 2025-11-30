type saleStatus = {
    label: string,
    value: number
}

const salesStatusOptions: saleStatus[] = [
    { value: 0, label: 'Создана'},
    { value: 1, label: 'В ожидании' },
    { value: 2, label: 'Нужна информация' },
    { value: 3, label: 'В реализации' },
    { value: 4, label: 'Завершена' },
    { value: 5, label: 'Отменена' },
]

export {salesStatusOptions, type saleStatus}