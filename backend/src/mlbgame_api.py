from flask import Flask
from mlbgame import standings
from mlbgame import datetime
import os

app = Flask(__name__)

@app.route('/standings/', methods=['GET'])
@app.route('/standings/<year>', methods=['GET'])


def get_standings(year=None):
    if year is not None:
        my_date = datetime.datetime(year, 11, 15)
    else:
        my_date = datetime.now()

    return {"result": standings(my_date)}

if __name__ == '__main__':
    app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('PORT', 4444)))
