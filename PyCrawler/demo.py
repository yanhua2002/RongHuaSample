import urllib.request
import queue

class YNRH:
    def __init__(self):
        self.homepage="http://www.baidu.com"
        self.urlque=queue.Queue()
        self.seen=set()

    def getPageCode(self,pageurl):
        try:
            resp=urllib.request.urlopen(pageurl)
            data=resp.read()
        except:
            data=""
        return data

    def getPageUrls(self,pageurl):
        data=self.getPageCode(pageurl)
        if data=="":
            return

    def start(self):
        self.urlque.put(self.homepage)
        self.seen.add(self.homepage)

        while self.urlque.qsize()>0:
            currentUrl=self.urlque.get()
            self.getPageUrls(currentUrl)
            self.seen.add(currentUrl)

YiNuo=YNRH()
YiNuo.start()