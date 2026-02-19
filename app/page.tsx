import seatsController from '@/utils/seatsController'
// import { getSchedulesByDate } from "@/db/queries";

type SeatingPlan = {
    row: string,
    totalSeats: string,
    left: string,
    middle: string,
    right: string
}

const { countSeats, totalSeats } = seatsController

const seatingPlan = [
    { row: 'A', totalSeats: '21', left: '4', middle: '10', right: '16' },
    { row: 'B', totalSeats: '23', left: '5', middle: '11', right: '17' },
    { row: 'C', totalSeats: '25', left: '6', middle: '12', right: '18' },
    { row: 'D', totalSeats: '26', left: '7', middle: '13', right: '19' },
    { row: 'E', totalSeats: '26', left: '7', middle: '13', right: '19' },
    { row: 'F', totalSeats: '26', left: '7', middle: '13', right: '19' },
    { row: 'G', totalSeats: '27', left: '8', middle: '14', right: '20' },
    { row: 'H', totalSeats: '27', left: '8', middle: '14', right: '20' },
    { row: 'I', totalSeats: '26', left: '8', middle: '14', right: '20' },
    { row: 'J', totalSeats: '23', left: '7', middle: '13', right: '19' },
]

const seats = countSeats()

const renderSeatsLeft = (plan: SeatingPlan) => {
    return (
        <div key={plan.row} className="flex flex-col items-end">
            <div className="flex flex-row gap-0.5 sm:gap-1 md:gap-2">
                {[...Array(parseInt(plan.left))].map((_, index) => (
                    <div
                        key={index}
                        className={
                            'flex flex-col items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-[1px] border-grey rounded-sm' +
                            (seats[`${plan.row}-${index + 1}`]
                                ? ' bg-green-700 text-white'
                                : '')
                        }
                    >
                        <div className="text-[8px] sm:text-[10px] md:text-xs lg:text-md leading-tight">
                            {plan.row}-{index + 1}
                        </div>
                        <div className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs leading-tight">
                            {seats[`${plan.row}-${index + 1}`] || ''}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const renderSeatsMiddleLeft = (plan: SeatingPlan) => {
    return (
        <div key={plan.row} className="flex flex-col items-end">
            <div className="flex flex-row gap-0.5 sm:gap-1 md:gap-2">
                {[...Array(parseInt(plan.middle) - parseInt(plan.left))].map(
                    (_, index) => (
                        <div
                            key={index}
                            className={
                                'flex flex-col items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-[1px] border-grey rounded-sm' +
                                (seats[
                                    `${plan.row}-${
                                        index + parseInt(plan.left) + 1
                                    }`
                                ]
                                    ? ' bg-green-700 text-white'
                                    : '')
                            }
                        >
                            <div className="text-[8px] sm:text-[10px] md:text-xs lg:text-md leading-tight">
                                {plan.row}-{index + parseInt(plan.left) + 1}
                            </div>
                            <div className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs leading-tight">
                                {seats[
                                    `${plan.row}-${
                                        index + parseInt(plan.left) + 1
                                    }`
                                ] || ''}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

const renderSeatsMiddleRight = (plan: SeatingPlan) => {
    return (
        <div key={plan.row} className="flex flex-col items-center">
            <div className="flex flex-row gap-0.5 sm:gap-1 md:gap-2">
                {[...Array(parseInt(plan.right) - parseInt(plan.middle))].map(
                    (_, index) => (
                        <div
                            key={index}
                            className={
                                'flex flex-col items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-[1px] border-grey rounded-sm' +
                                (seats[
                                    `${plan.row}-${
                                        index + parseInt(plan.middle) + 1
                                    }`
                                ]
                                    ? ' bg-green-700 text-white'
                                    : '')
                            }
                        >
                            <div className="text-[8px] sm:text-[10px] md:text-xs lg:text-md leading-tight">
                                {plan.row}-{index + parseInt(plan.middle) + 1}
                            </div>
                            <div className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs leading-tight">
                                {seats[
                                    `${plan.row}-${
                                        index + parseInt(plan.middle) + 1
                                    }`
                                ] || ''}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

const renderSeatsRight = (plan: SeatingPlan) => {
    return (
        <div key={plan.row} className="flex flex-col items-start">
            <div className="flex flex-row gap-0.5 sm:gap-1 md:gap-2">
                {[
                    ...Array(parseInt(plan.totalSeats) - parseInt(plan.right)),
                ].map((_, index) => (
                    <div
                        key={index}
                        className={
                            'flex flex-col items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-[1px] border-grey rounded-sm' +
                            (seats[
                                `${plan.row}-${
                                    index + parseInt(plan.right) + 1
                                }`
                            ]
                                ? ' bg-green-700 text-white'
                                : '')
                        }
                    >
                        <div className="text-[8px] sm:text-[10px] md:text-xs lg:text-md leading-tight">
                            {plan.row}-{index + parseInt(plan.right) + 1}
                        </div>
                        <div className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs leading-tight">
                            {seats[
                                `${plan.row}-${
                                    index + parseInt(plan.right) + 1
                                }`
                            ] || ''}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// getSchedulesByDate('23 Mei 2025')

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-between min-h-screen p-4 sm:p-8 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col items-center w-full flex-shrink-0">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center sm:text-left">
                    🤡 JKT48 Stats
                </div>
                <div className="font-light text-center sm:text-left text-sm sm:text-base">
                    Last updated: 27-12-2025
                </div>
                <div className="w-full overflow-x-auto px-4 sm:px-8">
                    <div className="flex flex-row gap-2 sm:gap-4 md:gap-6 lg:gap-8 my-2 sm:my-4 min-w-max justify-center">
                        <div>
                            <div className="flex flex-col gap-0.5 sm:gap-1 md:gap-2">
                                {seatingPlan.map((plan) => renderSeatsLeft(plan))}
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col gap-0.5 sm:gap-1 md:gap-2">
                                {seatingPlan.map((plan) =>
                                    renderSeatsMiddleLeft(plan)
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col gap-0.5 sm:gap-1 md:gap-2">
                                {seatingPlan.map((plan) =>
                                    renderSeatsMiddleRight(plan)
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col gap-0.5 sm:gap-1 md:gap-2">
                                {seatingPlan.map((plan) => renderSeatsRight(plan))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="text-center px-4 py-4">
                <div className="text-lg sm:text-xl mb-2">
                    Verified count = {totalSeats()}
                </div>
                <div className="text-xs sm:text-sm font-light">
                    Currently include Ramune&apos;s setlist
                </div>
                <div className="text-[10px] sm:text-xs font-light">
                    (Ramune has a different seating plan)
                </div>
            </footer>
        </div>
    )
}
