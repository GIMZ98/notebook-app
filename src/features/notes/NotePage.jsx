import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBinLine } from 'react-icons/ri'
import axios from 'axios'

import { useSelector } from 'react-redux'
import { selectUser } from '../users/userSlice'



const NotePage = () => {

  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [notes, setNotes] = useState([])

  const onTitleChanged = (e) => setNewTitle(e.target.value)
  const onContentChanged = (e) => setNewContent(e.target.value)

  var user = useSelector(selectUser)
  console.log("user: ", user)
  console.log("data: ", notes)

  const showNewNote = () => {
    $('#newNoteDiv').addClass('z-10').removeClass('z-[-10]').removeClass('hidden')
  }

  const hideNewNote = () => {
    $('#newNoteDiv').addClass('z-[-10]').addClass('hidden').removeClass('z-10')
  }

  const fetchNotes = async() => {
    await axios.get(`/.netlify/functions/userNotes?id=${user.userId}`)
    .then(response =>{
        console.log("response: ", response)
        setNotes(response.data)
    })
    .catch(err => {
        console.log("err: ", err)
    })
  }

  const showNote = (note) => {
    $('#viewNoteDiv').removeClass('z-[-10]').addClass('z-[10]').removeClass('hidden')
    $('#viewTitle').text(note.title)
    $('#viewContent').text(note.content)
  }

  const hideViewNote = () => {
    $('#viewNoteDiv').addClass('z-[-10]').addClass('hidden').removeClass('z-10')
  }

  var canSave = Boolean(newTitle) && Boolean(newContent)

  const saveNote = async() => {
    $('#submitBtn').text("Saving")
    await axios.post('/.netlify/functions/newNote',
            {userId: user.userId, title: newTitle, content: newContent}
        )
        .then(response =>{
            console.log("response", response)
            $('#submitBtn').text("Saved")
            fetchNotes()
            hideNewNote()
            $('#title').val('')
            $('#content').val('')
            $('#submitBtn').text("Save")

        })
        .catch(err => {
            console.log("err: ", err)

        })
  }

  useEffect(() => {
    console.log("changed")
    fetchNotes();
  }, [user])
  

  return (
    <>
        <div className='relative flex flex-col w-screen min-h-screen bg-slate-100'>
            <nav className="fixed flex top-0  w-full bg-slate-900 sm:px-[50px] px-0 z-0">
                <div className='flex w-full bg-green-0 justify-between items-center'>
                    <div className='sm:w-[200px] w-1/3 text-white sm:text-2xl text-xl px-[10px]  font-mono truncate'>
                        {user.name}
                    </div>

                    <ul className="flex sm:w-[390px] w-2/3 justify-between bg-blue-0">
                        <li  onClick={showNewNote} className="text-xl text-center font-bold text-white hover:bg-blue-900 py-5 sm:w-[260px] pl-2">New Note+</li>
                        <Link to="/login"><li className="text-xl text-center font-bold text-white hover:bg-blue-900 py-5 sm:w-[130px] px-5">Log out</li></Link>
                    </ul>
                </div>
            </nav>

            <div className='w-screen h-[100px] bg-blue-0'></div>

            {/* Notes div */}
            <div id='notesDiv' className='flex flex-col items-center w-screen z-0'>

                {
                    notes.map((note, index) => (
                        <div key={index} id={note._id} onClick={showNote(note)} className='flex justify-between items-center sm:w-[600px] w-full h-[50px] bg-blue-100 border-b-2 border-black'>
                            <div className='w-full h-[50px] text-[20px] p-[10px] font-mono truncate'>
                                {note.title}
                            </div>
                            <div className='flex items-center justify-between w-[120px] h-full p-[10px]'>
                                <AiFillEdit className='text-3xl'/>
                                <RiDeleteBinLine className='text-3xl'/>
                            </div>
                        </div>

                    ))

                }


                {/* Single Note */}
                {/* <div className='flex justify-between items-center sm:w-[600px] w-full h-[50px] bg-blue-100 border-b-2 border-black'>
                    <div className='w-full h-[50px] text-[20px] p-[10px] font-mono truncate'>
                        This
                    </div>
                    <div className='flex items-center justify-between w-[120px] h-full p-[10px]'>
                        <AiFillEdit className='text-3xl'/>
                        <RiDeleteBinLine className='text-3xl'/>
                    </div>
                </div> */}
                {/* End of Single Note */}

             

            </div>
            {/* End of Notes div */}


            {/* New Note div */}
            <div id='viewNoteDiv' className='absolute flex justify-center items-center w-screen h-screen bg-slate-800 bg-opacity-80 z-[-10]'>

                <div className='flex flex-col justify-between items-center sm:w-[500px] w-full sm:h-[600px] h-full bg-blue-400 py-5'>
                    <h1 className='text-3xl font-bold text-white font-mono'>Note</h1>
                    <div className='p-[10px]'>
                        <div id="viewTitle" className='sm:w-[400px] w-full h-[50px] bg-white mb-5 p-5'></div>
                        <div id="viewContent" className='sm:w-[400px] w-full h-[300px] bg-white p-5 overflow-y-scroll'></div>
                    </div>

                    <div className='flex'>
                        <button id='editBtn' className='bg-blue-600 py-2 px-8 w-full text-white font-bold text-[16px] hover:bg-green-800 disabled:opacity-80 disabled:pointer-events-none mx-5'>Edit</button>
                        <button id='noteCloseBtn' onClick={hideViewNote} className='bg-red-600 py-2 px-5 w-full text-white font-bold text-[16px] hover:bg-red-800 disabled:opacity-80 disabled:pointer-events-none mx-5'>Cancel</button>
                    </div>
                
                </div>
            </div>
            {/*End of New Note div */}

            {/* Note div */}
            <div id='newNoteDiv' className='absolute flex justify-center items-center w-screen h-screen bg-slate-800 bg-opacity-80 z-[-10]'>

                <div className='flex flex-col justify-between items-center sm:w-[500px] w-full sm:h-[600px] h-full bg-blue-400 py-5'>
                    <h1 className='text-3xl font-bold text-white font-mono'>New Note</h1>
                    <div>
                        <input id='title' onChange={onTitleChanged} type="text" className='border-[1px] border-slate-600 p-3 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mb-5' placeholder='Title'/>
                        <textarea id='content' onChange={onContentChanged} placeholder="Content..." className='border-[1px] border-slate-600 p-3 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full' rows="15"></textarea>
                    </div>

                    <div className='flex'>
                        <button id='submitBtn' onClick={saveNote} disabled={!canSave} className='bg-green-600 py-2 px-8 w-full text-white font-bold text-[16px] hover:bg-green-800 disabled:opacity-80 disabled:pointer-events-none mx-5'>Save</button>
                        <button id='cancelBtn' onClick={hideNewNote} className='bg-red-600 py-2 px-5 w-full text-white font-bold text-[16px] hover:bg-red-800 disabled:opacity-80 disabled:pointer-events-none mx-5'>Cancel</button>
                    </div>
                
                </div>
            </div>
            {/*End of Note div */}


        </div>
    </>
  )
}

export default NotePage