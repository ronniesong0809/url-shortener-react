import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Space, Descriptions, message, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import DayJS from 'react-dayjs'
import { getUrlStats } from '../Apis/getUrlStats'
import { deleteUrlRecord } from '../Apis/deleteUrlRecord'

const { useState, useEffect } = React

function UrlStats() {
  const navigate = useNavigate()
  const [stats, setStats] = useState([])
  const [shortUrl, setShortUrl] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    let path = window.location.pathname.substring(1)

    await getUrlStats(path)
      .then((res) => {
        if (!res) {
          message.error(path + ' does not have any data yet', 10)
          return navigate('/all')
        }
        setStats(res.data.stats)
        setShortUrl(
          process.env.REACT_APP_BASEURL + '/' + res.data.stats.shortKey
        )
      })
      .catch(function (err) {
        message.error(path + ' does not have any data yet: ' + err.message, 10)
        return navigate('/all')
      })
  }

  const deleteUrl = async () => {
    let path = window.location.pathname.substring(1)

    await deleteUrlRecord(path)
      .then((res) => {
        if (!res) {
          message.error(path + ' not found', 10)
          return navigate('/all')
        }
        message.info(res.data.message, 10)
        return navigate('/all')
      })
      .catch(function (err) {
        message.error(path + ' not found: ' + err.message, 10)
        return navigate('/all')
      })
  }

  return (
    <>
      <Space direction='vertical' size='large' />
      <Row type='flex' justify='center' style={{ minHeight: '80vh' }}>
        {stats && (
          <>
            <Space direction='vertical' size='large' />
            <Space direction='vertical' size='large' />
            <br />
            <Descriptions
              title={'[' + stats.shortKey + '] Stats'}
              bordered
              column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label='Short URL' span={2}>
                <a
                  className='App-link'
                  href={shortUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {shortUrl}
                </a>
              </Descriptions.Item>
              <Descriptions.Item label='Key'>
                {stats.shortKey}
              </Descriptions.Item>
              <Descriptions.Item label='Created Date'>
                <DayJS format='HH:mm A M/d/YYYY'>{stats.createdAt}</DayJS>
              </Descriptions.Item>
              <Descriptions.Item label='Clicks'>
                {stats.clicks}
              </Descriptions.Item>
              <Descriptions.Item label='Last Click Date'>
                <DayJS format='HH:mm A M/d/YYYY'>{stats.updatedAt}</DayJS>
              </Descriptions.Item>
              <Descriptions.Item label='Last Click IP' span={2}>
                {stats.ip}
              </Descriptions.Item>
              <Descriptions.Item>
                <Button danger icon={<DeleteOutlined />} onClick={deleteUrl}>
                  Delete
                </Button>
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Row>
    </>
  )
}

export default UrlStats
