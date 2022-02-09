import React, { useState, useEffect } from 'react'
import {
  Row,
  Input,
  message,
  Form,
  Space,
  Button,
  Radio,
  Drawer,
  Typography
} from 'antd'
import { GlobalOutlined, SendOutlined } from '@ant-design/icons'
import { postLongUrl } from '../Apis/postLongUrl'
const { Title, Paragraph } = Typography

function InputBox() {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  useEffect(() => {
    form.setFieldsValue({
      expiration: 0
    })
  })

  const onFinish = (data) => {
    console.log(data)
    postLongUrl(data.url)
      .catch(function (err) {
        message.error(err.message, 10)
      })
      .then((response) => {
        if (response.status !== 200) {
          message.error(`${response.data.err}`)
        }

        if (response.data) {
          setData(response.data)
          showDrawer()
          message.success(`Submit success! ${response.data.message}`)
        }
      })
  }

  const onFinishFailed = () => {
    message.error('Submit failed!')
  }

  const onReset = () => {
    form.setFieldsValue({
      url: '',
      expiration: 0
    })
  }

  return (
    <>
      <Drawer
        title='Short URL Generated'
        placement='bottom'
        onClose={onClose}
        visible={visible}
      >
        <Row type='flex' justify='center' style={{ padding: '40px' }}>
          <Typography>
            {data && (
              <>
                <Paragraph>
                  {data.message && <blockquote>{data.message}</blockquote>}
                </Paragraph>
                <Title level={3} copyable>
                  <a href={data.url}>
                    <Space>
                      <GlobalOutlined />
                      {data.url}
                    </Space>
                  </a>
                </Title>
                <Paragraph>
                  <Button icon={<SendOutlined />} href={data.url}>
                    Visit URL
                  </Button>
                </Paragraph>
              </>
            )}
          </Typography>
        </Row>
      </Drawer>

      <Row
        type='flex'
        justify='center'
        align='middle'
        style={{ margin: '20vh' }}
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          style={{ width: '90vh' }}
        >
          <Form.Item
            name='url'
            label='Please enter a URL'
            rules={[
              {
                required: true
              },
              {
                type: 'url',
                message: 'must be a valid url'
              },
              {
                type: 'string',
                min: 6
              }
            ]}
          >
            <Input placeholder='https://github.com/ronniesong0809/url-shortener-react' />
          </Form.Item>
          <Form.Item name='expiration' label='Expire time?'>
            <Radio.Group>
              <Radio.Button value={0}>forever</Radio.Button>
              <Radio.Button value={1}>a day</Radio.Button>
              <Radio.Button value={7}>a week</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
              <Button type='danger' htmlType='button' onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Row>
    </>
  )
}

export default InputBox
