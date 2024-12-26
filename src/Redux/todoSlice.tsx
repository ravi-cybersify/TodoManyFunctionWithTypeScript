import {createSlice, PayloadAction}  from '@reduxjs/toolkit'

interface TodoPros{
    id: number,
    todo: string,
    completed: boolean,
    isEditing: boolean
}

interface Todo{
    Todos: TodoPros[]
}

const todosData = localStorage.getItem("todos");
const TodoData: TodoPros[] = todosData ? JSON.parse(todosData) : [];


const initialState:Todo = {
    Todos: TodoData || []
}

const todoSlice = createSlice({
    name:'Todos',
    initialState,
    reducers:{
        add(state, action:PayloadAction<TodoPros>){
            if (Array.isArray(state.Todos)) { // Ensure Todos is an array
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
            
        },

        remove(state, action:PayloadAction<number>){
            state.Todos = state.Todos?.filter((item)=> item.id !== action.payload);
            localStorage.setItem('todos', JSON.stringify(state.Todos));
        }

    }
})

export const {add,completed,toggleEditTodo,editTodo, remove} = todoSlice.actions;
export default todoSlice.reducer;