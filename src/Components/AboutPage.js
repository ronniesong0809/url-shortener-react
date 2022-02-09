import React from 'react'
import { Row, Typography, Divider, Button } from 'antd'
import { GithubOutlined, FolderOpenOutlined } from '@ant-design/icons'
const { Title, Paragraph, Text, Link } = Typography

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
          <Paragraph>
            <Button
              icon={<GithubOutlined />}
              href='https://github.com/ronniesong0809/url-shortener'
            >
              Learn More
            </Button>
            <Button
              icon={<FolderOpenOutlined />}
              href='https://shorturl.ronsong.live/api/docs/v3/'
              style={{ marginLeft: '10px' }}
            >
              API Documentation
            </Button>
          </Paragraph>
        </Typography>
      </Row>
    </>
  )
}

export default AboutPage
