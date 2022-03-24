import { Row, Statistic, Table, Tooltip, Typography, message } from 'antd'

import { InfoCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import React from 'react'
import dayjs from 'dayjs'
import { getAllRecord } from '../Apis/getAllRecord'

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const { Countdown } = Statistic
const { useState, useEffect } = React
const { Text } = Typography

function RecordList() {
  const [records, setRecords] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    await getAllRecord()
      .catch(function (err) {
        message.error(err.message, 10)
      })
      .then((res) => {
        setRecords(res.data)
      })
  }

  const columns = [
    {
      title: 'Key',
      dataIndex: 'shortKey',
      key: 'shortKey',
      render: (text, row, index) => (
        <>
          {text}{' '}
          <Tooltip title='More Details'>
            <Link to={'/' + text}>
              <InfoCircleOutlined />
            </Link>
          </Tooltip>
        </>
      )
    },
    {
      title: 'Shortened URL',
      dataIndex: 'shortUrl',
      key: 'shortUrl',
      render: (text, row, index) => (
        <a
          className='App-link'
          href={text}
          target='_blank'
          rel='noopener noreferrer'
        >
          {text}
        </a>
      )
    },
    {
      title: 'Origin URL',
      dataIndex: 'longUrl',
      key: 'longUrl'
    },
    {
      title: 'Expiration Date',
      dataIndex: 'expiration',
      key: 'expiration',
      render: (text, row, index) => (
        <div>
          {text === 0 ? (
            <Text type='success'>forever</Text>
          ) : dayjs(row.updatedAt)
              .add(text, 'day')
              .isBefore(dayjs(new Date())) ? (
            <Text type='danger'>expired</Text>
          ) : (
            <Tooltip
              placement='topLeft'
              title={dayjs(dayjs(row.updatedAt).add(text, 'day')).format(
                'HH:mm A M/D/YYYY'
              )}
            >
              <Countdown
                title='expires in'
                value={dayjs(row.updatedAt).add(text, 'day')}
                valueStyle={{ fontSize: '12px' }}
                format='HH:mm:ss'
              />
            </Tooltip>
          )}
        </div>
      )
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text, row, index) => (
        <Tooltip placement='top' title={dayjs(text).format('HH:mm A M/D/YYYY')}>
          {dayjs(text).fromNow()}
        </Tooltip>
      )
    }
  ]

  return (
    <>
      <Row type='flex' justify='center'>
        {records && (
          <>
            <Table
              columns={columns}
              dataSource={records}
              rowKey='_id'
              pagination={{ pageSize: 10 }}
            />
          </>
        )}
      </Row>
    </>
  )
}

export default RecordList
