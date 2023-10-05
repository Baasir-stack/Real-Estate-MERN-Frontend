import React from 'react'
import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'
import Companies from '../../components/Companies/Companies'
import Residencies from '../../components/Residencies/Residencies'
import Value from '../../components/Value/Value'
import Contact from '../../components/Contact/Contact'
import Footer from '../../components/Footer/Footer'
import GetStarted from "../../components/GetStarted/GetStarted";


const Home = () => {
  return (
    <div >
        
        <div >
        <div className="w-blur" />
         <Hero />
        </div>
        
        <div className='wrapper'>

        <Companies/>
        <Residencies/>
        <Value/>
        <Contact/>
        <GetStarted/>
        </div>
    </div>
  )
}

export default Home