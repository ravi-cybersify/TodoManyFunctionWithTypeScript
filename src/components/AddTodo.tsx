import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { add } from "../Redux/todoSlice.tsx";
import moment from "moment";

const AddTodo: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [inputVal, setInputVal] = useState<string>("");
  const [day, setDay] = useState<string>("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setInputVal(e.currentTarget.value);
  };
  const handleAdd = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (inputVal !== "" && day) {
      dispatch(
        add({
          id: Date.now(),
          todo: inputVal,
          completed: false,
          isEditing: false,
          isImportant: false,
          date: day,
        })
      );
      navigation("/MyDay");
      setInputVal("");
    }
    else{
      alert("please fill input field and select Date");
    }
    
  };

  // const date = moment().format("MMM Do YY");
  // const date1 = moment().add(1, 'days').format("MMM Do YY");
  // const date2 = moment().add(2, 'days').format("MMM Do YY");
  // const date3 = moment().add(3, 'days').format("MMM Do YY");
  // const date4 = moment().add(4, 'days').format("MMM Do YY");
  // const date5 = moment().add(5, 'days').format("MMM Do YY");
  // const date6 = moment().add(6, 'days').format("MMM Do YY");

  const dates = Array.from({ length: 7 }, (_, i) =>
    moment().add(i, "days").format("MMM Do YY")
  );

  const handleDateChange = (e: any): void => {
    setDay(e.currentTarget.value);
  };
  // console.log("setDay", day)
  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center gap-5 my-20 ">
      <h1 className="text-4xl font-semibold">Add Todo</h1>
      <form onSubmit={handleAdd} className="">
        <select onChange={handleDateChange}>
          <option>Enter Date</option>
          {dates?.map((date, index) => (
            <option value={date} key={index}>
              {date}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Add todo...."
          value={inputVal}
          onChange={handleChange}
          className="border px-4 py-2"
        />
        <button type="submit" className="px-8 py-2 text-white bg-green-400">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
