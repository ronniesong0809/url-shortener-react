import React from 'react'
import { Link } from 'react-router-dom'
import { getAllRecord } from '../Apis/getAllRecord'
import { Row, Table, message, Tooltip, Statistic } from 'antd'
import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const { Countdown } = Statistic
const { useState, useEffect } = React

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
      render: (text, row, index) => <Link to={'/' + text}>{text}</Link>
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
          {text !== 0 ? (
            <Tooltip
              placement='topLeft'
              title={dayjs(dayjs(row.createdAt).add(text, 'day')).format('HH:mm A M/D/YYYY')}
            >
              <Countdown
                title='expires in'
                value={dayjs(row.createdAt).add(text, 'day')}
                valueStyle={{ fontSize: '12px' }}
                format='HH:mm:ss'
              />
            </Tooltip>
          ) : (
            'forever'
          )}
        </div>
      )
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, row, index) => (
        <Tooltip
          placement='top'
          title={dayjs(text).format('HH:mm A M/D/YYYY')}
        >
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
