import os

import faust


class AttributionTrigger(faust.Record):
    customer_id: int
    amount: float


app = faust.App('test', broker=os.environ.get('FAUST_BROKER'))
topic = app.topic('attribution', value_type=AttributionTrigger)


@app.agent(topic)
async def attribute(attributions):
    # connect to clickhouse

    async for attribution in attributions:
        print(f'Trigger from {attribution.customer_id} with amount {attribution.amount}')

        # perform query by customer_id
        # detect influence
        # insert in conversions table


@app.timer(interval=1.0)
async def example_sender(app):
    await attribute.send(
        value=AttributionTrigger(customer_id=1, amount=100),
    )


if __name__ == '__main__':
    app.main()
