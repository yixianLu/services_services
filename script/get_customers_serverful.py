import requests
URL = 'http://apist-ecsal-1fgzkq18ywy4h-819443051.us-east-1.elb.amazonaws.com/api/customers'

NUM_OF_REQUESTS = 1

def fetch(session, url):
    with session.get(url) as response:
        print(response.json())


def main():
    with requests.Session() as session:
        for _ in range(NUM_OF_REQUESTS):
            fetch(session,URL)
main()
