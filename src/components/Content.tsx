import React, { useState } from "react";
import TodoList from "./lib/TodoList.tsx";
import { IoMdAdd } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

const Content: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [lastDate, setLastDate] = useState<string>("");
  const displayedDays = new Set<string>();
  const Data = useSelector((state: any) => state.Todos);

  // Sorting and filtering data
  const SortData: any = Data?.filter((item: any) => item)?.sort(
    (a: any, b: any) => {
      const dateA = new Date(a.date.replace(/(\d+)(st|nd|rd|th)/, "$1"));
      const dateB = new Date(b.date.replace(/(\d+)(st|nd|rd|th)/, "$1"));
      return dateA.getTime() - dateB.getTime();
    }
  );

  const filteredAndSortedData: any = Data?.filter(
    (item: any) => item.date >= startDate && item.date <= lastDate
  )?.sort((a: any, b: any) => {
    const dateA = new Date(a.date.replace(/(\d+)(st|nd|rd|th)/, "$1"));
    const dateB = new Date(b.date.replace(/(\d+)(st|nd|rd|th)/, "$1"));
    return dateA.getTime() - dateB.getTime();
  });

  const filterImpData: any = Data?.filter(
    (item: any) => item.isImportant === true
  );

  const DeleteData = localStorage.getItem("deletodos");
  const DelTodo = DeleteData ? JSON.parse(DeleteData) : [];
  const Delerecord = DelTodo?.map((item: any) => item && item[0]);

  const location = useLocation();
  const path = location.pathname.split("/").pop();

  const dates = Array.from({ length: 7 }, (_, i) =>
    moment().add(i, "days").format("MMM Do YY")
  );

  const handleStartDate = (e: any): void => {
    setStartDate(e.currentTarget.value);
  };
  const handleLastDate = (e: any): void => {
    setLastDate(e.currentTarget.value);
  };

  const filter = 
  path === "MyDay" && lastDate
  ? filteredAndSortedData
  : path === "Important"
  ? filterImpData
  : path === "Tasks"
  ? Delerecord
  : SortData ;


  return (
    <div className="flex flex-col gap-4 bg-gray-200 relative pb-20">
      <div className="bg-gradient-to-r from-green-800 to-green-400 py-12 w-[1050px] text-white">
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
                .map((date, index) => (
                  <option value={date} key={index}>
                    {date}
                  </option>
                ))}
            </select>
          </>
        )}
        <div className="">
          {filter?.map((item: any, index: number) => {
            const formattedDay = moment(item.date, "MMM DD YYYY").format("dddd");

            return (
              <div key={index}>
                {!displayedDays.has(formattedDay) && (
                  <>
                    <p className="text-xl font-semibold text-gray-700 px-6">
                      {formattedDay}
                    </p>
                    <span className="hidden">
                      {displayedDays.add(formattedDay)}
                    </span>
                  </>
                )}

                <TodoList
                  name={item.todo}
                  id={item.id}
                  complete={item.completed}
                  isEditing={item.isEditing}
                  date={item.date}
                  isImportant={item.isImportant}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Link to={"/add"}>
        <span className="absolute bottom-4 right-4 rounded-full text-white pl-2 pr-2 py-2 bg-green-400">
          <IoMdAdd size={28} />
        </span>
      </Link>
    </div>
  );
};

export default Content;
