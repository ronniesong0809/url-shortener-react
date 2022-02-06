import Home from './Components/Home'
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout

function App() {
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default App
