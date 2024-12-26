import React from 'react'
import { CiSettings } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
import List from './lib/List.tsx';

interface list{
    icon: React.ReactNode,
    name: string
}

const AsideMenu:React.FC = () => {
    const Lists:list[] = [
        {
            icon: <CiSettings size={28}/>,
            name: 'My Day'
        },
        {
            icon: <FaStar size={28} />,
            name: 'Important'
        },
        {
            icon: <IoBagCheck size={28} />,
            name: 'Tasks'
        },
    ]
  return (
    <div className='px-12 py-12 flex flex-col gap-4'>
      <h3 className='text-2xl'>Project To-Do</h3>
      <div className="">
        <ul className='flex flex-col gap-5'>
            {
                Lists.map((item,index)=>(
                    <li key={index} className=''>
                        <List icon={item.icon} name={item.name} />
                    </li>
                ))
            }
        </ul>
      </div>
    </div>
  )
}

export default AsideMenu
