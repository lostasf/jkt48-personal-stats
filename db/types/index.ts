export interface Category {
    id: string,
    name: string,
}

type MemberURL = '/member/detail/id/[id]?lang=[lang]'

export interface Member {
    id: string,
    name: string,
    url: MemberURL,
}

type ScheduleURL = '/theater/schedule/id/[id]?lang=[lang]' | '/event/schedule/id/[id]?lang=[lang]'

export interface Schedule {
    id: string,
    name: string,
    date: Date,
    url: ScheduleURL,
    stsMemberId: string | null
}

export type TicketOperation = 'Detil' | 'Kalah';
export type TicketType = 'OFC' | 'GEN';

export interface TicketHistory {
    id: string,
    operation: TicketOperation,
    ticketType: TicketType,
    url?: string,
    scheduleId: string,
    seatNumber?: string
}