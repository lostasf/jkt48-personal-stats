# Badut 🤡 JKT48 Personal Stats
Made using Typescript and Drizzle ORM with the intention to present show winrate based on days, ticket type, setlist, categories, etc.

> [!NOTE]
> This project is intended for educational purposes only. The code provided herein demonstrates web scraping techniques for learning and understanding how websites are structured and data can be extracted.

### Seating Plan Setup
| Status | To-Do |
|:---:|--|
|✅|Setup standard seat planning[^1] for JKT48 theatre shows|
|❌|Setup Cara Meminum Ramune[^3] seat planning -> haven't been able to get the full seat plan yet|

### Early JKT48 Website Scraping
| Status | To-Do |
|:---:|--|
|✅|Scraped JKT48 schedules from 2024 - 2025|
|✅|Scraped personal ticket and event history|

### Scraped Data Appending/Cleaning
| Status | To-Do |
|:---:|--|
|✅|Finish appending ticketHistory to schedules|
|❌|Finish appending eventHistory to schedules|
|❌|Refactor seatsController into db queries|

### Main Feature
**NOTE:** _Function will be named Shows as an alias from schedules table_
| Status | To-Do |
|:---:|--|
|❌|getShowsWinrate|
|❌|getShowsFilteredByDay|
|❌|getShowsFilteredBySetlist|
|❌|getShowsFilteredByTicketType|
|❌|getShowsFilteredByCategories|

## Future Plan
| Status | To-Do |
|:---:|--|
|❌|Finish script for auth in JKT48|
|❌|Use CRON job for future scraping|
|❌|Show 2S[^2] Rulet Gallery|
|❌|Search table for every shows that I've attended|


[^1]: JKT48 Theatre shows seating plan mostly don't change, unless there are special circumstances[^4] that needs to alter the seating plan.
[^2]: 2S or 2-Shot is where a customer takes photo with JKT48 Members.
[^3]: One of JKT48 setlist/album (can be viewed here https://jkt48.com/theater?lang=id on the 'Lagu Panggung' sidebar)
[^4]: As far as I know special circumstances refer to certain setlists (Cara Meminum Ramune) and when a show is not sold out.