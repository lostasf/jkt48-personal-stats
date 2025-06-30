type ID = string | number
type Language = 'id'

export enum JKT48WEBSITE {
    URL ='https://jkt48.com' 
}

export type TicketOperation = 'Detil' | 'Kalah'
export type TicketType = 'OFC' | 'GEN'
export type TicketShowTime = 'SIANG' | 'MALAM'

export type TheatreScheduleURL = `/theater/schedule/id/${ID}?lang=${Language}`
export type EventScheduleURL = `/event/schedule/id/${ID}?lang=${Language}`
export type ScheduleURL = TheatreScheduleURL | EventScheduleURL
export type MemberURL = '/member/detail/id/[id]?lang=[lang]'