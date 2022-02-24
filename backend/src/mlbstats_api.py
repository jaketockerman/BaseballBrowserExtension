from flask import Flask
import statsapi
import os
from datetime import datetime

app = Flask(__name__)

def get_game_data(game_id):
    return statsapi.schedule(game_id=game_id)


@app.route('/standings/', methods=['GET'])
@app.route('/standings/<year>', methods=['GET'])

def get_standings(year=None):
    if not year:
        if statsapi.standings(season=year):
            my_year = datetime.now().year
        else:
            my_year = datetime.now().year - 1
    else:
        my_year = year

    return statsapi.standings(season=my_year)


@app.route('/teams/<gameID>', methods=['GET'])

def get_teams(gameID):
    dict_ret_boxscore_data = statsapi.boxscore_data(gamePk=gameID)    
    return dict_ret_boxscore_data["teamInfo"]

if __name__ == '__main__':
    app.run()
