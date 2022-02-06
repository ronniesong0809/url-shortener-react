import React from 'react'
import { Menu } from 'antd'
import {
  HomeOutlined,
  UnorderedListOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons'

class Navbar extends React.Component {
  state = {
    current: 'home'
  }

  handleClick = (e) => {
    console.log('click ', e)
    this.setState({ current: e.key })
  }

  render() {
    const { current } = this.state
    return (
      <Menu
        theme='dark'
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode='horizontal'
      >
        <Menu.Item key='home' icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key='list' icon={<UnorderedListOutlined />}>
          List
        </Menu.Item>
        <Menu.Item key='about' icon={<QuestionCircleOutlined />}>
          About
        </Menu.Item>
      </Menu>
    )
  }
}

export default Navbar
