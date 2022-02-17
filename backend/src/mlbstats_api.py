from flask import Flask
import statsapi
import os
from datetime import datetime

app = Flask(__name__)

@app.route('/standings/', methods=['GET'])
@app.route('/standings/<year>', methods=['GET'])


def get_standings(year=None):
    # If year is not given, pull standings from last year
    if not year:
        my_year = datetime.now().year - 1
    else:
        my_year = year

    print("year:",my_year)
    return statsapi.standings(season=my_year)

if __name__ == '__main__':
    app.run()
