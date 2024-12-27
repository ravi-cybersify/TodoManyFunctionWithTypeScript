import React, { useState } from "react";
import TodoList from "./lib/TodoList.tsx";
import { IoMdAdd } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { TodoPros } from "../Redux/todoSlice.tsx";
import moment from "moment";

const Content: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [lastDate, setLastDate] = useState<string>("");

  const Data = useSelector((state: any) => state.Todos);

  const filterData: any = Data?.filter(
    (item: any) => item.date >= startDate && item.date <= lastDate
  );

  // console.log(startDate,"data")

  const filterImpData: any = Data?.filter(
    (item: any) => item.isImportant === true
  );

  const DeleteData = localStorage.getItem("deletodos");
  // console.log("DeleteData", DeleteData)
  const DelTodo: TodoPros[] = DeleteData ? JSON.parse(DeleteData) : [];
  // console.log("DelTodo", DelTodo)

  const Delerecord = DelTodo?.map(
    (item) =>
      // console.log("DeleRecord", item[0])
      item && item[0]
  );

  // console.log("object" , Delerecord)

  const location = useLocation();
  const path = location.pathname.split("/").pop();
  // console.log("object", Data);

  const dates = Array.from({ length: 7 }, (_, i) =>
    moment().add(i, "days").format("MMM Do YY")
  );

  const handleStartDate = (e: any): void => {
    setStartDate(e.currentTarget.value);
  };
  const handleLastDate = (e: any): void => {
    setLastDate(e.currentTarget.value);
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-200 relative pb-20 ">
      <div className="bg-gradient-to-r from-green-800 to-green-400  py-12 w-[1050px] text-white">
        <h1 className="text-lg px-6">{path}</h1>
        <h3 className="text-md px-6 pt-2">Today</h3>
      </div>
      <div className="">
        {path === "Tasks" && (
          <p className="text-2xl font-semibold text-green-400 px-6">
            Deleted Tasks
          </p>
        )}
        {path === "MyDay" && (
          <>
            <span className="font-semibold text-gray-500 px-6">
              Filter Todo
            </span>
            <span>from</span>
            <select value={startDate} onChange={handleStartDate}>
              <option>Start Date</option>
              {dates?.map((date, index) => (
                <option value={date} key={index}>
                  {date}
                </option>
              ))}
            </select>
            <span>to</span>
            <select value={lastDate} onChange={handleLastDate}>
              <option>Last Date</option>
              {dates
                .filter((date) => date >= startDate)
                .map((dates, index) => (
                  <option value={dates} key={index}>
                    {dates}
                  </option>
                ))}
            </select>
          </>
        )}
        <div className="">
          {(path === "MyDay"
            ? filterData
            : path === "Important"
            ? filterImpData
            : Delerecord
          )?.map((item: any) => (
            <>
              {path === "MyDay" && (
                <p className="text-xl font-semibold text-gray-700 px-6">
                    {item.date}
                </p>
              )}
              <TodoList
                name={item.todo}
                id={item.id}
                complete={item.completed}
                isEditing={item.isEditing}
                date={item.date}
                isImportant={item.isImportant}
              />
            </>
          ))}
        </div>
      </div>
      <Link to={"/add"}>
        <span className=" absolute bottom-4 right-4 rounded-full text-white  pl-2 pr-2 py-2 bg-green-400">
          <IoMdAdd size={28} />
        </span>
      </Link>
    </div>
  );
};

export default Content;
