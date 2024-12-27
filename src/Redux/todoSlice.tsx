import {createSlice, PayloadAction}  from '@reduxjs/toolkit'

export interface TodoPros{
    id: number,
    todo: string,
    completed: boolean,
    isEditing: boolean,
    isImportant: boolean,
    date: string
}

interface Todo{
    Todos: TodoPros[],
    DeleteTodos : TodoPros[]
}


const todosData = localStorage.getItem("todos");
const TodoData: TodoPros[] = todosData ? JSON.parse(todosData) : [];

const delData = localStorage.getItem("deletodos");
const DeleteData: TodoPros[] = delData ? JSON.parse(delData) : [];

const initialState:Todo = {
    Todos: TodoData || [],
    DeleteTodos: DeleteData || []
}

const todoSlice = createSlice({
    name:'Todos',
    initialState,
    reducers:{
        add(state, action:PayloadAction<TodoPros>){
            if (Array.isArray(state.Todos)) { 
                state.Todos.push(action.payload);
                localStorage.setItem('todos', JSON.stringify(state.Todos));
            } else {
                console.error("state.Todos is not an array:", state.Todos);
            }
        },

        completed(state, action:PayloadAction<number>){
            state.Todos = state.Todos?.map((item)=> item.id === action.payload ? {...item, completed:!item.completed} : item)
            localStorage.setItem('todos', JSON.stringify(state.Todos));
        },

        toggleEditTodo(state, action:PayloadAction<number>){
            state.Todos = state.Todos?.map((item)=> item.id === action.payload ? {...item, isEditing:!item.isEditing} : item)
            localStorage.setItem('todos', JSON.stringify(state.Todos));
        },
        editTodo(state,action){
           const {id , newText} = action.payload;
            state.Todos = state.Todos?.map((item)=> item.id === id ? {...item, todo:newText, isEditing:!item.isEditing} : item)
            localStorage.setItem('todos', JSON.stringify(state.Todos));
        },
        ImportantTodo(state,action:PayloadAction<number>){
             state.Todos = state.Todos?.map((item)=> item.id === action.payload ? {...item , isImportant: !item.isImportant} : item) ;
             localStorage.setItem('todos', JSON.stringify(state.Todos));
        },

        remove(state, action:PayloadAction<number>){
            const DelData:any = state.Todos?.filter((item)=> item.id === action.payload)
            // console.log("dddd",DelData)
            state.DeleteTodos?.push(DelData);
            localStorage.setItem('deletodos', JSON.stringify(state.DeleteTodos));
            state.Todos = state.Todos?.filter((item)=> item.id !== action.payload);
            localStorage.setItem('todos', JSON.stringify(state.Todos));
        }

    }
})

export const {add,completed,toggleEditTodo,editTodo,ImportantTodo, remove} = todoSlice.actions;
export default todoSlice.reducer;