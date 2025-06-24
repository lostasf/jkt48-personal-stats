# Badut 🤡 JKT48 Personal Stats
Made using Typescript and Drizzle ORM with the intention to present show winrate based on days, ticket type, setlist, categories, etc.

> [!NOTE]
> This project is intended for educational purposes only. The code provided herein demonstrates web scraping techniques for learning and understanding how websites are structured and data can be extracted.

## TO-DO
### Seating Plan Setup
- [x] Setup standard seat planning for JKT48 theatre
- [ ] Setup Cara Meminum Ramune seat planning -> haven't been able to get the full seat plan yet

### Early Scraping
- [x] Scraped JKT48 schedules from 2024 - 2025
- [x] Scraped personal ticket and event history

### Data Setup
- [ ] Finish appending ticketHistory to schedules
- [ ] Finish appending eventHistory to schedules
- [ ] Refactor seatsController into db queries

### Main Feature
**Function will be named Shows as an alias from schedules table**
- [ ] getShowsWinrate
- [ ] getShowsFilteredByDay
- [ ] getShowsFilteredBySetlist
- [ ] getShowsFilteredByTicketType
- [ ] getShowsFilteredByCategories

## In the future
### Scraping
- [ ] Finish script for auth in JKT48
- [ ] Use CRON job for future scraping

### Additional Feature
- [ ] Show 2S Rulet Gallery
- [ ] Search table for every shows that I've attended