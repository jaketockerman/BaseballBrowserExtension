FROM python:3

LABEL author="Rufat Imanov" email="rimanov@purdue.edu"

RUN mkdir app

WORKDIR /app

ADD docker/pybaseball/requirements.txt /app

ADD src/pybaseball_api.py /app

RUN pip install -r requirements.txt

EXPOSE 5001

HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl --fail http://localhost:5001/ || exit 1
  
ENTRYPOINT [ "python" ]

CMD [ "pybaseball_api.py" ]

