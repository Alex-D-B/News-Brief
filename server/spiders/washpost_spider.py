from parsel import Selector
from datetime import date
import time
from stories import nytData

import requests

class WashPostSpider:
    name = 'washpost'
    start_urls = [
        'http://localhost:8000/washpost.html',
        'http://localhost:8000/washpost2.html'
    ]

    dateStr = str(date.today())
    linkDateStr = '/' + dateStr.replace('-', '/')
    # linkLen = len(linkDateStr)
    # linkBase = 'https://www.nytimes.com'
    source = 'Washington Post'
    # totalSegments = len(additional_categories) + 1

    # seenStories = dict()
    # curCategory = 'world'

    def parse(self, response):
        for story in response.css('div.story-headline'):
            yield {
                'title': story.css('a h3::text').get(),
                'description': story.css('p::text').get(),
                'author': story.css('span a::text').get(),
                'categories': None, # {self.curCategory},
                'date': self.dateStr,
                'link': story.xpath('./a/@href').get(),
                'source': self.source
            }

def scrape():
    # with open('washpost.txt', 'w') as file:
    #     file.write(requests.get('https://www.washingtonpost.com/politics/?itid=hp_top_nav_politics').text)

        # https://www.washingtonpost.com/opinions/?itid=hp_top_nav_opinions
    with open('res.txt', 'w') as writer:
        with open('./data/washpost.html', 'r') as file:
            response = Selector(text=file.read())
            spider = WashPostSpider()
            for story in spider.parse(response):
                writer.write(str(story) + '\n')
        with open('./data/washpost2.html', 'r') as file:
            response = Selector(text=file.read())
            spider = WashPostSpider()
            for story in spider.parse(response):
                writer.write(str(story) + '\n')

    urls_and_categories = [
        ('https://www.washingtonpost.com/world/?itid=hp_top_nav_world', 'world'),
        ('https://www.washingtonpost.com/politics/?itid=hp_top_nav_politics', 'politics'),
        ('https://www.washingtonpost.com/business/technology/?itid=hp_top_nav_tech', 'business'),
        ('https://www.washingtonpost.com/climate-environment/business-of-climate/', 'business-science'),
        ([
            'https://www.washingtonpost.com/opinions/the-posts-view/',
            'https://www.washingtonpost.com/opinions/guest-opinions/'
        ], 'opinion'),
        ('https://www.washingtonpost.com/national/investigations/?itid=hp_top_nav_investigations', 'investigation'),
        ([
            'https://www.washingtonpost.com/climate-environment/environment/',
            'https://www.washingtonpost.com/climate-environment/climate-lab/',
            'https://www.washingtonpost.com/climate-environment/green-living/'
        ], 'science'),
        ([
            'https://www.washingtonpost.com/wellbeing/food-nutrition/',
            'https://www.washingtonpost.com/wellbeing/fitness/',
            'https://www.washingtonpost.com/wellbeing/mind/',
            'https://www.washingtonpost.com/wellbeing/body/',
            'https://www.washingtonpost.com/wellbeing/life/'
        ], 'health'),
        ('https://www.washingtonpost.com/lifestyle/?itid=nb_lifestyle', 'style'),
    ]

