import React, { useState } from "react";
import { IoIosStar } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  completed,
  editTodo,
  ImportantTodo,
  remove,
  toggleEditTodo,
} from "../../Redux/todoSlice.tsx";

interface NameTodo {
  name: string;
  id: number;
  complete: boolean;
  isEditing: boolean;
  isImportant: boolean;
  date:string
}

const TodoList: React.FC<NameTodo> = ({
  name,
  id,
  complete,
  isEditing,
  isImportant,
  date
}) => {
  const [newText, setNewText] = useState<string>(name);
  // console.log("object", date);

  const dispatch = useDispatch();
  
  const handleDelete = (id: number) => {
    const result = window.confirm("Want to delete?");
    if (result && complete) {
      dispatch(remove(id));
    }
  };
  
  const handleComplete = (id: number) => {
    dispatch(completed(id));
  };

  const toggleEdit = (id: number) => {
    dispatch(toggleEditTodo(id));
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNewText(e.currentTarget.value);
  };

  const handleEdit = (id: number, newText: string) => {
    dispatch(editTodo({ id, newText }));
  };

 

  const handleImportant = (id: number) => {
    dispatch(ImportantTodo(id));
  };

 

  return (
    <div className="flex justify-between items-center mx-4 border my-3 px-4 py-4 bg-white rounded">
      {isEditing ? (
        <>
          <input
            type="text"
            className="border px-4 py-2"
            value={newText}
            onChange={handleChange}
          />
         
          <button
            type="button"
            className="px-8 py-2 text-white bg-green-400"
            onClick={() => handleEdit(id, newText)}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <span
              onClick={() => handleImportant(id)}
              className={`${isImportant === true && "text-green-400"}`}
            >
              <IoIosStar size={20} />
            </span>
            <input type="checkbox" checked={complete} name="" id="" />
            <span className="text-md font-semibold">{name}</span>
            <p>{date}</p>
          </div>

          <div className="flex items-center gap-3 text-white">
            <span
              onClick={() => handleComplete(id)}
              className="rounded-full bg-green-400 px-2 py-2"
            >
              <IoEyeOutline size={20} />
            </span>
            <span
              onClick={() => toggleEdit(id)}
              className="rounded-full bg-gray-400 px-2 py-2"
            >
              <MdOutlineModeEdit size={20} />
            </span>
            <span
              onClick={() => handleDelete(id)}
              className="rounded-full bg-red-400 px-2 py-2"
            >
              <MdOutlineDelete size={20} />
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
