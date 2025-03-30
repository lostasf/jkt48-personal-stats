import seatsController from '@/utils/seatsController'
import { SeatingPlan } from '@/types/types'

const { countSeats, totalSeats } = seatsController

const seatingPlan = [ 
  { row: 'A', totalSeats: '21', left: '4', middle: '10', right: '16'}, 
  { row: 'B', totalSeats: '23', left: '5', middle: '11', right: '17'}, 
  { row: 'C', totalSeats: '25', left: '6', middle: '12', right: '18'}, 
  { row: 'D', totalSeats: '26', left: '7', middle: '13', right: '19'}, 
  { row: 'E', totalSeats: '26', left: '7', middle: '13', right: '19'}, 
  { row: 'F', totalSeats: '26', left: '7', middle: '13', right: '19'}, 
  { row: 'G', totalSeats: '27', left: '8', middle: '14', right: '20'}, 
  { row: 'H', totalSeats: '27', left: '8', middle: '14', right: '20'}, 
  { row: 'I', totalSeats: '26', left: '8', middle: '14', right: '20'}, 
  { row: 'J', totalSeats: '23', left: '7', middle: '13', right: '19'},
]

const seats = countSeats()

const renderSeatsLeft = (plan: SeatingPlan) => {
  return <div key={plan.row} className="flex flex-col items-end">
            <div className="flex flex-row gap-2">
              {[...Array(parseInt(plan.left))].map((_, index) => (
                <div key={index} className={"flex flex-col items-center justify-center w-12 h-12 border-[1px] border-grey rounded-sm"
                  + (seats[`${plan.row}-${index + 1}`] ? ' bg-green-700 text-white' : '')
                }>
                  <div className="text-md">{plan.row}-{index + 1}</div>
                  <div className="text-xs">{seats[`${plan.row}-${index + 1}`] || ''}</div>
                </div>
              ))}
            </div>
          </div>
}

const renderSeatsMiddleLeft = (plan: SeatingPlan) => {
  return <div key={plan.row} className="flex flex-col items-end">
            <div className="flex flex-row gap-2">
              {[...Array(parseInt(plan.middle) - parseInt(plan.left))].map((_, index) => (
                <div key={index} className={"flex flex-col items-center justify-center w-12 h-12 border-[1px] border-grey rounded-sm"
                  + (seats[`${plan.row}-${index + parseInt(plan.left) + 1}`] ? ' bg-green-700 text-white' : '')
                }>
                  <div className="text-md">{plan.row}-{index + parseInt(plan.left) + 1}</div>
                  <div className="text-xs">{seats[`${plan.row}-${index + parseInt(plan.left) + 1}`] || ''}</div>
                </div>
              ))}
            </div>
          </div>
}

const renderSeatsMiddleRight = (plan: SeatingPlan) => {
  return <div key={plan.row} className="flex flex-col items-center">
            <div className="flex flex-row gap-2">
              {[...Array(parseInt(plan.right) - parseInt(plan.middle))].map((_, index) => (
                <div key={index} className={"flex flex-col items-center justify-center w-12 h-12 border-[1px] border-grey rounded-sm"
                  + (seats[`${plan.row}-${index + parseInt(plan.middle) + 1}`] ? ' bg-green-700 text-white' : '')
                }>
                  <div className="text-md">{plan.row}-{index + parseInt(plan.middle) + 1}</div>
                  <div className="text-xs">{seats[`${plan.row}-${index + parseInt(plan.middle) + 1}`] || ''}</div>
                </div>
              ))}
            </div>
          </div>
}

const renderSeatsRight = (plan: SeatingPlan) => {
  return <div key={plan.row} className="flex flex-col items-start">
            <div className="flex flex-row gap-2">
              {[...Array(parseInt(plan.totalSeats) - parseInt(plan.right))].map((_, index) => (
                <div key={index} className={"flex flex-col items-center justify-center w-12 h-12 border-[1px] border-grey rounded-sm"
                  + (seats[`${plan.row}-${index + parseInt(plan.right) + 1}`] ? ' bg-green-700 text-white' : '')
                }>
                  <div className="text-md">{plan.row}-{index + parseInt(plan.right) + 1}</div>
                  <div className="text-xs">{seats[`${plan.row}-${index + parseInt(plan.right) + 1}`] || ''}</div>
                </div>
              ))}
            </div>
          </div>
}

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center">
        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center sm:text-left">
          🤡 JKT48 Stats
        </div>
        <div className="font-light text-center sm:text-left">
          Last updated: 30-03-2025
        </div>
        <div className="flex flex-row gap-8 my-4">
          <div>
            <div className="flex flex-col gap-2">
              {seatingPlan.map((plan) => (
                renderSeatsLeft(plan)
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-2">
              {seatingPlan.map((plan) => (
                renderSeatsMiddleLeft(plan)
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-2">
              {seatingPlan.map((plan) => (
                renderSeatsMiddleRight(plan)
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-2">
              {seatingPlan.map((plan) => (
                renderSeatsRight(plan)
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="row-start-3 text-center">
        <div className="text-xl mb-4">Verified count = {totalSeats()}</div>
        <div className="text-sm font-light">Currently include Ramune&apos;s setlist</div>
        <div className="text-xs font-light">(Ramune has a different seating plan)</div>
      </footer>
    </div>
  )
}
