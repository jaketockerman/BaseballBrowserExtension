from flask import Flask
from pybaseball import standings

app = Flask(__name__)


@app.route('/standings/', methods=['GET'])
@app.route('/standings/<year>', methods=['GET'])
def get_standings(year=None):
    if year is not None:
        year = int(year)
    return {"result": [standing.to_json() for standing in standings(year)]}


if __name__ == '__main__':
    app.run()
