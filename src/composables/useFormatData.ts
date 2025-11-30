export function formatToLocaleDate(date: Date): string {
    // 'ru-RU' задает русскую локаль, которая обычно использует точки как разделитель
    if(!date)
        return '';

    const options = {
        day: date.getDate().toString().padStart(2, '0') || '',
        month: (date.getMonth() + 1).toString().padStart(2, '0') || '',
        year: date.getFullYear().toString() || ''
    }
    
    if(!options.day || !options.month || !options.year) {
        return '';
    }
    return `${options.day}.${options.month}.${options.year}`;
}