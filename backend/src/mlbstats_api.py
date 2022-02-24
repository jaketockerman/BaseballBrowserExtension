from flask import Flask
import statsapi
import os
from datetime import datetime

app = Flask(__name__)


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

# @app.route('/currentBatter/<gameID>', methods=['GET'])

# def get_current_batter(gameID):
#     game_link = "https://statsapi.mlb.com/api/v1.1/game/" + gameID + "/feed/live"
#     return statsapi.get(game_link, params={"fields" : "liveData:plays:matchup:batter"})


# @app.route('/currentPitcher/<gameID>', methods=['GET'])

# def get_current_pitcher(gameID):
#     game_link = "https://statsapi.mlb.com/api/v1.1/game/" + gameID + "/feed/live"
#     return statsapi.get(game_link, params={"gamePk" : gameID})

def get_rawData(gameID):
    ret_data = statsapi.get("game", {"gamePk": gameID})
    return ret_data

@app.route('/gameData/<gameID>', methods=['GET'])

def get_gameData(gameID):
    gameData = get_rawData(gameID)['gameData']
    return gameData
    
@app.route('/liveData/<gameID>', methods=['GET'])

def get_liveData(gameID):
    liveData = get_rawData(gameID)['liveData']
    return liveData

if __name__ == '__main__':
    app.run()
