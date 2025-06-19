export interface SeatingPlan {
    row: string,
    totalSeats: string,
    left: string,
    middle: string,
    right: string
}

export interface Member {
    name: string,
    href: string,
}

export interface Show {
    id: string,
    date: number,
    name: string,
    href: string,
    stsMember: string | null
}