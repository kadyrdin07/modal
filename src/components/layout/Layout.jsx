import Header from './header/Header'
import Footer from './footer/Footer'
import   { Routes } from 'react-router-dom'
import   { Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import About from '../pages/About'
import Contact from '../pages/Contact'
const Layout = () => {
  return (
    <div >
    <Header />
    <main>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/About' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
      </Routes>
    </main>
    <Footer />
    </div>
  )
}

export default Layout