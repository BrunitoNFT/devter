import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GithubAuthProvider,
          getAuth,
          signInWithPopup,
          onAuthStateChanged
} from "firebase/auth"

import {
   getFirestore, 
  collection, 
  addDoc,  
  Firestore,
  Timestamp,
  onSnapshot,
  orderBy,
  query,
  getDoc,
  doc,
  updateDoc,
  setDoc
} from "firebase/firestore";

export const generateID = () => {
  console.log("GENERATE ID")
  const id = Math.random().toString(36).slice(3) +  Math.random().toString(36).slice(3)
  return id
}

const y = process.env.NEXT_PUBLIC_API_KEY

const firebaseConfig = {
  apiKey: y,
  authDomain: "devter-4d602.firebaseapp.com",
  projectId: "devter-4d602",
  storageBucket: "devter-4d602.appspot.com",
  messagingSenderId: "819625156773",
  appId: "1:819625156773:web:67f8e2665b74de70922d4c",
  measurementId: "G-L7P8V7K0LJ"
}

const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */
 
//
// AUTH USER INIT
const githubProvider = new GithubAuthProvider();
const auth = getAuth()

export const onAuthStateChangedd = setUser => {
onAuthStateChanged(auth, (user) => {
  if (user) {
     const {email,screenName,photoUrl,localId}= user.reloadUserInfo
     setUser({email,screenName,photoUrl,uid:localId}) 

  } else {
    setUser(null)
  }
});
}



export const gitSignUp = async  () => {
  console.log("getSignUp")
  const back = await signInWithPopup(auth,githubProvider)
  const {email,screenName,photoUrl,localId} = back._tokenResponse
  const ke = {email,screenName,photoUrl,uid:localId}
  const ref = doc(db, 'devters', localId);
  setDoc(ref,{email,screenName,devitsArray:[],photoUrl,uid:localId,likesArray:[],date:Timestamp.fromDate(new Date()).seconds}).catch((first) => {
    console.log(first)
  })
  return ke
}
// AUTH USER FINISH
//

//
// FIREBASE INIT
const db = getFirestore(app);

export const addDevit = ({avatar,content,userId,userName,createdAt,likedCount,sharedCount,imgUrl}) => {
  const id = generateID()
  console.log(id)
  var devits = []
  const docRef = doc(db,"devters",userId)
  getDoc(docRef).then((d) => {
    console.log(d.data())
    devits = d.data().devitsArray
    devits.push(id)
    updateDoc(doc(db,"devters",userId),{devitsArray:devits})
  })
  return setDoc(doc(db,"devit",id),{avatar,content,userId,userName,createdAt,likedCount,sharedCount,imgUrl,devitID:id})
}

export const queryOneDevit = (id,setTw) => {
  const docRef = doc(db,"devit",id)
  onSnapshot(docRef, doc=>{
    setTw( doc.data())
  })
}

const q = query(collection(db,"devit"),orderBy("createdAt", "desc"))


export const onGetTasks = (setTimeline) => {
  onSnapshot(q,(querySnapshot) => {
    let array = [ ]
    querySnapshot.forEach(element => {
        const id = element.id
      const dev = element.data()
      const {createdAt} = dev
      const obj = {
        dev:dev,
        id:id
      }
      array.push(obj)
    })
    console.log(array)
    setTimeline(array)
})

}
export const checkLikes = ({id,setLk,uid}) =>{
  let a = true
  const docRef = doc(db,"devters",uid)
  getDoc(docRef).then((d) => {
    console.log(d.data())
    const likeC = d.data().likesArray
    console.log(likeC)
    if (likeC === undefined) {
      setLk(false)
        return
    }else{
      likeC.map((devitLikedID) => {
        if (devitLikedID == id) {
          console.log("setLk(true)")
          setLk(true)
          a = false
        }
      })
      console.log("setLk(false)")
      if (a) {
        setLk(false)
      }
      return
    }
  })

  
}


export const editLikes = async ({id,lk,setLk,uid,likes,setCharging}) => {
  if (!lk) {
    console.log("sumar")
    likes = Number(likes) + 1
    updateDoc(doc(db,"devit",id),{likedCount:likes})
     .then(() => {
      const docRef = doc(db,"devters",uid)
      getDoc(docRef).then((d) => {
      let likeC = d.data()
      likeC = likeC.likesArray
      
      console.log("id: ",id)
      likeC.push(id)
      console.log("likeC: ",likeC)
      updateDoc(doc(db,"devters",uid),{likesArray:likeC})
                        }) 
    })
    .then(() => {
      setLk(true)
      setTimeout(() => {
        setCharging(false)
      },5000)
    })
  }else{
    console.log("restar")
    likes = Number(likes) - 1
    updateDoc(doc(db,"devit",id),{likedCount:likes})
    
    .then(() => {
      const docRef = doc(db,"devters",uid)
      getDoc(docRef).then((d) => {
      let likeC = d.data().likesArray
      const arr = likeC.filter((e) => {
        if (e!==id) {
          return e
        }
      })
      console.log("ARR: ",arr)
      if (arr === undefined) {
        updateDoc(doc(db,"devters",uid),{likesArray:[]})
      }else{
        updateDoc(doc(db,"devters",uid),{likesArray:arr})
      }
      
                        })
    }) 
    
    .then(() => {
      setLk(false)
      setTimeout(() => {
        setCharging(false)
      },5000)
    })
    
  }
}

//FIREBASE FINISH



// Storage INIT

/* import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();

export const uploadImage = file => {
  const storageRef = ref(storage, `images/${file.name}`);
  const task = uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  })
} */

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage();

// Upload file and metadata to the object 'images/mountains.jpg'
export const uploadImage = (file,setImgURL) => {
  

const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        return "User doesn't have permission to access the object"
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setImgURL(downloadURL)
    });
  }

);
}
// Storage Finish