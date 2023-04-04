import requests
# from timer import timer


URL = 'http://apist-ecsal-1fgzkq18ywy4h-819443051.us-east-1.elb.amazonaws.com/api/orders'

order_ID = '99de3140-d330-11ed-ae10-e7800fe89a18'

URL = URL + order_ID

NUM_OF_REQUESTS = 1

def fetch(session, url):
    with session.get(url) as response:
        print(response.json())


def main():
    with requests.Session() as session:
        for _ in range(NUM_OF_REQUESTS):
            fetch(session,URL)
main()
