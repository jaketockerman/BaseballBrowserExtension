from datetime import datetime
from flask import Flask, json
from pybaseball import get_splits, playerid_reverse_lookup, batting_stats, pitching_stats

app = Flask(__name__)

@app.route('/player/<mlbamID>', methods=['GET'])
def get_player(mlbamID: str):
    #{"name_last":{"0":"yelich"},"name_first":{"0":"christian"},"key_mlbam":{"0":592885},"key_retro":{"0":"yelic001"},"key_bbref":{"0":"yelicch01"},"key_fangraphs":{"0":11477},"mlb_played_first":{"0":2013.0},"mlb_played_last":{"0":2021.0}}
    #{"name_last":{"0":"braun"},"name_first":{"0":"ryan"},"key_mlbam":{"0":460075},"key_retro":{"0":"braur002"},"key_bbref":{"0":"braunry02"},"key_fangraphs":{"0":3410},"mlb_played_first":{"0":2007.0},"mlb_played_last":{"0":2020.0}}
    player_ids = playerid_reverse_lookup([int(mlbamID)], key_type="mlbam").to_dict()
    try:
        batting = batting_stats(start_season=1871, end_season=datetime.now().year, players=player_ids["key_fangraphs"][0], qual=1).sort_values(["Season"]).to_json(orient="records")
    except:
        batting = ""
    try:
        pitching = pitching_stats(start_season=1871, end_season=datetime.now().year, players=player_ids["key_fangraphs"][0], position='P', qual=1).sort_values(["Season"]).to_json(orient="records")
    except:
        pitching = ""
    response = json.jsonify({"result": {"batting": batting, "pitching": pitching}})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run()
