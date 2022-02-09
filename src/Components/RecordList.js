import React from 'react'
import { Link } from 'react-router-dom'
import { getAllRecord } from '../Apis/getAllRecord'
import { Row, Space, Table, message } from 'antd'
import DayJS from 'react-dayjs'

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
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, row, index) => (
        <DayJS format='H:mm A M/D/YYYY'>{text}</DayJS>
      )
    },
    {
      title: 'Updated Date',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text, row, index) => (
        <DayJS format='H:mm A M/D/YYYY'>{text}</DayJS>
      )
    }
  ]

  return (
    <>
      <Space direction='vertical' size='large' />
      <Row type='flex' justify='center' style={{ minHeight: '80vh' }}>
        {records && (
          <>
            <Space direction='vertical' size='large' />
            <Space direction='vertical' size='large' />
            <br />
            <Table
              columns={columns}
              dataSource={records}
              rowKey='_id'
              pagination={{ pageSize: 10 }}
              style={{ width: '90%' }}
            />
          </>
        )}
      </Row>
    </>
  )
}

export default RecordList
