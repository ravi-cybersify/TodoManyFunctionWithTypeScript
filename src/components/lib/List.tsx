import React from 'react'
import { useLocation } from 'react-router-dom';


interface list{
    icon: React.ReactNode,
    name: string
}

const List:React.FC<list> = ({icon,name})=> {

  const location = useLocation();
  const path = location.pathname.split('/').pop();

  // console.log(path)

  const handleButton = (name:string)=>{
      // if(name.includes(' ')){
      //  name = name.replace(/\s/g, "")
      // }
      window.location.href = `/${name}`
  }
  return (
    <button onClick={()=> handleButton(name)} className={`flex gap-3 w-52 pr-12 pl-2 py-1  ${path === name && "bg-green-400 text-white"} `}>
      <span className={`${path === name ? 'text-white' : 'text-green-400'}`}>{icon}</span>
      <span className='text-lg'>{name}</span>
    </button>
  )
}

export default List
