import util
import nyt_scraper

def main():
    util.setup()
    util.scrape(nyt_scraper.NYTSpider)
    # nyt_scraper.scrape()

if __name__ == '__main__':
    main()