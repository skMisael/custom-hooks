import { useEffect, useReducer,useState } from "react"
import { todoReducer } from "./todoReducer";


const initialState = [];

const init = () => {
  return JSON.parse( localStorage.getItem('todos') ) || [];
}


export const useTodo = () => {

        const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init);

        const [pag, setPag] = useState({ini:0,fin:5});

        useEffect(() => {
            const strn = JSON.stringify(todos);
            localStorage.setItem('todos',strn);   
                  
        }, [todos])

        useEffect(() => {
            filterData();
        }, []);
        

        const onNewTodo = (todo) => {
            const action ={
                type: 'Add Todo',
                payload: todo
            }
            dispatchTodo(action);
        }

        const onDeleteTodo = (id) => {
            const action ={
                type: 'Remove Todo',
                payload: id,
            }
            dispatchTodo(action);
        }
        
        const onToggleTodo =(id) => {
            const action ={
            type: 'Toggle Todo',
            payload: id,
            }
            dispatchTodo(action);
        }


        const next = () => {
            if((todos.length)<=pag.fin)return;
            const ini = pag.fin;
            const fin = pag.fin+5;
            setPag({ini,fin});
        }

        const back = () => {
            if(pag.ini==0)return;
            const fin = pag.fin-5;
            const ini = (fin-5);            
            setPag({ini,fin});
        }
        const onepag = (initial)=>{
            const ini = (initial);  
            const fin = ini+5;          
            setPag({ini,fin});
        }

        const  filterData = () =>{
            
            todos.sort(function(a,b){
                if (a.description.toLowerCase() <b.description.toLowerCase() ) {
                return -1;
                }
                if (a.description.toLowerCase() >b.description.toLowerCase() ) {
                return 1;
                }
                return 0;
            }); 
            // console.log(todos);
            const arraytodos=todos.slice(pag.ini,pag.fin);
             
            return arraytodos;       
        }
      

        
        

      

    return {
        todos,
        onNewTodo,
        onDeleteTodo,
        onToggleTodo,
        todosCount:todos.length,
        filterData,
        next,
        back,
        onepag,
        pendingTodosCount:todos.filter( todo => !todo.done).length,
    };
}
