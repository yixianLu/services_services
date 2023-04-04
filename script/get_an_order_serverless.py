import requests
# from timer import timer


URL = 'https://eipq756kyb.execute-api.us-east-1.amazonaws.com/api/orders/'

order_ID = '9ce9ba13-e23f-46a2-86fc-4ca9f7882ced'

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
