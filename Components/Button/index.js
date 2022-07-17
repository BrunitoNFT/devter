export default function button ({children,disabled, onClick}){
    return(
        <>
        
                <button  
                disabled={disabled}
                onClick={onClick} 
                className="mt-5 border-2 border-black">
                        <span className=" text-black text-sm mx-2 font-bold">{children}</span>

                </button>
        <style jsx>{`

            button{
                padding:7px;
                background-color:white;
                border-radius:100vw;
                display:flex;
                justify-content:center;
                align-items:center;
                box-shadow:0 0 15px -5px black;
                transition: all .15s ease-in-out;
                border:0;
                user-select:none;
            }
            button:hover{
                transform:scale(1.1);
                box-shadow:0 0 19px -4px black;
                opacity:.8;

            }
            span{
                display:flex;
                align-items:center;
            }
            button[disabled]{
                pointer-events:none;
                opacity:0.1;
            }

        `}</style>
        </>

    )
}