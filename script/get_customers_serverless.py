import requests
URL = 'https://eipq756kyb.execute-api.us-east-1.amazonaws.com/api/customers'

NUM_OF_REQUESTS = 1

def fetch(session, url):
    with session.get(url) as response:
        print(response.json())


def main():
    with requests.Session() as session:
        for _ in range(NUM_OF_REQUESTS):
            fetch(session,URL)
main()