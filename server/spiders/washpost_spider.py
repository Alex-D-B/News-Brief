from parsel import Selector
from datetime import date
from stories import washpostData
import util

import requests

class WashPostParser:
    dateStr = str(date.today())
    linkDateStr = '/' + dateStr.replace('-', '/')
    source = 'Washington Post'

    seenStories = dict()

    def parse(self, response, category):
        for story in response.css('div.story-headline'):
            link = story.xpath('./a/@href').get()

            if link in self.seenStories:
                if category == 'business-science':
                    self.seenStories[link]['categories'].add('business')
                    self.seenStories[link]['categories'].add('science')
                else:
                    self.seenStories[link]['categories'].add(category)
            elif self.linkDateStr in link:
                categories = {category} if category != 'business-science' else {'business', 'science'}
                self.seenStories[link] = {
                    'title': story.css('a h3::text').get(),
                    'description': story.css('p::text').get(),
                    'author': story.css('span a::text').get(),
                    'categories': categories,
                    'date': self.dateStr,
                    'link': link,
                    'source': self.source
                }

def scrape():
    urls_and_categories = [
        (['https://www.washingtonpost.com/world/?itid=hp_top_nav_world'], 'world'),
        (['https://www.washingtonpost.com/politics/?itid=hp_top_nav_politics'], 'politics'),
        (['https://www.washingtonpost.com/business/technology/?itid=hp_top_nav_tech'], 'business'),
        (['https://www.washingtonpost.com/climate-environment/business-of-climate/'], 'business-science'),
        ([
            'https://www.washingtonpost.com/opinions/the-posts-view/',
            'https://www.washingtonpost.com/opinions/guest-opinions/'
        ], 'opinion'),
        (['https://www.washingtonpost.com/national/investigations/?itid=hp_top_nav_investigations'], 'investigation'),
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
        (['https://www.washingtonpost.com/lifestyle/?itid=nb_lifestyle'], 'style'),
    ]

    totalSegments = sum([len(urlGroup) for urlGroup, _ in urls_and_categories])
    curProgress = 0

    print('Scraping Washington Post:')
    parser = WashPostParser()
    for urlGroup, category in urls_and_categories:
        for url in urlGroup:
            util.displayProgress(curProgress, totalSegments)
            response = requests.get(url)
            selector = Selector(response.text)
            parser.parse(selector, category)
            curProgress += 1

    washpostData.save(parser.seenStories.values())
    util.displayProgressFinished(totalSegments)
