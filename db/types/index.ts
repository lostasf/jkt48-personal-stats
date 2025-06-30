import { MemberURL, ScheduleURL, TicketOperation, TicketType } from "@/types"

export interface Category {
    id: string,
    name: string,
}

export interface Member {
    id: string,
    name: string,
    url: MemberURL,
}

export interface Schedule {
    id: string,
    name: string,
    date: Date,
    url: ScheduleURL,
    stsMemberId: string | null
}

export interface TicketHistory {
    id: string,
    operation: TicketOperation,
    ticketType: TicketType,
    url?: string,
    scheduleId: string,
    seatNumber?: string
}