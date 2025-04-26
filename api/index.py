from fastapi import FastAPI
import requests
from bs4 import BeautifulSoup

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

def getCalendarData():
    response = requests.get("https://jkt48.com/calendar/list/y/2025/m/4/d/1?lang=id")
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        return soup
    else:
        return None

@app.get("/api/hello")
def getCalendarPage():
    soup = getCalendarData()
    return soup.prettify() if soup else {"error": "Failed to retrieve data"}