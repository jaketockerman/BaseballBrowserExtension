from flask import Flask, json
from pybaseball import standings

app = Flask(__name__)


@app.route('/standings/', methods=['GET'])
@app.route('/standings/<year>', methods=['GET'])
def get_standings(year=None):
    if year is not None:
        year = int(year)
    response = json.jsonify({"result": [standing.to_dict(orient="records") for standing in standings(year)]})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    app.run()
