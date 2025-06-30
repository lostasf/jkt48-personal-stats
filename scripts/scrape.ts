// import axios from 'axios'
// import * as cheerio from 'cheerio'
// import { TheatreScheduleURL, JKT48WEBSITE } from '@/types'
// import { MyPageData, TicketPurchase, ScheduleDetail } from '@/types/scrape'
// import { IndonesianHumanReadableDate } from '@/types/date'

// /**
//  * 
//  * @param url 'https://jkt48.com/mypage/event-list
//  * @returns 
//  */
// export const getAndExtractMyPageData = async (
//     url: string
// ): Promise<MyPageData | null> => {
//     try {
//         console.log(`Attempting to fetch data from: ${url}`)
//         const response = await axios.get(url, {
//             headers: {
//                 Cookie: process.env.JKT48_COOKIES,
//             },
//         })
//         const html: string = response.data

//         const $ = cheerio.load(html)

//         // Check if we were redirected to a login page or if the expected content is missing
//         // This is a common way to detect if the page requires authentication
//         if (
//             $('form#loginForm').length > 0 ||
//             $('title').text().includes('Login') ||
//             $('.entry-mypage__history').length === 0
//         ) {
//             console.warn(
//                 'Access denied or redirected to login page. Data extraction aborted.'
//             )
//             console.warn(
//                 'The URL likely requires user authentication (cookies/session).'
//             )
//             return null
//         }

//         const ticketHistory: TicketPurchase[] = []
//         $('.entry-mypage__history tbody tr').each((_i, row) => {
//             const columns = $(row).find('td')
//             const operationCell = $(columns[0])
//             const detailLink = operationCell.find('a').attr('href')
//             const operation = detailLink ? 'Detil' : operationCell.text().trim()

//             ticketHistory.push({
//                 operation: operation as TicketPurchase['operation'],
//                 purchaseDate: $(columns[1])
//                     .text()
//                     .trim() as IndonesianHumanReadableDate,
//                 name: $(columns[2]).text().trim(),
//                 showDate: $(columns[3])
//                     .text()
//                     .trim() as IndonesianHumanReadableDate,
//                 showTime: $(columns[4]).text().trim() as TicketPurchase['showTime'],
//                 ticketType: $(columns[5]).text().trim() as TicketPurchase['ticketType'],
//                 url: detailLink ? `https://jkt48.com${detailLink}` : undefined,
//             })
//         })

//         const paginationText = $('.entry-news__list--pagination .page')
//             .text()
//             .trim()
//         let currentPage = 'N/A'
//         let totalPages = 'N/A'
//         if (paginationText.includes('/')) {
//             ;[currentPage, totalPages] = paginationText
//                 .split(' / ')
//                 .map((s) => s.trim())
//         }

//         const nextPageUrlElement = $('.entry-news__list--pagination .next a')
//         const nextPageRelativeUrl = nextPageUrlElement.attr('href')
//         const nextPageUrl = nextPageRelativeUrl
//             ? `https://jkt48.com${nextPageRelativeUrl}`
//             : null

//         return {
//             ticketHistory,
//             currentPage,
//             totalPages,
//             nextPageUrl,
//         }
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error('Error fetching data:', error.message)
//             if (error.response) {
//                 console.error('Response status:', error.response.status)
//                 console.error('Response data:', error.response.data)
//             }
//             return null
//         }
//         console.error('An unexpected error occurred:', error)
//         return null
//     }
// }

// export const getAndExtractScheduleByScheduleId = async (
//     url: TheatreScheduleURL
// ): Promise<ScheduleDetail | null> => {
//     try {
//         console.log(`Attempting to fetch data from: ${url}`)
//         const response = await axios.get(`${JKT48WEBSITE.URL}${url}`)
//         const html: string = response.data

//         const $ = cheerio.load(html)
//         // Hardcoded the xpath to member list
//         const members: string[] = [...$('.entry-mypage__history:nth-child(5) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(3)')]
//             .flatMap(e => $(e).text().trim().split(',\n'))
//             .map(e => e.trim())
//         const memberSTS: string = ''
//         const scheduleDetails: ScheduleDetail = {
//             members,
//             ...(memberSTS && { memberSTS })
//         }

//         return scheduleDetails
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error('Error fetching data:', error.message)
//             if (error.response) {
//                 console.error('Response status:', error.response.status)
//                 console.error('Response data:', error.response.data)
//             }
//             return null
//         }
//         console.error('An unexpected error occurred:', error)
//         return null
//     }
// }