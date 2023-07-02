import util
from spiders import nyt_spider, washpost_spider
from stories import getAllScrapedData
from dotenv import dotenv_values
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import openai
import random
from res import res as data

def main():
    util.setup()
    nyt_spider.scrape()
    washpost_spider.scrape()

    print('\nSaving data to database...')
    env = dotenv_values('.env')
    client = MongoClient(env['DATABASE_URI'], server_api=ServerApi('1'))

    db = client[env['DB_NAME']]
    collection = db[env['COLLECTION_NAME']]
    collection.insert_many(getAllScrapedData())

    dataAdj = [{'title': d['title'], 'category': random.choice(d['categories']), 'source': d['source']} for d in data]
    worldData = [d['title'] + ' (' + d['source'] + ', ' + d['category'] + ')' for d in dataAdj if d['category'] == 'world']
    usData = [d['title'] + ' (' + d['source'] + ', ' + d['category'] + ')' for d in dataAdj if d['category'] == 'us']
    opinionData = [d['title'] + ' (' + d['source'] + ', ' + d['category'] + ')' for d in dataAdj if d['category'] == 'opinion']

    content = 'Provide a daily briefing. Welcome the user, then inform them of headlines in the following format: In <category news>, <source> reports <headline>. Here are some of the headlines, in <headline> (<source>, <category>) format: ' + str(
        [d for d in random.choices(worldData, k=5)] + [d for d in random.choices(usData, k=5)] + [d for d in random.choices(opinionData, k=5)]
    ) + '.'
    openai.api_key = env['OPENAI_API_KEY']
    message = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {'role': 'user', 'content': content},
        ]
    )
    
    homeMessage = db[env['HOME_MESSAGE_COLLECTION_NAME']]
    oldHomeMessages = db[env['OLD_HOME_MESSAGES_COLLECTION_NAME']]
    
    oldMessage = homeMessage.find_one()
    homeMessage.insert_one({'message': message.choices[0].message.content})
    if oldMessage is not None:
        oldHomeMessages.insert_one(oldMessage)
        homeMessage.delete_one(oldMessage)

    client.close()
    print('Data successfully saved!')

if __name__ == '__main__':
    main()