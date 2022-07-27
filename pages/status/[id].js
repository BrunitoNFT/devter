import {queryOneDevit} from "../../firebase/client"

import Devit from "../../Components/DevitsPlus/index.js"
import {useState,useEffect} from "react"

import {useRouter} from "next/router"
import Head from "next/head"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRotateBack, faBackspace, faBackward, faCoffee } from '@fortawesome/free-solid-svg-icons'

import Avatar from "../../Components/Avatar/index.js"

import useUser from "../../hooks/useUser"



export default function DevitPage(){
    const [tw,setTw] = useState(null)
    const [id,setId] = useState(null)
    const router = useRouter()
    const user = useUser()
    

        /* while (router.query.id === undefined){
            console.log("first")
        } */
        useEffect(() => {
          
          setId(router.query.id)
        }, [user])
        
        

    id && queryOneDevit(id,setTw)

    const handleVolver = () =>{
        router.replace("/home")
      }
    

    
    
    
    
    
    return(
        <>
            <Head>
            <link rel="icon" href="/icon-devter.ico" />

              <title>Devit/ Devter</title>
            </Head>
            <header className="overflow-hidden">
              
              <div className="volver text-black" onClick={handleVolver}>
                <span className='dale'><FontAwesomeIcon icon={faArrowLeft} /></span>
              </div>
                <h1 className="font-black text-xl ml-3 mr-3">Read Devit</h1>
                <footer className='font-bold'>
                  

                      <Avatar src={user && user.photoUrl} width="40" heigth="40"/>
                      <p className='ml-1'>{user && user.screenName}</p>
                 
                </footer>
            </header>
            {tw ?
            <Devit 
                                key={id}
                                id={id}
                                src={tw.avatar}
                                username={tw.userName}
                                message={tw.content}
                                createdAt={tw.createdAt}
                                likes={tw.likedCount}
                                retweets={tw.sharedCount}
                                imgUrl={tw.imgUrl}
                                />
            :""}
            
            <style jsx>{`
        footer{
          border-left:2px solid #eee;
          padding:10px;
          display:flex;
          align-items:center;

        }
        .img-user{
          width:30%;
          height:auto;
          border-radius:10px;
        }
        section{
          padding:10px;
          background-color:white;
          
        }
        form{
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center; 
        }
      
        
        .volver{
          height:100%;
          width:10%;
          display:flex;
          justify-content:center;
          align-items:center;
          border-right:2px solid #eee;
          cursor:pointer;
          transition: all .6s ease-in-out;
        }
        .dale{
          width:15px;
          transition: all .6s ease-in-out;
        }
        .volver:hover{
          background-color:#eee;
        }
        .dale:hover{
          width:20px;
        }
      header{
                    display:flex;
                    width:100%;
                    height:6%;
                    border-bottom:2px solid #eee;
                    align-items:center;
                    background-color:#ffffffaa;
                    backdrop-filter:blur(5px);
                    z-index:10;
                }
        `}</style>
        </>
    )

}