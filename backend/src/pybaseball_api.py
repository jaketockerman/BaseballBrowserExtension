from flask import Flask
from pybaseball import standings

app = Flask(__name__)


@app.route('/standings', methods=['GET'])
def get_standings(year):
    return {"result": [standing.to_json() for standing in standings(year)]}


if __name__ == '__main__':
    app.run()
