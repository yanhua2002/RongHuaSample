import request, error from urllib
import queue

class YNRH():
    def __init__(self):
        self.homepage="http://www.baidu.com"
        self.urlque=queue.Queue()
        self.seen=set()

    def getPage(self,pageurl):
        suite

try: response = request.urlopen("http://www.baidu.com")
except error.URLError as e:
    print(e.reason)
else:
    print(response.read())