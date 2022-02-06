import React from 'react'
import { Row, Input, message, Form, Space, Button } from 'antd'
import { postLongUrl } from '../Apis/postLongUrl'

function InputBox() {
  const [form] = Form.useForm()

  const onFinish = (data) => {
    postLongUrl(data.url).then((response) => {
      if (response.status !== 200) {
        message.error(`${response.data.err}`)
      }
      message.success(`Submit success! ${response.data.message}`)
    })
  }

  const onFinishFailed = () => {
    message.error('Submit failed!')
  }

  const onReset = () => {
    form.setFieldsValue({
      url: ''
    })
  }

  return (
    <>
      <Row
        type='flex'
        justify='center'
        align='middle'
        style={{ minHeight: '80vh' }}
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
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
            <Input placeholder='www.google.com' />
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
