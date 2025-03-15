import Image from "next/image";

/* Left, Middle, Right
Left
A4-5
B5-6
C6-7
D7-8
E7-8
F7-8
G8-9
H8-9
I8-9
J7-8

Middle
A10-11
B11-12
C12-13
D13-14
E13-14
F13-14
G14-15
H14-15
I14-15
J13-14

Right
A16-17
B17-18
C18-19
D19-20
E19-20
F19-20
G20-21
H20-21
I20-21
J19-20 */

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
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center sm:text-left">
          JKT48 Personal Stats
        </h1>
        <p className="text-sm/6 text-center sm:text-left">
          bukaniannnnnn jkt48 stats
        </p>
        <div className="grid grid-cols-4">
          <div className="col-span-1">
            <h2 className="text-2xl font-bold text-center">Left</h2>
            <div className="flex flex-col gap-2">
              {seatingPlan.map((plan) => (
                <div key={plan.row} className="flex flex-col items-end">
                  <div className="flex flex-row gap-2">
                    {[...Array(parseInt(plan.left))].map((_, index) => (
                      <div key={index} className="w-8 h-8 border-[1px] border-grey text-center">{plan.row}{index + 1}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1">
            <h2 className="text-2xl font-bold text-center">Middle Left</h2>
            <div className="flex flex-col gap-2">
              {seatingPlan.map((plan) => (
                <div key={plan.row} className="flex flex-col items-center">
                  <div className="flex flex-row gap-2">
                    {[...Array(parseInt(plan.middle) - parseInt(plan.left))].map((_, index) => (
                      <div key={index} className="w-8 h-8 border-[1px] border-grey text-center">{plan.row}{index + parseInt(plan.left) + 1}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1">
            <h2 className="text-2xl font-bold text-center">Middle Right</h2>
            <div className="flex flex-col gap-2">
              {seatingPlan.map((plan) => (
                <div key={plan.row} className="flex flex-col items-center">
                  <div className="flex flex-row gap-2">
                    {[...Array(parseInt(plan.right) - parseInt(plan.middle))].map((_, index) => (
                      <div key={index} className="w-8 h-8 border-[1px] border-grey text-center">{plan.row}{index + parseInt(plan.middle) + 1}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1">
            <h2 className="text-2xl font-bold text-center">Right</h2>
            <div className="flex flex-col gap-2">
              {seatingPlan.map((plan) => (
                <div key={plan.row} className="flex flex-col items-start">
                  <div className="flex flex-row gap-2">
                    {[...Array(parseInt(plan.totalSeats) - parseInt(plan.right))].map((_, index) => (
                      <div key={index} className="w-8 h-8 border-[1px] border-grey text-center">{plan.row}{index + parseInt(plan.right) + 1}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
