from flask import Flask, json
import statsapi
import os
from datetime import datetime

app = Flask(__name__)


@app.route('/standings/', methods=['GET'])
@app.route('/standings/<year>', methods=['GET'])

def get_standings(year=None):
    if not year:
        year = datetime.now().year
        if not statsapi.standings(season=year):
            year = datetime.now().year - 1
    response = json.jsonify({"result": statsapi.standings_data(season=year), "year": year})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/teams/<gameID>', methods=['GET'])

def get_teams(gameID):
    dict_ret_boxscore_data = statsapi.boxscore_data(gamePk=gameID)  
    
    response = json.jsonify({"result" : dict_ret_boxscore_data["teamInfo"], "gameID" : gameID})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

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
    response = json.jsonify({"result" : gameData, "gameID" : gameID})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    
@app.route('/liveData/<gameID>', methods=['GET'])

def get_liveData(gameID):
    liveData = get_rawData(gameID)['liveData']
    response = json.jsonify({"result" : liveData, "gameID" : gameID})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run()
