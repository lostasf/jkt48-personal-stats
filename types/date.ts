type Day =
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19'
    | '20'
    | '21'
    | '22'
    | '23'
    | '24'
    | '25'
    | '26'
    | '27'
    | '28'
    | '29'
    | '30'
    | '31'

export type DayWithLeadingZero =
    | '01'
    | '02'
    | '03'
    | '04'
    | '05'
    | '06'
    | '07'
    | '08'
    | '09'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19'
    | '20'
    | '21'
    | '22'
    | '23'
    | '24'
    | '25'
    | '26'
    | '27'
    | '28'
    | '29'
    | '30'
    | '31'

type MonthWithLeadingZero =
    | '01'
    | '02'
    | '03'
    | '04'
    | '05'
    | '06'
    | '07'
    | '08'
    | '09'
    | '10'
    | '11'
    | '12'

type IndonesianMonth =
    | 'Januari'
    | 'Februari'
    | 'Maret'
    | 'April'
    | 'Mei'
    | 'Juni'
    | 'Juli'
    | 'Agustus'
    | 'September'
    | 'Oktober'
    | 'November'
    | 'Desember'

type Year = `${string}`

/**
 * Represents a human-readable date in Indonesian format.
 * For example: "1 Januari 2023"
 */
export type IndonesianHumanReadableDate = `${Day} ${IndonesianMonth} ${Year}`

/**
 * Represents a date in ISO 8601 format (YYYY-MM-DD).
 * For example: "2023-01-01"
 */
export type ISOStringDate = `${Year}-${MonthWithLeadingZero}-${DayWithLeadingZero}`
