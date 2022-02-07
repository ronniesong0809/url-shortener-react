import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
        <Router>
          <Routes>
            <Route path='/' element={<InputBox />} />
            <Route path='/all' element={<RecordList />} />
          </Routes>
        </Router>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default App
