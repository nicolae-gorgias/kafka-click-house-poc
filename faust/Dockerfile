FROM python:3.10-alpine

RUN mkdir -p /app
WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

CMD ["sh", "start.sh"]