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