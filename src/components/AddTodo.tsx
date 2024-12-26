import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { add } from '../Redux/todoSlice.tsx';


const AddTodo:React.FC = () => {
    const dispatch = useDispatch()
    const navigation = useNavigate();
    const [inputVal, setInputVal] = useState<string>('');

    const handleChange = (e: React.FormEvent<HTMLInputElement>):void=>{
        setInputVal(e.currentTarget.value);
    }
    const handleAdd = (e:React.SyntheticEvent)=>{
            e.preventDefault();
            if(inputVal !== ''){
              dispatch(add({id:Date.now(), todo:inputVal, completed:false, isEditing:false}))
                navigation('/');
            }
            setInputVal('');
    }
  return (
    <div className='w-full mx-auto flex flex-col items-center justify-center gap-5 my-20 '>
        <h1 className='text-4xl font-semibold'>Add Todo</h1>
       <form onSubmit={handleAdd} className="">
        <input type="text" placeholder='Add todo....' value={inputVal} onChange={handleChange} className='border px-4 py-2'/>
        <button type="submit" className='px-8 py-2 text-white bg-green-400'>Add</button>
       </form>

    </div>
  )
}

export default AddTodo
