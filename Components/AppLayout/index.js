
export default function AppLayout ({children}) {
    return (
      <>
                <div>
                <main>
                    {children}
                </main>
                </div>
                <style jsx>{`
                        div {
                            display: grid;
                            height: 100vh;
                            place-items: center;
                        }
                        main {
                            background: #fff;
                            border-radius: 10px;
                            box-shadow: 0 10px 25px rgba(0, 0, 0, .1);
                            height: 100%;
                            width: 100%;
                            overflow:hidden;
                            position:relative;
                        }
                        @media (min-width: ${breakpoint.phone}) {
                            main {
                            height: 90vh;
                            width: ${breakpoint.phone};
                            box-shadow: 0 0 15px -1px;
                            }
                        }`}</style>
                <style jsx global>{`
                            body,textarea {
                                background-image:
                                radial-gradient(black 1px, #fdfdfd 1px),
                                radial-gradient(gray 1px, #fdfdfd 1px);
                                background-position: 0 0, 25px 25px;
                                background-size: 50px 50px;
                                padding: 0;
                                margin: 0;
                                font-family: ${fonts.base};
                            }
                            * {
                                box-sizing: border-box;
                            
                            }
                            ::-webkit-scrollbar {
                                                    display: none;
                                                }
                            `}</style>
      </>
    )
  }