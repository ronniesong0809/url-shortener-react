import Navbar from './Components/Navbar'
import InputBox from './Components/InputBox'
import RecordList from './Components/RecordList'
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
        <RecordList />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default App
