import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import styles from '../styles/Home.module.css'
import {colors} from "../styles/theme"
import Button from '../Components/Button/index.js'
import { useState,useEffect } from 'react'
import Avatar from "../Components/Avatar/index"
import Loading from "../Components/Charging/index"


import { useRouter } from 'next/router'

import {
  gitSignUp
  } from "../firebase/client"

import useUser,{userStates} from "../hooks/useUser"

export default function Home() {

  const Router = useRouter()
  const user = useUser()

  
  useEffect(() => {
    user && Router.replace("/home")
  }, [user])
  

  const handleClick =   ()  => {
    gitSignUp().catch((err) => {
      console.log(err)
    })
    
    }


    return (
    <>
      <Head>
        <title>Devter</title>
        <link rel="icon" href="/icon-devter.ico" />
      </Head>

        <div className='font-black text-xl w-full h-full bg-gray-300 rounded-sm'>
            <Image layout="fixed" src="/devter-logo.png" width={150} height={150} alt="Logo"/>
            <h1 className='text-5xl mt-5'>Devter</h1>
            <p className='mt-5 w-1/2 text-center font-bold mb-10'> Talk about <span className='font-black uppercase text-2xl'> development </span> with <span className='font-black uppercase text-2xl'> developers.</span></p>
            {
            user===userStates.NOT_LOGGED ?
            <Button onClick={handleClick}>Login with GitHub <section className="ml-3"><Image width={25} height={25} alt="Logo de github" src="/github.png"/></section></Button>
            : user === userStates.NOT_KNOWN ? <Loading/>
            : <Avatar
            text={user.screenName}
            src={user.photoUrl}
            width={50}
            height={50}
            />
            }
        </div>


      <style jsx>{`
          div {
              color:${colors.primary};
              display: flex;
              flex-direction:column;
              align-items: center;
              justify-content: center;

          }
          p{
            color:${colors.secondary};
          }
          span{
            color:#1154aa;
          }
          section{
            position:relative;
            top:2px;
          }
          main{
            margin-top:30px;
            width:37%;
            display:flex;
            justify-content:space-around;
          }
          img{
            border-radius:1vw;
            border:2px solid #0099ff;
          }
      `}</style>
    </>
  )
}
