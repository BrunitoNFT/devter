import Avatar from "../../Components/Avatar/index"
import { useRouter } from 'next/router'

import Head from "next/head"
import { useState,useEffect } from "react"
import Devit from "../../Components/DevitsHome"
import useUser from "../../hooks/useUser"

import {onGetTasks} from "../../firebase/client"

import Loading from "../../Components/Charging/index"

import Homee from "../../Components/Icons/Home"
import Create from "../../Components/Icons/Create"
import Search from "../../Components/Icons/Search"
import Reuse from "../../Components/Icons/Reuse"

import Link from "next/link"

export default function Home(){
    const user = useUser()
    const [Timeline, setTimeline] = useState([])
    const Router = useRouter()

    

    const handleMas = () => {
        Router.replace("/devits")
    }
    var cont = 0

    useEffect(() => {
        onGetTasks(setTimeline)
    }, [])
    
    
    return (
        <>     
            <Head>
                <link rel="icon" href="/icon-devter.ico" />
                <title>Devter</title>
            </Head>
                <div className="con">
                        <header>
                            <h1 className="font-black text-xl">Inicio</h1>
                        </header>
                        {user?<section>
                            {Timeline.map((tw) => {
                              return(
                                <Devit 
                                key={tw.id}
                                id={tw.id}
                                src={tw.dev.avatar}
                                username={tw.dev.userName}
                                message={tw.dev.content}
                                createdAt={tw.dev.createdAt}
                                likes={tw.dev.likedCount}
                                retweets={tw.dev.sharedCount}
                                imgUrl={tw.dev.imgUrl}
                                />
                              )
                            }

                            )}
                        </section>:<div className="kk"><Loading/></div>}

                        <nav>
                                
                                    
                                    <Link href="/home"><a><Homee width="28" height="28" stroke="#09f"/></a></Link>
                                    <Link href="/devits"><a><Create width="28" height="28" stroke="#09f"/></a></Link>
                                    <Link href="/"><a><Search width="28" height="28" stroke="#09f"/></a></Link>
                                    <Link href="/"><a><Reuse width="22" height="22" stroke="#09f"/></a></Link>

                                    
                                
                        </nav>

                       {/*  <div className="devitear" onClick={handleMas}>
                                <span className="text-white font-bold text-xl cursor-pointer">+</span>
                        </div> */}
                </div>
            <style jsx>{`
                        .kk{
                            display:flex;
                            justify-content:center;
                            align-items:center;
                            width:100%;
                            height:88%;
                        }
                .con{
                    width:100%;
                    height:100%;
                    position:relative;
                }
                header{
                    display:flex;
                    width:100%;
                    height:50px;
                    border-bottom:2px solid #eee;
                    position:sticky;
                    top:0;
                    align-items:center;
                    background-color:#ffffffaa;
                    backdrop-filter:blur(5px);
                    z-index:10;
                }
                header h1{
                    margin-left:15px;
                }
                
                
                nav{
                    background-color:white;
                    width:100%;
                    height:50px;
                    border-top:2px solid #eee;
                    display:flex;
                    align-items:center;
                    justify-content:space-around;
                    position: absolute;
                    bottom:0;
                    z-index:100;
                }
                nav a:hover{
                   background:radial-gradient(#0099ff22 15%,transparent 16%);
                    background-size:180px 180px;
                    background-position:center;
                }
                section{
                    height:100%;
                    overflow:auto;
                    z-index:0;
                }
                .devitear{
                    width:50px;
                    height:50px;
                    background-color:red;
                    position:sticky;
                    bottom:10%;
                    left:3%;
                    border-radius:100vw;
                    background-color:black;
                    box-shadow:0 0 10px 0px;
                    transition: all .3s ease-in-out;

                }
                .devitear span{
                    width:100%;
                    height:100%;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    position:relative;
                    bottom:8%;
                }
                .devitear:hover{
                    transform:scale(1.1);
                }
                `}</style>
        </>
    )
}