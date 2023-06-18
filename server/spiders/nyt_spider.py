import scrapy
from datetime import date
import time
from stories import nytData

class NYTSpider(scrapy.Spider):
    name = 'nyt'
    start_urls = [
        'https://www.nytimes.com/section/world'
    ]

    additional_categories = [
        'us',
        'politics',
        'nyregion',
        'business',
        'opinion',
        'science',
        'health',
        'sports',
        'arts',
        'books',
        'style',
        'food',
        'travel',
        'magazine',
        'realestate'
    ]

    dateStr = str(date.today())
    linkDateStr = '/' + dateStr.replace('-', '/')
    linkLen = len(linkDateStr)
    linkBase = 'https://www.nytimes.com'
    source = 'New York Times'
    totalSegments = len(additional_categories) + 1

    seenStories = dict()
    curCategory = 'world'

    def storeStory(self, story, linkExt, *, titleCSSSelector, authorCSSSelector):
        link = self.linkBase + linkExt
        if link in self.seenStories:
            self.seenStories[link]['categories'].add(self.curCategory)
        else:
            self.seenStories[link] = {
                'title': story.css(titleCSSSelector).get(),
                'description': story.css('p::text').get(),
                'author': story.css(authorCSSSelector).get(),
                'categories': {self.curCategory},
                'date': self.dateStr,
                'link': link,
                'source': self.source
            }

    def parse(self, response):
        curProgress = self.totalSegments - len(self.additional_categories) - 1
        print('\r[\033[01;32m' + ('#' * curProgress) + '\033[00m' + ('-' * (self.totalSegments - curProgress)) + ']', end='')

        sections = response.css('section.css-15h4p1b').xpath('div')[-3:]
        mainSections = sections[0].xpath('section/div')

        # get highlights
        for story in mainSections[0].css('article').xpath('div'):
            linkExt = story.css('h3 a::attr(href)').get()
            if linkExt[:self.linkLen] != self.linkDateStr:
                continue

            self.storeStory(story, linkExt, titleCSSSelector='h3 a::text', authorCSSSelector='span.css-1baulvz::text')

        # get other stories in main section
        for story in mainSections[1:].css('a') + sections[0].xpath('section/ol//a'):
            linkExt = story.css('::attr(href)').get()
            if linkExt[:self.linkLen] != self.linkDateStr:
                continue

            self.storeStory(story, linkExt, titleCSSSelector='h3::text', authorCSSSelector='span.css-1baulvz::text')
        
        # get remaining stories from the stream
        for story in sections[1].css('section a'):
            linkExt = story.css('::attr(href)').get()
            if linkExt[:self.linkLen] != self.linkDateStr:
                if linkExt[:6] == '/video':
                    continue
                break   # since stories are in chronological order

            self.storeStory(story, linkExt, titleCSSSelector='h3::text', authorCSSSelector='span.css-1n7hynb::text')

        # go to the next page
        if len(self.additional_categories) > 0:
            time.sleep(1)
            self.curCategory = self.additional_categories.pop(0)
            yield response.follow('https://www.nytimes.com/section/' + self.curCategory + ('/review' if self.curCategory == 'books' else ''), self.parse)
        else:
            nytData.save(self.seenStories.values())
            print('\r[\033[01;32m' + ('#' * self.totalSegments) + '\033[00m]')