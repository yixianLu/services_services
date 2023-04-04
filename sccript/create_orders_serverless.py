import requests
# from timer import timer


URL = 'https://eipq756kyb.execute-api.us-east-1.amazonaws.com/api/orders/'

NUM_OF_REQUESTS = 1

def fetch(session, url):
    data =  { "customerId": "7e08cb72-4a1b-42b6-8601-9b3e241a4725",  "orderTotal": 20 }
    with session.post(url,json=data) as response:
        print(response.json())


def main():
    with requests.Session() as session:
        for _ in range(NUM_OF_REQUESTS):
            fetch(session,URL)
main()
