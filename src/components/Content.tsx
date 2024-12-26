import React from 'react'
import TodoList from './lib/TodoList.tsx'
import { IoMdAdd } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Content:React.FC = () => {
  const Data = useSelector((state:any)=> state.Todos);
  console.log("object", Data)
  return (
    <div className='flex flex-col gap-4 bg-gray-200 relative pb-20 '>
      <div className="bg-gradient-to-r from-green-800 to-green-400  py-12 w-[1050px] text-white">
        <h1 className='text-lg px-6'>My Day</h1>
        <h3 className='text-md px-6 pt-2'>Today</h3>
      </div>
      <div className="">
        <div className="">
            {
              Data?.map((item:any)=>(
                <TodoList name={item.todo} id={item.id} complete={item.completed} isEditing={item.isEditing}/>
              ))
            }
        </div>
      </div>
      <Link to={'/add'} >
      <span className=" absolute bottom-4 right-4 rounded-full text-white  pl-2 pr-2 py-2 bg-green-400">
        <IoMdAdd size={28}/>
      </span>
      </Link>
    </div>
  )
}

export default Content
