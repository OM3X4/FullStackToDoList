/* eslint-disable */
import { BiTrash } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoMdDoneAll } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { SlNotebook } from "react-icons/sl";
import React, { useState , useEffect } from 'react'

// const data = [
//   {
//     name: "Studying Math",
//     Topic: "Study",
//     status: false
//   },
//   {
//     name: "Playing Basketball",
//     Topic: "Sport",
//     status: false
//   },
//   {
//     name: "Coding My First Website",
//     Topic: "Work",
//     status: false
//   }
// ]


function App() {

  const [newTask , setNewTask] = useState("");
  const [newTopic , setNewTopic] = useState(1);
  const [newTopicName , setNewTopicName] = useState("");

  const [topics , setTopics] = useState([]);
  const [data , setData] = useState([]);

  const [searchQuery , setSearchQuery] = useState("");

  useEffect(() => {
    console.log("newTopic : " , newTopic);
    console.log("new Task : " , newTask);
  } , [newTask , newTopic])





  const fetchTopics = async () => {
    const res = await fetch("http://127.0.0.1:8000/topics");
    const data = await res.json();
    setTopics(data);
  };

  const fetchTasks = async () => {
    const res = await fetch("http://127.0.0.1:8000/tasks");
    const data = await res.json();
    setData(data);
  };

  const toggleTask = async (id) => {
    const o = await fetch(`http://127.0.0.1:8000/toggle/${id}`);
    const res = await fetch("http://127.0.0.1:8000/tasks");
    const data = await res.json();
    setData(data);
  };

  const createTask = async () => {
    const res = await fetch("http://127.0.0.1:8000/tasks" , {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: newTask , topic: newTopic})
    })
    fetchTasks();
  }

  const createTopics = async () => {
    const res = await fetch("http://127.0.0.1:8000/topics" , {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: newTopicName})
    })
    fetchTopics();
  }


  useEffect(() => {
    console.log(data)
  } , [data])

  useEffect(() => {
    fetchTasks();
    fetchTopics();
  } , [])


  return (
    <>
      <div className='flex  bg-slate-800 h-[130vh]'>
        <div className='bg-slate-800 h-screen flex-[1] flex items-center flex-col pt-10'>
          <h1 className='text-white font-bold text-5xl flex items-center justify-center gap-4'><SlNotebook />TikTak</h1>
        </div>
        <div className='bg-white mt-3 mr-3 rounded-t-3xl min-h-screen h-fit flex-[5] py-10'>
          <div className="flex justify-between items-center mx-20 mb-10">
            {/* Heading and search */}
            <div>
              <h1 className="text-4xl font-bold text-[roboto] my-4">My Todo</h1>
              <div className="flex px-4 py-3 rounded-md border-2 border-blue-500 overflow-hidden max-w-md ">
                <input type="text" placeholder="Search Something..."
                  className="w-full outline-none bg-transparent text-gray-600 text-sm" onChange={e => setSearchQuery(e.target.value)}/>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-600">
                  <path
                    d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                  </path>
                </svg>
              </div>
            </div>
            {/* date and create */}
            <div className="flex items-center justify-center flex-col gap-4">
              <div className="flex items-center justify-center gap-3">
                <select className="bg-gray-800 py-2 px-4 rounded-2xl font-bold text-white" onChange={e => setNewTopic(parseInt(e.target.value))}>
                  {topics.map((item) => {
                    return <option className="" value={item.id}>{item.name}</option>
                  })}
                </select>
                <input type="text" placeholder="Task..." className="py-2 px-3 border border-black rounded-2xl" onChange={e => setNewTask(e.target.value)}/>
                <button className="flex items-center justify-between gap-4 bg-green-400 px-4 py-2 rounded-2xl font-semibold cursor-pointer font-[roboto]" onClick={createTask}><AiOutlinePlusCircle /> New Task</button>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="bg-slate-100 px-4 py-2 border border-black rounded-2xl">
                  <h1>Start Date</h1>
                  <input type="date" placeholder="Start Date" value={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="bg-slate-100 px-4 py-2 border border-black rounded-2xl">
                  <h1>End Date</h1>
                  <input type="date" placeholder="Start Date" value={new Date().toISOString().split('T')[0]} />
                </div>
              </div>
            </div>
          </div>
          {/* tasks */}
          <div className="flex items-center justify-center h-[90%] mx-10 gap-10">
            <div className="bg-blue-100 h-11/12 w-[80%] rounded-2xl py-5 gap-5 flex flex-col">
              <h1 className="flex items-center justify-center gap-5 font-[roboto] font-bold text-2xl"><div className="size-4 rounded-full bg-teal-500"></div>To Start</h1>
              {data.filter(item => !item.status && item.name.includes(searchQuery)).map(item => {
                return <div className="relative bg-gray-50 border border-slate-700 flex items- justify-center flex-col py-3 mx-5 rounded-2xl pl-5 gap-3">
                  <h1 className="text-xl font-bold self-start">{item.name}</h1>
                  <div className="flex items-center gap-5">
                    <button className="flex items-center justify-center gap-4 bg-green-400 px-2 py-1 font-semibold text-2xl rounded-2xl w-fit" onClick={e => toggleTask(item.id)}><IoMdDoneAll />Done</button>
                    <button className="flex items-center justify-center gap-4 bg-red-400 px-2 py-1 font-semibold text-2xl rounded-2xl w-fit"><BiTrash />Remove</button>
                  </div>
                </div>
              })}
            </div>
            <div className="bg-blue-100 h-11/12 w-[80%] rounded-2xl py-5 gap-5 flex flex-col">
              <h1 className="flex items-center justify-center gap-5 font-[roboto] font-bold text-2xl"><div className="size-4 rounded-full bg-green-400"></div>Completed</h1>
              {data.filter(item => item.status && item.name.includes(searchQuery)).map(item => {
                return <div className="relative bg-gray-50 border border-slate-700 flex items- justify-center flex-col py-3 mx-5 rounded-2xl pl-5 gap-3">
                  <h1 className="text-xl font-bold self-start">{item.name}</h1>
                  <div className="flex items-center gap-5">
                  <button className="flex items-center justify-center gap-4 bg-green-400 px-2 py-1 font-semibold text-2xl rounded-2xl w-fit" onClick={e => toggleTask(item.id)}><IoMdDoneAll />UnDone</button>
                  <button className="flex items-center justify-center gap-4 bg-red-400 px-2 py-1 font-semibold text-2xl rounded-2xl w-fit"><BiTrash />Remove</button>
                  </div>
                </div>
              })}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
