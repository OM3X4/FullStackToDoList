import { SlNotebook } from "react-icons/sl";
/* eslint-disable */
import React , { useState } from 'react'

const data = [
  {
    name: "Studying Math",
    Topic: "Study",
    status: false
  },
  {
    name: "Playing Basketball",
    Topic: "Sport",
    status: false
  },
  {
    name: "Coding My First Website",
    Topic: "Work",
    status: false
  }
]


function App() {



  return (
    <>
      <div className='flex items-center bg-slate-800'>
        <div className='bg-slate-800 h-screen flex-[1] flex items-center flex-col pt-10'>
          <h1 className='text-white font-bold text-5xl flex items-center justify-center gap-4'><SlNotebook />TikTak</h1>
        </div>
        <div className='bg-white mt-3 mr-3 rounded-t-3xl h-screen flex-[5]'>

        </div>
      </div>
    </>
  )
}

export default App
