import { useState,useEffect } from "react" 
import useTimeAgo from "../../hooks/useTimeAgo"
import Link from "next/link"
import Like from "../../Components/Icons/Like"

import {editLikes,checkLikes} from "../../firebase/client.js"
import useUser from "../../hooks/useUser"


export default function Devit({src,message,likes,username,createdAt,imgUrl,id}) {
    const timeago = useTimeAgo(createdAt)
    const user = useUser()
    const [lk,setLk] = useState(null)
    const [charging,setCharging] = useState(false)
    const [likesArray,setLikesArray] = useState([false])

    useEffect(() => {
        if (user) {
            checkLikes({id,setLk,uid:user.uid})
        }
    },[user])
    const handleLike = () => {
        setCharging(true)
        editLikes({id,lk,setLk,uid:user.uid,likes,setCharging})
    }

    return (
        <>   
            <section className="flex-col">
                
                <header>
                    <img src={src} alt="Perfil"/>
                    
                </header>
                <div className="div-cont w-4/5">
                    
                    <div className="flex mt-10 mb-3">
                        <h1 className="font-bold text-lg">{username}</h1>
                        <span className="ml-1"> · </span>
                        <Link href={`/status/[id]`} as={`/status/${id}`}>
                            
                                <p className="ml-1">{timeago}</p>
                            
                          </Link>
                    </div>
                    <footer className="">
                        <h3 className="asd">{message}</h3>
                        {imgUrl && <img className="img-devit" src={imgUrl}/>}
                    </footer>
                    <div className="deco">

                    </div>
                    <div className="interact">
                        <button disabled={charging} className={charging?"select-none flex opacity-50":"select-none flex cursor-pointer"} onClick={handleLike}><span className="mr-1 relative top-1 ">{likes}</span><Like width="28" height="28" stroke="#888" fill={lk?"true":"none"}/></button>
                        <Like width="28" height="28" stroke="#888" />
                        <Like width="28" height="28" stroke="#888"/>
                    </div>
                </div>
            </section>

            <style jsx>{`
                
                header{
                    position:relative;
                    width:100%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    margin-top:1rem;
                }

                section{
                    padding:15px 10px;
                    border-bottom:2px solid #eee;
                }
                img{
                    width: 100px;
                    height: 100px;
                    border-radius:1vw;
                    border:2px solid black;
                }
                
                .img-devit{
                    margin-top:15px;
                    width:200px;
                    height:auto;
                   
                    border-radius:1vw;
                    border:none;
                }
                .div-cont{
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    text-align:center;
                    width:100%;
                }
                footer{
                    width:100%;
                    height:100%;
                    display:flex;
                    flex-direction:column;
                    justify-content: center;
                    align-items:center;
                    text-align:center;
                }
                .asd{

                    width: 100%;
                    padding: 2px 5px;
                    word-wrap: break-word;
                }
                .deco{
                    width:80%;
                    border:0.5px solid #ccc;
                    margin-top:15px;
                    margin-bottom:15px;
                }
                .interact{
                    width:100%;
                    display:flex;
                    justify-content:space-around;
                }
                `}</style>
        </>
    )
}
