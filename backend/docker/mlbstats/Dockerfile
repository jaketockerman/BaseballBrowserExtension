FROM python:3

MAINTAINER Rufat Imanov "rimanov@purdue.edu"

RUN mkdir app

WORKDIR /app

RUN pip install -r ../requirements.txt

EXPOSE 5000

ENTRYPOINT [ "python" ]

CMD [ "../src/mlbstats" ]

