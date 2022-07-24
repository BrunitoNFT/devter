import { useState,useEffect } from "react" 
import useTimeAgo from "../../hooks/useTimeAgo"
import Link from "next/link"

export default function Devit({src,message,username,createdAt,imgUrl,id}) {
    const timeago = useTimeAgo(createdAt)

    return (
        <>   
            <section className="flex">
                
                <header className="w-1/5 relative">
                    <img src={src} alt="Perfil"/>
                    <p></p>
                </header>
                <div className="flex-col w-4/5">
                    
                    <div className="flex">
                        <h1 className="font-bold text-lg">{username}</h1>
                        <span className="ml-1"> · </span>
                        <Link href={`/status/[id]`} as={`/status/${id}`}>
                            
                                <p className="ml-1">{timeago}</p>
                            
                          </Link>
                    </div>
                    <footer>
                    <p className="">{message}</p>
                    {imgUrl && <img className="img-devit" src={imgUrl}/>}
                    </footer>
                </div>
            </section>

            <style jsx>{`
                
                header{
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    
                }
                section{
                    padding:15px 10px;
                    border-bottom:2px solid #eee;
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
                div{
                    margin-top:3px;
                    height:50%;
                }
                .img-devit{
                    margin-top:15px;
                    width:100%;
                    height:auto;
                   
                    border-radius:1vw;
                    border:none;
                }
                `}</style>
        </>
    )
}