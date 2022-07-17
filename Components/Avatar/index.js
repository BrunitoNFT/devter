import Image from "next/dist/client/image"
import styles from "./styles.module.css"

export default function Avater({src,alt,text,width,height}){
    return (
        <div className={styles.container}>
            <img src={src} alt={alt} width={width} height={height}/>
            {text && <h1 className='text-black font-bold'>{text}</h1>}
        </div>
    )
}