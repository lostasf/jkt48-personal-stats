import requests
import uuid
import datetime
import time
from fastapi import FastAPI
from bs4 import BeautifulSoup

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs")

def dateToTimestamp(date): # date = "01/02/2024 12:00:00"
    # Convert the date string to a datetime object
    dt = datetime.datetime.strptime(date, "%d/%m/%Y %H:%M:%S")
    # Return the timestamp
    return int(dt.timestamp())

def getCalendarData():
    #
    year = '2025' # Change this to the desired year
    data_list = []
    for i in range(1, 6):
        month = str(i)
        response = requests.get("https://jkt48.com/calendar/list/y/{}/m/{}/d/1?lang=id".format(year, month))
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            rows = soup.find_all('tr')
            for row in rows:
                date_tag = row.find('td')
                if date_tag:
                    day = date_tag.h3.get_text(separator='\n')
                    dayFormatted = day.split('\n')[0]
                    shows = row.find_all('div', class_='contents')
                    for show in shows:
                        showName = show.find('a').text.strip()
                        if showName[0].isdigit(): # If showName starts with number, it is a show
                            name = showName[6:] # Remove the first 6 characters to get show name
                            showTime = showName[:5] # Extract the time
                            href = show.find('a')['href']
                            
                            data_list.append({
                                'id' : str(uuid.uuid4()),
                                'date': dateToTimestamp(f"{dayFormatted}/{month}/{year} {showTime}:00"),
                                'name': name,
                                'href': href,
                                'stsMember': None,
                            })
            time.sleep(1) # To avoid hitting the server too hard
        else:
            return None
    return data_list

@app.get("/api/hello")
def getCalendarPage():
    data = getCalendarData()
    return data

# @app.get("/api/members")
def getAllMembers():
    response = requests.get("https://jkt48.com/member/list?lang=id")
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        members = []
        # <p class="entry-member__name"><a href="/member/detail/id/262?lang=id">Anindya<br>Ramadhani</a></p>
        member_tags = soup.find_all('p', class_='entry-member__name')
        for member_tag in member_tags:
            name = member_tag.get_text(separator=' ').strip()
            href = member_tag.find('a')['href']
            members.append({
                'id': str(uuid.uuid4()),
                'name': name,
                'href': href
            })
        return members
    else:
        return None