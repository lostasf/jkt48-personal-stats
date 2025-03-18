import seatsController from '../controller/seatsController.js';

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

const renderSeatsLeft = (plan) => {
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

const renderSeatsMiddleLeft = (plan) => {
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

const renderSeatsMiddleRight = (plan) => {
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

const renderSeatsRight = (plan) => {
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
      {/* <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.js
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main> */}
      <main className="flex flex-col row-start-2 items-center">
        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center sm:text-left">
          🤡 JKT48 Stats
        </div>
        <div className="font-light text-center sm:text-left">
          Last updated: 18-03-2025
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
  );
}
