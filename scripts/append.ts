// import ticketHistoryData from './ticketHistory.json'

// {
//     "operation": "Detil",
//     "purchaseDate": "27 Mei 2025",
//     "name": "Pajama Drive",
//     "showDate": "29 Mei 2025",
//     "showTime": "MALAM",
//     "ticketType": "OFC",
//     "detailUrl": "https://jkt48.com/ticket/detail/id/2063800?lang=id"
// }
// name, showDate, showTime can be binded to schedules table then put in ticketHistory table
// operation, ticketType, detailUrl can be binded to ticketHistory table

// interface TicketPurchase {
//     operation: string;
//     purchaseDate: string;
//     name: string;
//     showDate: string;
//     showTime: string;
//     ticketType: string;
//     detailUrl?: string;
// }

// let countDetil = 0
// let countKalah = 0
// const countData = () => {
//     ticketHistoryData.forEach((purchase: TicketPurchase) => {
//         if (purchase.operation === 'Detil') {
//             countDetil++;
//         } else if (purchase.operation === 'Kalah') {
//             countKalah++;
//         }
//     })
//     console.log(`Total 'Detil' operations: ${countDetil}`);
//     console.log(`Total 'Kalah' operations: ${countKalah}`);
//     console.log(`Total' operations: ${countDetil + countKalah}`);
// }

// countData()