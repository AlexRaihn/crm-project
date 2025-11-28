import {z} from 'zod'

function nameSchema() {
    return z.string({ required_error: "Поле обязательно к заполнению" }).min(2, "Поле должно состоять минимум из двух символов");
}

function phoneSchema() {
    return z.string({required_error: "Поле обязательно к заполнению"}).min(17, 'Номер телефона должен состоять из 11 символов')
}

function emailSchema() {
    return z.string({required_error: "Поле обязательно к заполнению"}).email('Почта заполнена не корректно')
}

function dateScheme() {
    return z.string({required_error: "Поле обязательно к заполнению"}).date('Дата заполнена не корректно')
}

export {
    nameSchema,
    phoneSchema,
    emailSchema,
    dateScheme
}