import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
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
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item key='list' icon={<UnorderedListOutlined />}>
          <Link to='/all'>List</Link>
        </Menu.Item>
        <Menu.Item key='about' icon={<QuestionCircleOutlined />}>
          <Link to='/about'>About</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default Navbar
