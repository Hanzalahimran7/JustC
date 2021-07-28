import os
from googleapiclient.discovery import build

youtube=build('youtube','v3',developerKey=os.environ.get("YOUTUBE_API_KEY"))

def getVideos(name):
    req=youtube.search().list(q=name,part='snippet',type='video',maxResults=50).execute()
    links=[]
    for item in req['items']:
        x=item['id']['videoId']
        links.append(x)
    return links
