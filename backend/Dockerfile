FROM python:3-slim

LABEL author="Jake Tockerman" email="jtockerm@purdue.edu"

ENV PYTHONUNBUFFERED True

ENV APP_HOME /app
WORKDIR $APP_HOME

ADD requirements.txt ./

RUN pip install -r requirements.txt

ADD backend.py ./

HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl --fail http://localhost:5001/ || exit 1
  
# Run the web service on container startup. Here we use the gunicorn
# webserver, with one worker process and 8 threads.
# For environments with multiple CPU cores, increase the number of workers
# to be equal to the cores available.
# Timeout is set to 0 to disable the timeouts of the workers to allow Cloud Run to handle instance scaling.
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 backend:app
