const { initializeApp } = require('firebase-admin/app');

import {getFirestore} from "firebase-admin/firestore";

initializeApp({
  credential: {
    "type": "service_account",
    "project_id": "devter-4d602",
    "private_key_id": "351f97973057136752efd3f4c2af36ed0da06783",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDZROM7BlxLqU7\nEGpN1aBI/mKToOnsKDRrPBMCBG732eLQuyAkcvEh96Frad5U/hcUi+bF6Ihfmg+X\nM5BSe1Qh7Gf24kRcBVgU4Kc5oi7TXq5RoSpGTuI6BrMrW3jkbzXx4OlpfO3wGiur\nFTpVq3631WecAceojFPtNfTvo+PIx11FDu/hv6VbYFCA9/agx1Ilq9VtBUZzXzwZ\nIFsj43aflS0xO1XLSSgh9c5lp5yWjmEz+ST7SmM5uyB5PiXr21f/eTHe4OUliN6t\nAzo6q4Xr9QO2Ixs+cfUmQK0coXAN8GFOsHpuk9T/CxfIPGB6MkipP7/0j4UkmJ9r\n3awn8uiZAgMBAAECggEAFQNhvt4FPm7NxjRVulknC7KP12COx57rRD0JrkXbyTvd\ncKUvJ7xUwlpnOa4BAxLwWH1TLCV9xQpEcvZQpw4sVhmedKaQw3SvrE8crM4MSx77\nkDvM2BLTsXnW+uqzbZ2oJ4MQlw+gZxnpaFS4GU6AKjUBF335gt7Uh8YtuTfe31Ch\nCajUJoYzd1XpF4OgXcbyrhpkKKzkuvjT4hbX5ZFI2weDAVOOJjYK7aIrB2hgFCXb\nW3heAGCQRnwGHxGy7FNTk4Csp4lCiHAY3GLaXsLu1cQLUEwagtLrLO1aTOPrKWYF\nfEJRsg0StOpQLswbArfWCC2JjzHB1ZlfzkDOKSJ+gQKBgQD5qePGjgverRZqIsgc\n18o08hs3YsEtzL1X4lQuyTZK6lIpCyYVVpkvMJGswIYeiMV90rXFTpeXReb3z44E\nHy2xpRnBEnie+81MACwIZVF7GVhlj1/7/X6mX8DQMiIh7ACGh46hlOagW4Rqy+S3\nDZIdiM2obwygJSLQ1W36Ag6GjQKBgQDIWpegfOEIu1CRUmRzKOeYOTE5rdLdYLEL\nC7FeLG52hU2MZlptuNI4J9W5RR27yGlOQ8eInoMeOIovO9sQuiUU0MZMwlAUs/Pl\n6JChEQSzCuEnumW+h6eKDx///pym20iFji+UHW0a/uBHiIlI/q7180a7htf/LGIk\nUmstSHJ9PQKBgQCU3i6JaI2/W2owI0k7mZhi9bIw1lvmGV0VmEkmFKihBxOykYlF\n0/tHXiie37WZY2iPXCMy4WgWtYHBZiuCXaz7bjzrGT5/XhnOJZQb9X4ebsB83n8X\nXNI2FoZ8Hkin/XdawF3WD1ltaOSOYcGhPSBRKA+pTX4zx7D44SrQloVeyQKBgQCc\nd0tE1WG0vPxNkUfLO52qHrgXsG0l3/ZDhw0sW4yk2LPYOrLST200178sIhL3bKr4\nqSwxwIDrYAJiot8Q8B43ZFgI6BM8J9EIspgIgU7nOE7gBMyigDRSOD+oX0IdeNDp\nJEJ57IUhePzUQIfeTq96elO57bPPnuzCKu9yfMqUjQKBgBtYhKdyJfzOdBKHUEtb\n13VDimOhA7wyMTDYzve8qkPS8L8VxFr5E0R9W2RGr6vI2Jc1XENWlTmfY+XPXruy\nF2CXx4iCbwWz+ARr0TDS4t6HpaS4moi1R5O6EImwLqKoahmpzrjUhtUA+0mK2ate\ninUoU81G0wfj9qLDx2e44H/x\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-7b3a7@devter-4d602.iam.gserviceaccount.com",
    "client_id": "101425215767739741381",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7b3a7%40devter-4d602.iam.gserviceaccount.com"
  }
});

const db = getFirestore()

const a = async () =>{

  const querySnapshot = await db.collection("devit").get()
  console.log(querySnapshot)
}
a()


export default function asd (){
  console.log("first")
}