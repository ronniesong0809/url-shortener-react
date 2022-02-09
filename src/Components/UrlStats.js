import React from 'react'
import { getUrlStats } from '../Apis/getUrlStats'
import { Row, Space, Descriptions, message } from 'antd'
import DayJS from 'react-dayjs'

const { useState, useEffect } = React

function UrlStats() {
  const [stats, setStats] = useState([])
  const [shortUrl, setShortUrl] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    let path = window.location.pathname.substring(1)

    await getUrlStats(path)
      .catch(function (err) {
        message.error(err.message, 10)
      })
      .then((res) => {
        setStats(res.data.stats)
        setShortUrl(
          process.env.REACT_APP_BASEURL + '/' + res.data.stats.shortKey
        )
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
              title={stats.shortKey + 'Stats'}
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
            </Descriptions>
          </>
        )}
      </Row>
    </>
  )
}

export default UrlStats
