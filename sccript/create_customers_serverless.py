import requests
# from timer import timer

URL = 'https://eipq756kyb.execute-api.us-east-1.amazonaws.com/api/customers'

NUM_OF_REQUESTS = 1

def fetch(session, url):
    data =  {"name": "abccc","creditLimit": 100 }
    with session.post(url,json=data) as response:
        print(response.json())


def main():
    with requests.Session() as session:
        for _ in range(NUM_OF_REQUESTS):
            fetch(session,URL)
main()