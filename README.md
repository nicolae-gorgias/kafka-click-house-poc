# PoC for kafka to clickhouse

0. Clone repo
1. Run service using `docker-compose up`
2. Connect to clickhouse `localhost:8123` with PyCharm
3. Create a table in clickhouse using `http://localhost:8123/play` or PyCharm console
```clickhouse
create table default.events
(
    event_type  String,
    customer_id Int64
)
    engine = Memory;
```
4. Configure `kafka-connector`
```
curl --request PUT \
  --url http://localhost:8083/connectors/events-source/config \
  --header 'Content-Type: application/json' \
  --data '{
	"connector.class": "com.clickhouse.kafka.connect.ClickHouseSinkConnector",
	"topics": "events",
	"hostname": "clickhouse",
	"port": 8123
}'
```
5. Push event in kafka topic through `kafka-rest-proxy`
```
curl --request POST \
  --url http://localhost:8082/topics/events \
  --header 'Accept: application/vnd.kafka.v2+json, application/vnd.kafka+json, application/json' \
  --header 'Content-type: application/vnd.kafka.json.v2+json' \
  --data '{
	"records": [
		{
			"value": {"event_type": "click", "customer_id": 1}
		},
		{
			"value": {"event_type": "view", "customer_id": 1}
		},
		{
			"value": {"event_type": "add-to-cart", "customer_id": 1}
		}
	]
}'
```
6. Check results in clickhouse using `http://localhost:8123/play` or PyCharm consol
```sql
SELECT * from events;
```