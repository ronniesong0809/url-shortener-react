import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import InputBox from './Components/InputBox'
import RecordList from './Components/RecordList'
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Navbar />
        </Header>
        <Content style={{ margin: '50pt' }}>
          <Routes>
            <Route path='/' element={<InputBox />} />
            <Route path='/all' element={<RecordList />} />
          </Routes>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Router>
  )
}

export default App
