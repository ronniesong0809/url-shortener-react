import React from 'react'
import { Row, Typography, Divider, Button, Space } from 'antd'
import { GithubOutlined, FolderOpenOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography

function AboutPage() {
  return (
    <>
      <Row
        type='flex'
        justify='center'
        align='middle'
        style={{ margin: '20vh' }}
      >
        <Typography>
          <Title>Url Shortener</Title>
          <Paragraph>
            An internal service for shortening URLs that keep track of quickly
            referenced internal tools, wiki pages, and external resources
          </Paragraph>
          <Divider></Divider>
          <Paragraph>
            <Space>
              <Button
                icon={<GithubOutlined />}
                className='App-link'
                href='https://github.com/ronniesong0809/url-shortener'
                target='_blank'
                rel='noopener noreferrer'
              >
                Learn More
              </Button>
              <Button
                icon={<FolderOpenOutlined />}
                className='App-link'
                href='https://shorturl.ronsong.live/api/docs/v3/'
                target='_blank'
                rel='noopener noreferrer'
              >
                API Docs
              </Button>
            </Space>
          </Paragraph>
        </Typography>
      </Row>
    </>
  )
}

export default AboutPage
