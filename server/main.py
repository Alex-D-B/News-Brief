import util
from spiders import nyt_spider, washpost_spider
from stories import getAllScrapedData
from dotenv import dotenv_values
from pymongo import MongoClient
from pymongo.server_api import ServerApi

def main():
    util.setup()
    nyt_spider.scrape()
    washpost_spider.scrape()

    print('\nSaving data to database...')
    env = dotenv_values('.env')
    client = MongoClient(env['DATABASE_URI'], server_api=ServerApi('1'))

    collection = client[env['DB_NAME']][env['COLLECTION_NAME']]
    collection.insert_many(getAllScrapedData())

    client.close()
    print('Data successfully saved!')

if __name__ == '__main__':
    main()