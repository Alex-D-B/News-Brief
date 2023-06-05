from scrapy.crawler import CrawlerRunner
from crochet import setup as crochetSetup, wait_for

# for crochet to work
def setup():
    crochetSetup()

# use crochet to make the spider crawl a website
@wait_for(20)
def scrape(SpiderCls):
    return CrawlerRunner().crawl(SpiderCls)