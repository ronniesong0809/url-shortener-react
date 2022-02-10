import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Row,
  Space,
  Descriptions,
  message,
  Button,
  Tooltip,
  Popconfirm
} from 'antd'
import { WarningOutlined, DeleteOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { getUrlStats } from '../Apis/getUrlStats'
import { deleteUrlRecord } from '../Apis/deleteUrlRecord'

const { useState, useEffect } = React

function UrlStats() {
  const navigate = useNavigate()
  const [stats, setStats] = useState([])
  const [shortUrl, setShortUrl] = useState([])
  const [visible, setVisible] = React.useState(false)

  const showPopconfirm = () => {
    setVisible(true)
  }

  const closePopconfirm = () => {
    setVisible(false)
  }

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
              column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }}
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
              <Descriptions.Item label='First Clicked Date'>
                <Tooltip
                  placement='right'
                  title={dayjs(stats.createdAt).format('HH:mm A M/D/YYYY')}
                >
                  {dayjs(stats.createdAt).fromNow()}
                </Tooltip>
              </Descriptions.Item>
              <Descriptions.Item label='Clicks'>
                {stats.clicks}
              </Descriptions.Item>
              <Descriptions.Item label='Last Clicked Date'>
                <Tooltip
                  placement='right'
                  title={dayjs(stats.updatedAt).format('HH:mm A M/D/YYYY')}
                >
                  {dayjs(stats.updatedAt).fromNow()}
                </Tooltip>
              </Descriptions.Item>
              <Descriptions.Item label='Last Clicked IP' span={2}>
                {stats.ip}
              </Descriptions.Item>
              <Descriptions.Item>
                <Popconfirm
                  title='Are you sure you want to delete?'
                  visible={visible}
                  onConfirm={deleteUrl}
                  onCancel={closePopconfirm}
                  okText='Yes'
                  cancelText='No'
                  icon={<WarningOutlined style={{ color: 'red' }} />}
                >
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={showPopconfirm}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Row>
    </>
  )
}

export default UrlStats
