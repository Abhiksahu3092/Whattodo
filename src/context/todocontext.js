import { createContext,useContext } from "react"

export const Todocontext=createContext({
    todos:[
        {
            id:1,
            title:"New job",
            completed:false
        }
    ],
    addtodo:(todo)=>{},
    edittodo:(id,todo)=>{},
    deletetodo:(id)=>{},
    toggletodo:(id)=>{}
})

//to use the components of the todocontext
export const usetodo=()=>{
    return useContext(Todocontext)
}

//this is made for wraping the contents of the app
export const Todoprovider=Todocontext.Provider