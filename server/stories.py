class ScrapedData:
    def __init__(self):
        self.data = None

    def save(self, data):
        self.data = data
        for story in self.data:
            story['categories'] = list(story['categories'])

    def get(self):
        return self.data
    
nytData = ScrapedData()