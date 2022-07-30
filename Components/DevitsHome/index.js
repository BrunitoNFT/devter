import { useState,useEffect } from "react" 
import useTimeAgo from "../../hooks/useTimeAgo"
import useNumberBeauty from "../../hooks/useNumberBeauty.js"

import Link from "next/link"
import Like from "../Icons/Like"
import {editLikes,checkLikes} from "../../firebase/client.js"
import useUser from "../../hooks/useUser"

import Reuse from "../../Components/Icons/Reuse.js"
import Coment from "../../Components/Icons/Coment.js"
import Share from "../../Components/Icons/Share.js"

import { faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Devit({src,message,likes,username,createdAt,imgUrl,id}) {
    const timeago = useTimeAgo(createdAt)
    const lkk = useNumberBeauty(likes)

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
            <section >
        <Link href={`/status/[id]`} as={`/status/${id}`}>
            <div className="contenedor-link">
                        <main className="flex z-0">
                                <header>
                                    <Link href={"/home"}>
                                        <img src={src} alt="Perfil" className=""/>
                                    </Link>
                                </header>

                                <div className="agorasi">
                                    
                                    <div className="user">
                                        <Link href={"/home"}>
                                            <h1 className="">{username}</h1>
                                        </Link>
                                        
                                        <span className="ml-1"> · </span>

                                        <p className="ml-1">{timeago}</p>
                                    </div>
                                    <footer>
                                    <p className="contenido">{message}</p>
                                    {imgUrl && <img className="img-devit z-10 cursor-pointer" src={imgUrl}/>}
                                    </footer>
                                    
                                </div>
                                
                        </main>
                        <div className="padre">
                                <div className="deco">
                                    
                                </div>

                                <div className="interact">
                                    <div disabled={charging} className={charging?"dis all":"act all"} onClick={handleLike}>
                                        <span className="">{likes === 0?"":lkk}</span>
                                        <Link href="/home">
                                        <a className="">
                                            <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><path d="m7.24264069 2.24264069c.5-2.5 4.34314571-2.65685425 6.00000001-1 1.6034073 1.60340734 1.4999617 4.3343931 0 6l-6.00000001 6.00000001-6-6.00000001c-1.65685425-1.65685425-1.65685425-4.34314575 0-6 1.54996042-1.54996043 5.5-1.5 6 1z" fill={lk?"true":"none"} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3.257 4.257)"/></svg>
                                        </a>
                                        </Link>
                                    </div>
                                    <Link href="/home"><a><Reuse width="18" height="18" stroke="#000" fill="none"/></a></Link>
                                    <Link href="/home"><a><svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><path d="m8 13.5172414c4.418278 0 8-3.2845583 8-7.0172414 0-3.73268314-3.581722-6.5-8-6.5s-8 3.02593755-8 6.75862069c0 1.45741942.5460328 2.80709561 1.47469581 3.91098161l-.97469581 4.5803977 3.91607376-2.4472652c1.07810761.4571647 2.29544433.7145066 3.58392624.7145066z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 3)"/></svg></a></Link>
                                    <Link href="/home"><a><Share width="18" height="18" stroke="#000" fill="none"/></a></Link>
                                </div>
                        </div>
                </div>
            </Link>
            </section>

            <style jsx>{`
                .contenedor-link{
                    z-index:1;
                }
                .user{
                    display:flex;
                    font-weight:bold;
                    font-size:18px;
                    cursor:pointer;
                    z-index:10;
                    align-items:center;
                }
                .user span{
                    font-weight:normal;
                    font-size:15px;
                }
                .user p{
                    font-weight:normal;
                    font-size:15px;
                }
                .contenido{
                    word-wrap: break-word;
                    width:80%;
                }
                .padre{
                    width:100%;
                    display:flex;
                    flex-direction:column;
                    justify-content:center;
                    align-items:center;
                }
                .agorasi{
                    width:80%;
                    display:flex;
                    flex-direction:column;
                }
                header{
                    display:flex;
                    position:relative;
                    flex-direction:column;
                    align-items:center;
                    width:20%;
                    z-index:500;
                    cursor:pointer;
                    
                }
                section{
                    padding:15px 10px;
                    border-bottom:2px solid #eee;
                    z-index:1;
                }
                section:hover{
                    background-color:#eee;
                }
                img{
                    width: 50px;
                    height: 50px;
                    border-radius:100vw;
                    border:2px solid #0099ff;
                }
                
                .img-devit{
                    margin-top:15px;
                    width:100%;
                    height:auto;
                   
                    border-radius:1vw;
                    border:none;
                }
                .deco{
                    width:55%;
                    border:0.5px solid #ccc;
                    margin-top:15px;
                    margin-bottom:10px;
                }
                .interact{
                    width:100%;
                    display:flex;
                    justify-content:space-around;
                    align-items:center;
                }
                .all span{
                    font-size:15px;
                    font-weight:bold;

                }
                .all a{
                    display:;
                }
                .all{

                    display:flex;
                    flex-wrap:wrap;
                    justify-content: center;
                    align-items:center;
                }
                .act{
                    cursor:pointer;
                }
                .dis{
                    user-select:none;
                    opacity:.5;
                }
                `}</style>
        </>
    )
}