# Badut 🤡 JKT48 Personal Stats
Made using Typescript and Drizzle ORM. With the intention to present show winrate based on days, ticket type, setlist, categories, etc.

# TO-DO
## Seating Plan Setup
- [x] Setup standard seat planning for shows
- [ ] Setup Cara Meminum Ramune seat planning -> haven't been able to get the full seat plan yet

## Early Scraping
- [x] Scraped JKT48 shows from 2024 - 2025
- [x] Scraped personal ticket and event history

## Data Setup
- [ ] Finish appending ticketHistory to shows
- [ ] Refactor seatsController into db queries -> need to finish appending personal ticket history into existing shows

## Main Feature
- [ ] GetShowsWinrate
- [ ] GetShowsFilteredByDay
- [ ] GetShowsFilteredBySetlist
- [ ] GetShowsFilteredByTicketType
- [ ] GetShowsFilteredByCategories

# In the future
## Scraping
- [ ] Finish script for auth in JKT48
- [ ] Use cron job for future scraping
- [ ] Create proper interfaces for scraped data

## Additional Feature
- [ ] Show 2S Rulet Gallery
- [ ] Search table for every show that I've attended

## Disclaimer
This project is intended for educational purposes only. The code provided herein demonstrates web scraping techniques for learning and understanding how websites are structured and data can be extracted.
