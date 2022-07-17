import { useState,useEffect } from "react";
import {onAuthStateChangedd} from "../firebase/client.js"
import {useRouter} from "next/router.js";

export const userStates = {
    NOT_LOGGED:null,
    NOT_KNOWN:undefined
   }
   
export default function User(){
    const [user, setUser] = useState(undefined)
    const Router = useRouter()
    useEffect( () => { 

        onAuthStateChangedd(setUser)
        
      }, []) 

    useEffect(() => {
      user===userStates.NOT_LOGGED && Router.replace("/")
    }, [user])
    return user
}