import React from 'react'
import { CiSettings } from "react-icons/ci";
import { IoIosStar } from "react-icons/io";
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
            name: 'MyDay'
        },
        {
            icon: <IoIosStar size={28} />,
            name: 'Important'
        },
        {
            icon: <IoBagCheck size={28} />,
            name: 'Tasks'
        },
    ]
  return (
    <div className='px-12 py-12 flex flex-col gap-4'>
      <h3 className='text-2xl font-bold'>Project To-Do</h3>
      <div className="">
        <div className='flex flex-col gap-5'>
            {
                Lists.map((item,index)=>(
                    <div key={index} className='cursor-pointer'>
                        <List icon={item.icon} name={item.name} />
                    </div>
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default AsideMenu
