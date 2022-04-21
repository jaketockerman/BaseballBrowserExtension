FROM python:3

LABEL author="Rufat Imanov" email="rimanov@purdue.edu"

RUN mkdir app

WORKDIR /app

ADD docker/mlbstats/requirements.txt /app

ADD src/mlbstats_api.py /app

RUN pip install -r requirements.txt

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl --fail http://localhost:5000/ || exit 1

ENTRYPOINT [ "python" ]

CMD [ "mlbstats_api.py" ]

