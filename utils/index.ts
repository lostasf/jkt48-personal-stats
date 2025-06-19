/*
* Converts a date string in the format "DD Month YYYY" (e.g., "1 Januari 2023")
* to date string (e.g., "2023-01-01").
*
* @param {string} date - The date string in the format "DD Month YYYY".
* @returns {string} The date string.
*/
export const indonesiaDateToISOString = (date: string): string => {
    const [day, month, year] = date.split(' ');
    const monthMap: { [key: string]: string } = {
        'Januari': '01',
        'Februari': '02',
        'Maret': '03',
        'April': '04',
        'Mei': '05',
        'Juni': '06',
        'Juli': '07',
        'Agustus': '08',
        'September': '09',
        'Oktober': '10',
        'November': '11',
        'Desember': '12'
    };
    const formattedDate = `${year}-${monthMap[month]}-${day}`;
    return `${formattedDate}`
}

/**
 * Converts a UTC date to GMT+7 timezone.
 * @param {Date} 2024-01-05T12:00:00.000Z - The UTC date string to convert.
 * * @returns {string} The converted date string in GMT+7 timezone.
 * @example convertUTCToGMT7('2024-01-05T12:00:00.000Z') // '2024-01-05T19:00:00.000+07:00'
 */

export const convertUTCToGMT7 = (date: Date): string => { 
    const utcDate = new Date(date.getTime() + (7 * 3600 * 1000)); // Add 7 hours to convert to GMT+7
    return utcDate.toISOString().replace('Z', '+07:00'); // Replace 'Z' with '+07:00' to indicate GMT+7 timezone
}

/**
 * Converts a date string in the format "YYYY-MM-DD" to a UTC date string.
 * @param date - The date string in the format "YYYY-MM-DD" (e.g., "2023-01-01").
 * @returns { startOfDay: Date, startOfNextDay: Date } - An object containing the start of the day and the start of the next day in UTC.
 */
export const getStartAndEndOfDayFromDate = (date: string): { startOfDay: Date, startOfNextDay: Date } => {
    const targetDate = indonesiaDateToISOString(date)
    const startOfDay = new Date(`${targetDate}T00:00:00.000Z`)
    const nextDay = new Date(targetDate)
    nextDay.setDate(nextDay.getDate() + 1)
    const startOfNextDay = new Date(
        `${nextDay.toISOString().split('T')[0]}T00:00:00.000Z`
    )
    return { startOfDay, startOfNextDay }
}