import util
from spiders.nyt_spider import NYTSpider
from stories import *
from dotenv import dotenv_values
from pymongo import MongoClient
from pymongo.server_api import ServerApi

def main():
    util.setup()
    util.scrape(NYTSpider)

    env = dotenv_values('.env')
    client = MongoClient(env['DATABASE_URI'], server_api=ServerApi('1'))

    collection = client[env['DB_NAME']][env['COLLECTION_NAME']]
    collection.insert_many(nytData.get())

    client.close()

if __name__ == '__main__':
    main()