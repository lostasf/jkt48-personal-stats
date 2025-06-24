import { IndonesianHumanReadableDate } from './date'

export type TicketOperation = 'Detil' | 'Kalah'
export type TicketType = 'OFC' | 'GEN'
export type TicketShowTime = 'SIANG' | 'MALAM'

export interface TicketPurchase {
    operation: TicketOperation,
    purchaseDate: IndonesianHumanReadableDate,
    name: string,
    showDate: IndonesianHumanReadableDate,
    showTime?: TicketShowTime,
    ticketType: TicketType,
    url?: string
}

export interface MyPageData {
    ticketHistory: TicketPurchase[]
    currentPage: string
    totalPages: string
    nextPageUrl: string | null
}
