cube(`Events`, {
  sql: `
        SELECT e.event_type,
               e.account_id,
               e.campaign_id,
               e.created_datetime,
               toDate(e.created_datetime) as created_date
        FROM events e
    `,
  dimensions: {
    accountId: {
      sql: `account_id`,
      type: `number`
    },
    eventType: {
      sql: `event_type`,
      type: `string`
    },
    campaignId: {
      sql: `campaign_id`,
      type: `string`
    },
    createdDatetime: {
      sql: `created_datetime`,
      type: `time`
    },
    createdDate: {
      sql: `created_date`,
      type: `time`
    }
  },
  measures: {
    countEvents: {
      type: `count`,
      sql: `event_type`,
      format: `number`
    }
  },
  dataSource: `default`,
});

cube(`Orders`, {
  sql: `
        SELECT o.account_id,
               o.order_id,
               o.amount_paid,
               o.currency,
               o.created_datetime,
               toDate(o.created_datetime) as created_date
        FROM orders o
    `,
  dimensions: {
    accountId: {
      sql: `account_id`,
      type: `number`
    },
    orderId: {
      sql: `order_id`,
      type: `number`
    },
    amountPaid: {
      sql: `amount_paid`,
      type: `number`
    },
    currency: {
      sql: `currency`,
      type: `string`
    },
    createdDatetime: {
      sql: `created_datetime`,
      type: `time`
    },
    createdDate: {
      sql: `created_date`,
      type: `time`
    }
  },
  measures: {
    totalAmountPaid: {
      type: `sum`,
      sql: `amount_paid`,
      format: `number`
    }
  },
  dataSource: `default`,
});