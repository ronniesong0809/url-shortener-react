import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import InputBox from './Components/InputBox'
import RecordList from './Components/RecordList'
import UrlStats from './Components/UrlStats'
import AboutPage from './Components/AboutPage'
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Navbar />
        </Header>
        <Content style={{ padding: '50px' }}>
          <Routes>
            <Route path='/' element={<InputBox />} />
            <Route path='/all' element={<RecordList />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/:shortKey' element={<UrlStats />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          URL Shortener ©2022 Created by Ronnie Song
        </Footer>
      </Layout>
    </Router>
  )
}

export default App
