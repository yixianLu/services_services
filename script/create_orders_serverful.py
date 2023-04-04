import requests
# from timer import timer


URL = 'http://apist-ecsal-1fgzkq18ywy4h-819443051.us-east-1.elb.amazonaws.com/api/orders'

NUM_OF_REQUESTS = 1

def fetch(session, url):
    data =  { "customerId": "3c1d0860-d330-11ed-948a-e99a022fe34e",  "orderTotal": 20 }
    with session.post(url,json=data) as response:
        print(response.json())


def main():
    with requests.Session() as session:
        for _ in range(NUM_OF_REQUESTS):
            fetch(session,URL)
main()
