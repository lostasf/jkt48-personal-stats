import { IndonesianHumanReadableDate } from '@/types/date'
import { TicketOperation, TicketShowTime, TicketType } from '@/types/index'

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

export interface ScheduleDetail {
    members: string[],
    memberSTS?: string
}
