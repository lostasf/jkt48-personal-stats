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

export interface Schedule {
    id: string,
    date: number,
    name: string,
    href: string,
    stsMember: string | null
}

export interface TicketPurchase {
    operation: string;
    purchaseDate: string;
    name: string;
    showDate: string;
    showTime: string;
    ticketType: string;
    detailUrl?: string;
}

export interface MyPageData {
    ticketHistory: TicketPurchase[];
    currentPage: string;
    totalPages: string;
    nextPageUrl: string | null;
}