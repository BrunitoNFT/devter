import {Timestamp} from "firebase/firestore"
import { useState,useEffect } from "react"

const DATE_UNITS = [ 
    ["day", 86400 ],
    ["hour",3600],
    ["minute",60],
    ["second",1],

]

const getDateDiffs = (timestamp) => {

    const dif =   timestamp - (Timestamp.fromDate(new Date()).seconds) 
  
    for (const [unit, secondsInUnit] of DATE_UNITS) {
      if (Math.abs(dif) > secondsInUnit || unit === "second") {
        const value = Math.round(dif / secondsInUnit)
        return { value, unit }
      }
    }
  }

export default function useTimeAgo (da) {
    const [TimeAgo,setTimeAgo ] = useState(
        getDateDiffs(da)
     )


    useEffect(() => {
        setInterval(() => {
          const newTimeAgo = getDateDiffs(da)
          setTimeAgo(newTimeAgo)
        }, 5000)
    
        
      }, [da])

      const rtf = new Intl.RelativeTimeFormat("es",{style:"short"})

      const { value, unit } = TimeAgo
    return rtf.format(value,unit)

  }