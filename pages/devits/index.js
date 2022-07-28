import Head from 'next/head'
import { useEffect, useState } from 'react'
import { faArrowLeft, faArrowRotateBack, faBackspace, faBackward, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'

import Button from "../../Components/Button/index"

import useUser from "../../hooks/useUser"

import { addDevit, 
  uploadImage 
} from '../../firebase/client'

import {
  Timestamp,
  fromDate
} from "firebase/firestore";

const COMPOSE_STATES = {
  USER_NOT_KNOWN:0,
  LOADING:1,
  SUCCES:2,
  ERROR:-1,
}
const DRAG_IMAGE_STATES = {
  ERROR:-1,
  NONE:0,
  DRAG_OVER:1,
  UPLOADING:2,
  COMPLETE:3
}

import Avatar from "../../Components/Avatar/index.js"

export default function ComposeDevit(){
  const [drag,setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task,setTask] = useState(null)
  const [imgUrl,setImgURL] = useState(null)

  const [loadState,setLoadState] = useState(false)

  const [message,setMessage] = useState("")
  const user = useUser()

  const Router = useRouter()
  const handleVolver = () =>{
    Router.replace("/home")
  }
  const handleChange = (e) => {
    const {value} = e.target
    setMessage(value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoadState(true)
    
    addDevit({
      avatar:user.photoUrl,
      content:message,
      userId:user.uid,
      userName:user.screenName,
      createdAt:Timestamp.fromDate(new Date()).seconds,
      likedCount:0,
      sharedCount:0,
      imgUrl:imgUrl,
      userID:user.uid,
      
    }).then(() => {
       Router.push("/home")
    setTimeout(() => {
        setLoadState(false)
      },5000)
    }).catch((err) => {
      console.log(err)
    })
    setMessage("")
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }
  const handleDragleave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)

  }
  const handleDrop =  (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]
    console.log(file)
    uploadImage(file,setImgURL)
  }
  console.log(imgUrl)
  return(
      <>  

          <>
            <Head>
            <link rel="icon" href="/icon-devter.ico" />

              <title>Crear un Devit/ Devter</title>
            </Head>

            <header className="overflow-hidden">
              
                <div className="volver text-black" onClick={handleVolver}>
                  <span className='dale'><FontAwesomeIcon icon={faArrowLeft} /></span>
                </div>

                <div className='devit'>

                <h1 className="font-black text-xl ml-3 mr-3">Add Devit</h1>
                </div>
              
                <footer className='font-bold p-3 '>
                      <div className='w-1/5'>

                      <Avatar src={user && user.photoUrl} width="40" heigth="40"/>
                      </div>
                      <p className='ml-1  w-4/5'>{user && user.screenName}</p>
                 
                </footer>
            </header>

            <section >
                <form onSubmit={handleSubmit}>
                    <textarea 
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragleave}
                    onDrop={handleDrop}
                    value={message} 
                    onChange={handleChange}
                    placeholder="What is happening?">
                    </textarea>
                    

                    {imgUrl && 
                    <div className='w-full  rounded-sm mt-3 flex justify-center'>
                      <div className='relative'>
                        <img className='img-user' src={imgUrl} alt="imagen subida x el usuario"/>
                        <button className='bg-black  w-6 h-6 text-white rounded-xl flex justify-center  absolute left-1 top-1' onClick={() => {setImgURL(null)}}><span className='relative  text-sm text-white' >x</span></button>
                      </div>
                    </div>
                    
                    }
                    
                    <Button
                    disabled={message.length<1 || loadState}
                    >Devitear</Button>
                </form>
            </section>
            
          </>
      <style jsx>{`
        footer{
          width:55%;
          border-left:2px solid #eee;
          padding:10px;
          display:flex;
          align-items:center;
          word-break: break-word;
        }
        footer p {
          overflow:hidden;
        white-space:nowrap;
        text-overflow: ellipsis;
        }
        .devit{
          display:flex;
          justify-content:center;
          align-items:center;
          width:35%;
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
      textarea{
        padding:10px;
        resize:none;
        border:${drag===DRAG_IMAGE_STATES.DRAG_OVER?"3px dashed black":"3px solid black"};
        width:100%;
        height:300px;
        background:white;
        border-radius:10px;
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
