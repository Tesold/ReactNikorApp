import React, { Children, createContext, useState } from "react";

export const AuthContext = React.createContext(
    {
        isAuth: false,
        setAuth: (Username:string, Password:string)=>{}
    }
)

export function AuthProvider(children:{ children: Element; key: null; type: undefined; props: undefined; })
{
    const [isAuthState, setAuthState] = useState(
        {
            isAuth: false,
            setAuth: (Username:string, Password:string)=>setAuthState(
                prev=>{
                    return{
                        ...prev,
                        isAuth:(Username==='Tesold'&&Password==='nikor1204')
                    }
                }
            )
        }
    )

    return(
        <AuthContext.Provider value= {isAuthState}>
            {children.children}
        </AuthContext.Provider>
    )
}