import urllib.request
import urllib.parse
import queue
from bs4 import BeautifulSoup

skip=[
    # images
    'mng','pct','bmp','gif','jpg','jpeg','png','pst','psp','tif','tiff','ai','drw','dxf','eps','ps','svg',
    # audio
    'mp3','wma','ogg','wav','ra','aac','mid','au','aiff',
    # video
    '3gp','asf','asx','avi','mov','mp4','mpg','qt','rm','swf','wmv','m4a',
    # office suites
    'xls','xlsx','ppt','ppts','doc','docx','odt','ods','odg','odp',
    # other
    'css','pdf','exe','bin','rss','zip','rar'
]

class YNRH:
    def __init__(self):
        self.homepage="http://www.yinuoronghua.com"
        self.urlque=queue.Queue()
        self.seen=set()

    def getPageCode(self,pageurl):
        try:
            resp=urllib.request.urlopen(pageurl)
            data=resp.read()
        except:
            data=""
        return data

    def isHtmlPage(self,url):
        temp=urllib.parse.urlparse(url)
        if not temp.scheme=='http':
            return False
        if temp.path=='':
            return True

        loc=temp.path.rindex('/')
        filename=temp.path[loc+1:]
        parts=filename.split('.')
        if len(parts)>0:
            extension=parts[-1].lower()
            return extension not in skip
        return True

    def getPageUrls(self,pageurl):
        data=self.getPageCode(pageurl)
        if data=="":
            return

        soup=BeautifulSoup(data,'html.parser')
        urls=[url.get('href').strip() for url in soup.find_all('a') if not url.get('href') in (None,'','#','/')]
        for url in urls:
            if(url.startswith('http') or url.startswith('www') or url.startswith('https')):
                if self.isHtmlPage(url):
                    self.urlque.put(url)
                else:
                    self.seen.add(url)
            else:
                abs_url=urllib.parse.urljoin(pageurl,url)
                if self.isHtmlPage(abs_url):
                    self.urlque.put(abs_url)
                else:
                    self.seen.add(abs_url)

    def start(self):
        self.urlque.put(self.homepage)
        self.seen.add(self.homepage)

        while self.urlque.qsize()>0:
            currentUrl=self.urlque.get()
            self.getPageUrls(currentUrl)
            self.seen.add(currentUrl)

        print(self.seen.pop())

YiNuo=YNRH()
YiNuo.start()