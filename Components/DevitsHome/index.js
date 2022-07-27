import { useState,useEffect } from "react" 
import useTimeAgo from "../../hooks/useTimeAgo"
import Link from "next/link"
import Like from "../Icons/Like"
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
            <section >
        <Link href={`/status/[id]`} as={`/status/${id}`}>
            <div>
                <main className="flex z-0">
                        <header className="">
                            <img src={src} alt="Perfil" className="z-10 cursor-pointer"/>
                            <p></p>
                        </header>

                        <div className="agorasi">
                            
                            <div className="flex">
                            <Link href={`/status/[id]`} as={`/status/${id}`}>
                                <h1 className="font-bold text-lg z-10 cursor-pointer">{username}</h1>
                            </Link>
                                <span className="ml-1"> · </span>
                                <p className="ml-1">{timeago}</p>
                                    
                                
                            </div>
                            <footer>
                            <p className="break-words w-4/5">{message}</p>
                            {imgUrl && <img className="img-devit z-10 cursor-pointer" src={imgUrl}/>}
                            </footer>
                            
                        </div>
                        
                </main>
                <div className="padre">
                        <div className="deco">
                            
                        </div>

                        <div className="interact">
                        <button disabled={charging} className={charging?"select-none flex opacity-50":"select-none flex cursor-pointer"} onClick={handleLike}><span className="mr-1 relative top-1 ">{likes === 0?"":likes}</span><Like width="28" height="28" stroke="#888" fill={lk?"true":"none"}/></button>
                        <Like width="28" height="28" stroke="#888" />
                        <Like width="28" height="28" stroke="#888"/>
                        </div>
                </div>
                </div>
            </Link>
            </section>

            <style jsx>{`
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
                    width:80%;
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
                `}</style>
        </>
    )
}