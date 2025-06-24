import { IndonesianHumanReadableDate } from './date'

export type TicketOperation = 'Detil' | 'Kalah'
export type TicketType = 'OFC' | 'GEN'

export interface TicketPurchase {
    operation: TicketOperation
    purchaseDate: IndonesianHumanReadableDate
    name: string
    showDate: IndonesianHumanReadableDate
    showTime: string
    ticketType: TicketType
    url?: string
}

export interface MyPageData {
    ticketHistory: TicketPurchase[]
    currentPage: string
    totalPages: string
    nextPageUrl: string | null
}
