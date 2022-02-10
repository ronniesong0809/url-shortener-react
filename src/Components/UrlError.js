import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Result, Button, Typography } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'

const { Paragraph, Text } = Typography

function UrlError() {
  const navigate = useNavigate()

  const goToStatsPage = () => {
    let key = window.location.pathname.split('/')[1]
    return navigate(`/${key}`)
  }

  const goBack = () => {
    return navigate('/all')
  }

  return (
    <>
      <Row type='flex' justify='center' style={{ minHeight: '80vh' }}>
        <Result
          status='error'
          title='Short URL Error'
          subTitle='Please check the following information before retrying.'
          extra={[
            <Button type='primary' key='console' onClick={goBack}>
              Go Back
            </Button>,
            <Button key='console' onClick={goToStatsPage}>
              Go to Stats Page
            </Button>
          ]}>
          <div className='desc'>
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 16
                }}>
                This url might has the following error:
              </Text>
            </Paragraph>
            <Paragraph>
              <CloseCircleOutlined className='site-result-demo-error-icon' />{' '}
              Incorrect short key: <Link to='/'>Go to home page {'>'}</Link>
            </Paragraph>
            <Paragraph>
              <CloseCircleOutlined className='site-result-demo-error-icon' />{' '}
              Short Url is expired:{' '}
              <a onClick={goToStatsPage}>Go to stats page {'>'}</a>
            </Paragraph>
          </div>
        </Result>
      </Row>
    </>
  )
}

export default UrlError
