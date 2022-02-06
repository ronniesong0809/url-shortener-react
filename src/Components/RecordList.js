import React from 'react'
import { getAllRecord } from '../Apis/getAllRecord'
import { Table } from 'antd'

const { useState, useEffect } = React

function RecordList() {
  const [records, setRecords] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    await getAllRecord().then((res) => {
      setRecords(res.data)
    })
  }

  const columns = [
    {
      title: 'Shortened URL',
      dataIndex: 'shortUrl',
      key: 'shortUrl',
      render: (text, row, index) => (
        <a href={process.env.REACT_APP_BASEURL + '/' + text}>{text}</a>
      )
    },
    {
      title: 'Origin URL',
      dataIndex: 'longUrl',
      key: 'longUrl'
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp'
    }
  ]

  return (
    <>
      {records && (
        <Table
          columns={columns}
          dataSource={records}
          rowKey='_id'
          pagination={{ pageSize: 10 }}
        />
      )}
    </>
  )
}

export default RecordList
