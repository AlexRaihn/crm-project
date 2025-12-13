import { DateValue } from "reka-ui";

export function formatToLocaleDate(date: DateValue | null): string {
    // 'ru-RU' задает русскую локаль, которая обычно использует точки как разделитель
    if(!date)
        return '';

    const options = {
        day: date.day.toString().padStart(2, '0') || '',
        month: (date.month + 1).toString().padStart(2, '0') || '',
        year: date.year.toString() || ''
    }
    
    if(!options.day || !options.month || !options.year) {
        return '';
    }
    return `${options.day}.${options.month}.${options.year}`;
}