import { useState,useEffect } from "react" 
import useTimeAgo from "../../hooks/useTimeAgo"
import Link from "next/link"

export default function Devit({src,message,username,createdAt,imgUrl,id}) {
    const timeago = useTimeAgo(createdAt)

    return (
        <>   
            <section >
        <Link href={`/status/[id]`} as={`/status/${id}`}>
                <main className="flex z-0">
                <header className="w-1/5 relative">
                    <img src={src} alt="Perfil" className="z-10 cursor-pointer"/>
                    <p></p>
                </header>
                <div className="flex-col w-4/5">
                    
                    <div className="flex">
                    <Link href={`https://www.youtube.com/`}>
                        <h1 className="font-bold text-lg z-10 cursor-pointer">{username}</h1>
                    </Link>
                        <span className="ml-1"> · </span>
                        <p className="ml-1">{timeago}</p>
                            
                          
                    </div>
                    <footer>
                    <p className="">{message}</p>
                    {imgUrl && <img className="img-devit z-10 cursor-pointer" src={imgUrl}/>}
                    </footer>
                </div>
                </main>
            </Link>
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