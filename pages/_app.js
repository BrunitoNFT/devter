import AppLayout from "../components/AppLayout/index"
import styles from "../styles/globals.css"

export default function App({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}


