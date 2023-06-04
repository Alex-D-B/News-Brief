import scrapy
import requests
from datetime import date
import time

class NYTSpider(scrapy.Spider):
    name = 'nyt'
    start_urls = [
        'https://www.nytimes.com/section/world'
    ]

    additional_urls = [
        # 'https://www.nytimes.com/section/us',
        # 'https://www.nytimes.com/section/politics',
        # 'https://www.nytimes.com/section/nyregion',
        # 'https://www.nytimes.com/section/business',
        # 'https://www.nytimes.com/section/opinion',
        # 'https://www.nytimes.com/section/science',
        # 'https://www.nytimes.com/section/health',
        # 'https://www.nytimes.com/section/sports',
        # 'https://www.nytimes.com/section/arts',
        # 'https://www.nytimes.com/section/books/review',
        # 'https://www.nytimes.com/section/style',
        # 'https://www.nytimes.com/section/food',
        # 'https://www.nytimes.com/section/travel',
        # 'https://www.nytimes.com/section/magazine',
        # 'https://www.nytimes.com/section/realestate'
    ]

    dateStr = str(date.today())
    linkDateStr = '/' + dateStr.replace('-', '/')
    linkLen = len(linkDateStr)
    linkBase = 'https://www.nytimes.com'
    source = 'New York Times'
    totalSegments = len(additional_urls) + 1

    def parse(self, response):
        curProgress = self.totalSegments - len(self.additional_urls) - 1
        print('\r[\033[01;32m' + ('#' * curProgress) + '\033[00m' + ('-' * (self.totalSegments - curProgress)) + ']', end='')

        sections = response.css('section.css-15h4p1b').xpath('div')[-3:]
        mainSections = sections[0].xpath('section/div')

        # get highlights
        for story in mainSections[0].css('article').xpath('div'):
            titleBar = story.css('h3 a')
            linkExt = titleBar.css('::attr(href)').get()
            if linkExt[:self.linkLen] != self.linkDateStr:
                continue

            yield {
                'title': titleBar.css('::text').get(),
                'description': story.css('p::text').get(),
                'author': story.css('span.css-1baulvz::text').get(),
                'date': self.dateStr,
                'link': self.linkBase + linkExt,
                'source': self.source
            }

        # get other stories in main section
        for story in mainSections[1:].css('a') + sections[0].xpath('section/ol//a'):
            linkExt = story.css('::attr(href)').get()
            if linkExt[:self.linkLen] != self.linkDateStr:
                continue

            yield {
                'title': story.css('h3::text').get(),
                'description': story.css('p::text').get(),
                'author': story.css('span.css-1baulvz::text').get(),
                'date': self.dateStr,
                'link': self.linkBase + linkExt,
                'source': self.source
            }
        
        # get remaining stories from the stream
        for story in sections[1].css('section a'):
            linkExt = story.css('::attr(href)').get()
            if linkExt[:self.linkLen] != self.linkDateStr:
                if linkExt[:6] == '/video':
                    continue
                break   # since stories are in chronological order

            yield {
                'title': story.css('h3::text').get(),
                'description': story.css('p::text').get(),
                'author': story.css('span.css-1n7hynb::text').get(), # try without extra css class
                'date': self.dateStr,
                'link': self.linkBase + linkExt,
                'source': self.source
            }

        # go to the next page
        if len(self.additional_urls) > 0:
            next_page = self.additional_urls.pop(0)
            time.sleep(1)
            yield response.follow(next_page, self.parse)
        else:
            print('\r[\033[01;32m' + ('#' * self.totalSegments) + '\033[00m]')

def scrape():
    with open('./data/nyt_test.html', 'w') as file:
        file.write(requests.get('https://www.nytimes.com/section/world').text)