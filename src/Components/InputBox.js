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
  Typography,
  Result
} from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { postLongUrl } from '../Apis/postLongUrl'
const { Paragraph } = Typography

function InputBox() {
  const [form] = Form.useForm()
  const [shorten, setShorten] = useState([])
  const [formData, setFormData] = useState([])
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
    setFormData(data)
    postLongUrl(data)
      .catch(function (err) {
        message.error(err.message, 10)
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          if (response.data) {
            setShorten(response.data)
            showDrawer()
            message.success(`Submit success! ${response.data.message}`)
          } else {
            message.error(`${response.data.message || response.data.err}`)
          }
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
        placement='bottom'
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Typography>
          {shorten && (
            <>
              <Result
                status={shorten.message ? 'info' : 'success'}
                title={
                  shorten.message
                    ? shorten.message
                    : 'Successfully Generated Short URL!'
                }
                subTitle={formData.url}
                extra={[
                  <Paragraph key='copy' copyable>
                    {shorten.url}
                  </Paragraph>,
                  <Button
                    key='visit'
                    icon={<SendOutlined />}
                    className='App-link'
                    href={shorten.url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Visit URL
                  </Button>
                ]}
                style={{ padding: '20px' }}
              />
            </>
          )}
        </Typography>
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
              <Radio value={0}>forever</Radio>
              <Radio value={1}>a day</Radio>
              <Radio value={7}>a week</Radio>
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
