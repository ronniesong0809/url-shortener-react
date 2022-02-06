import Navbar from './Components/Navbar'
import InputBox from './Components/InputBox'
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout

function App() {
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content>
        <InputBox />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default App
