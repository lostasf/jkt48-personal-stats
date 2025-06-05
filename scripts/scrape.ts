import axios from 'axios';
import * as cheerio from 'cheerio';

interface TicketPurchase {
    operation: string;
    purchaseDate: string;
    name: string;
    showDate: string;
    showTime: string;
    ticketType: string;
    detailUrl?: string;
}

interface MyPageData {
    ticketHistory: TicketPurchase[];
    currentPage: string;
    totalPages: string;
    nextPageUrl: string | null;
}

async function getAndExtractMyPageData(url: string): Promise<MyPageData | null> {
    try {
        console.log(`Attempting to fetch data from: ${url}`);
        const response = await axios.get(url, {
            headers: {
                'Cookie': process.env.JKT48_COOKIES
            }
        });
        const html: string = response.data;

        const $ = cheerio.load(html);

        // Check if we were redirected to a login page or if the expected content is missing
        // This is a common way to detect if the page requires authentication
        if ($('form#loginForm').length > 0 || $('title').text().includes('Login') || $('.entry-mypage__history').length === 0) {
            console.warn('Access denied or redirected to login page. Data extraction aborted.');
            console.warn('The URL likely requires user authentication (cookies/session).');
            return null;
        }

        const ticketHistory: TicketPurchase[] = [];
        $('.entry-mypage__history tbody tr').each((_i, row) => {
            const columns = $(row).find('td');
            const operationCell = $(columns[0]);
            const detailLink = operationCell.find('a').attr('href');
            const operation = detailLink ? 'Detil' : operationCell.text().trim();

            ticketHistory.push({
                operation: operation,
                purchaseDate: $(columns[1]).text().trim(),
                name: $(columns[2]).text().trim(),
                showDate: $(columns[3]).text().trim(),
                showTime: $(columns[4]).text().trim(),
                ticketType: $(columns[5]).text().trim(),
                detailUrl: detailLink ? `https://jkt48.com${detailLink}` : undefined,
            });
        });

        const paginationText = $('.entry-news__list--pagination .page').text().trim();
        let currentPage = 'N/A';
        let totalPages = 'N/A';
        if (paginationText.includes('/')) {
            [currentPage, totalPages] = paginationText.split(' / ').map(s => s.trim());
        }

        const nextPageUrlElement = $('.entry-news__list--pagination .next a');
        const nextPageRelativeUrl = nextPageUrlElement.attr('href');
        const nextPageUrl = nextPageRelativeUrl ? `https://jkt48.com${nextPageRelativeUrl}` : null;

        return {
            ticketHistory,
            currentPage,
            totalPages,
            nextPageUrl,
        };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching data:', error.message);
            if (error.response) {
                console.error('Response status:', error.response.status);
                console.error('Response data:', error.response.data);
            }
            return null;
        }
        console.error('An unexpected error occurred:', error);
        return null;
    }
}

// Example usage:

const targetUrl = 'https://jkt48.com/mypage/event-list?page=4&lang=id';

getAndExtractMyPageData(targetUrl).then(data => {
    if (data) {
        console.log('\n--- Extracted Data ---');
        console.log(JSON.stringify(data.ticketHistory, null, 2));
    } else {
        console.log('\nFailed to extract data. See warnings/errors above.');
    }
});