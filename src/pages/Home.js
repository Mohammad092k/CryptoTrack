
import React from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import Navigation from '../components/Navigation'
import { CryptoProvider } from '../context/CryptoContext'
import { StorageProvider } from '../context/StorageContext'
import { TrendProvider } from '../context/TrendingContext'

const Home = () => {
  return (
    <>
    <CryptoProvider>
    <TrendProvider>
    <StorageProvider>
    <main className=' w-full h-full flex flex-col content-center  items-center relative  text-white font-nunito'>
    <div className='bg-gray-300 fixed w-screen h-screen -z-10' />
    <Logo />
    <Navigation />
    
    <Outlet />
    </main>
    </StorageProvider>
    </TrendProvider>
    </CryptoProvider>
    <div className= 'flex items-center flex-row justify-center text-gray-100 top-5 py-5 '>
       <h3 className='font-nunito'>All rights are reserved ® & copyright © 2024 by mk</h3>
    
        </div>
    </>
  )
}

export default Home;