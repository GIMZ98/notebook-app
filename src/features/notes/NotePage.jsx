import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBinLine } from 'react-icons/ri'

const NotePage = () => {

  const showNewNote = () => {
    $('#newNoteDiv').addClass('z-10').removeClass('z-[-10]')
  }

  const hideNewNote = () => {
    $('#newNoteDiv').addClass('z-[-10]').removeClass('z-10')
  }

  return (
    <>
        <div className='relative flex flex-col w-screen min-h-screen bg-slate-100'>
            <nav className="fixed flex top-0 justify-end w-full bg-slate-900 sm:px-[50px] px-0">
                <ul className="flex sm:w-[390px] w-screen justify-between">
                    <li  onClick={showNewNote} className="text-xl text-center font-bold text-white hover:bg-blue-900 py-5 sm:w-[260px] pl-2">New Note+</li>
                    <Link to="/login"><li className="text-xl text-center font-bold text-white hover:bg-blue-900 py-5 sm:w-[130px] px-5">Log out</li></Link>
                </ul>
            </nav>

            <div className='w-screen h-[100px] bg-blue-0'></div>

            {/* Notes div */}
            <div id='notesDiv' className='flex flex-col items-center w-screen'>

                {/* Single Note */}
                <div className='flex justify-between items-center sm:w-[600px] w-full h-[50px] bg-blue-100 border-b-2 border-black'>
                    <div className='w-full h-[50px] text-[20px] p-[10px] font-mono truncate'>
                        This is title  This is title  This is title This is title  This is title  This is title This is title  This is title  This is title
                    </div>
                    <div className='flex items-center justify-between w-[120px] h-full p-[10px]'>
                        <AiFillEdit className='text-3xl'/>
                        <RiDeleteBinLine className='text-3xl'/>
                    </div>
                </div>
                {/* End of Single Note */}

                {/* Single Note */}
                <div className='flex justify-between items-center sm:w-[600px] w-full h-[50px] bg-blue-100 border-b-2 border-black'>
                    <div className='w-full h-[50px] text-[20px] p-[10px] font-mono truncate'>
                        This is title  This is title  This is title This is title  This is title  This is title This is title  This is title  This is title
                    </div>
                    <div className='flex items-center justify-between w-[120px] h-full p-[10px]'>
                        <AiFillEdit className='text-3xl'/>
                        <RiDeleteBinLine className='text-3xl'/>
                    </div>
                </div>
                {/* End of Single Note */}

                {/* Single Note */}
                <div className='flex justify-between items-center sm:w-[600px] w-full h-[50px] bg-blue-100 border-b-2 border-black'>
                    <div className='w-full h-[50px] text-[20px] p-[10px] font-mono truncate'>
                        This is title  This is title  This is title This is title  This is title  This is title This is title  This is title  This is title
                    </div>
                    <div className='flex items-center justify-between w-[120px] h-full p-[10px]'>
                        <AiFillEdit className='text-3xl'/>
                        <RiDeleteBinLine className='text-3xl'/>
                    </div>
                </div>
                {/* End of Single Note */}              

            </div>
            {/* End of Notes div */}


            {/* New Note div */}
            <div id='newNoteDiv' className='absolute flex justify-center items-center w-screen h-screen bg-slate-800 bg-opacity-80 z-[-10]'>

                <div className='flex flex-col justify-between items-center sm:w-[500px] w-full sm:h-[600px] h-full bg-blue-400 py-5'>
                    <h1 className='text-3xl font-bold text-white font-mono'>New Note</h1>
                    <div>
                        <input id='title' type="text" className='border-[1px] border-slate-600 p-3 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mb-5' placeholder='Title'/>
                        <textarea id='content' placeholder="Content..." className='border-[1px] border-slate-600 p-3 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full' rows="15"></textarea>
                    </div>

                    <div className='flex'>
                        <button id='submitBtn' className='bg-green-600 py-2 px-8 w-full text-white font-bold text-[16px] hover:bg-green-800 disabled:opacity-80 disabled:pointer-events-none mx-5'>Save</button>
                        <button id='cancelBtn' onClick={hideNewNote} className='bg-red-600 py-2 px-5 w-full text-white font-bold text-[16px] hover:bg-red-800 disabled:opacity-80 disabled:pointer-events-none mx-5'>Cancel</button>
                    </div>
                
                </div>
            </div>
            {/*End of New Note div */}


        </div>
    </>
  )
}

export default NotePage