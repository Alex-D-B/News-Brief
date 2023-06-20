from scrapy.crawler import CrawlerRunner
from crochet import setup as crochetSetup, wait_for

# for crochet to work
def setup():
    crochetSetup()

# use crochet to make the spider crawl a website
@wait_for(30)
def scrapeWithScrapySpider(SpiderCls):
    return CrawlerRunner().crawl(SpiderCls)

def displayProgress(curProgress, totalSegments):
    print('\r[\033[01;32m' + ('#' * curProgress) + '\033[00m' + ('-' * (totalSegments - curProgress)) + ']', end='')

def displayProgressFinished(totalSegments):
    print('\r[\033[01;32m' + ('#' * totalSegments) + '\033[00m]')