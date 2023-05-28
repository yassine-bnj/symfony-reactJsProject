import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import errorImage from '../assets/error.png'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import Swal from 'sweetalert2'

interface Answer {
    id: number,
    content: string,
    user: string
    date: string
}
interface User {
    id: number,
    nom: string,
    email: string,
}
interface Question {
    id: number
    titre: string
    description: string
    date: string,
    img: string,
    userId: string,
    responses: Answer[]
}
interface QuestionDetailsProps {
    user: User;
  }
const QuestionDetails = ()=> {
   
    const [question, setQuestion] = useState<Question>()
    const [comment, setComment] = useState<string>('')
    const [posted, setPosted] = useState<boolean>(false)
    const { id } = useParams()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState<User>()
    const [isAnswered, setIsAnswered] = useState(false)
    const openpopup = (id: number) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://127.0.0.1:8000/api/response/'+id)
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }
const toggleDropdown = () => {

        setIsDropdownOpen(true);
        console.log(isDropdownOpen)
      
    }

    const handleGetUser = useCallback(async () => {
        await axios.get('http://127.0.0.1:8000/api/user', {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setUser(res.data)
                        })
            .catch(err => console.log(err))
    }, [])
  

    useEffect(() => {
        handleGetUser()
    }, [handleGetUser])

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.currentTarget.value)
    }

    const handleSendAnswer = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await axios.post('http://127.0.0.1:8000/api/response', {
            content: comment,
            question_id: id
        }, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setPosted(!posted)
        }).catch(err => console.log(err))
    }

    const handleGetQuestionById = useCallback(async () => {
        await axios.get(`http://127.0.0.1:8000/api/questions/${id}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setQuestion(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        handleGetQuestionById()
    }, [handleGetQuestionById, posted])


    if (!question) {
        return (
            <><Navbar /><div>
                Loading ...
            </div></>
        )
    }

    return (
        <div>
            <Navbar />
 
            <div className='min-h-[100vh] flex justify-center'>
                <div className=' w-[600px] border-l-[1px] border-[#4B5563]'>
                    <div className='mt-[70px]'>
                        <div className='border-b-[1px] border-[#DADADA] p-2'>
                            <div className='text-[#023047] font-bold mb-3'>
                                {question.titre}
                            </div>
                            <div className='flex text-xs text-[#023047] mb-1'>
                                <div className='mr-10'>
                                    {moment(new Date(question.date).getTime()).fromNow()}
                                </div>
                                
                                <div>
                                    {question.responses.length} Answers
                                    
                                </div>
                        
                            </div>
                        </div>
                        <div className='border-b-[1px] border-[#DADADA] p-2'>
                            <div className='text-[#023047] text-xs  text-justify mb-6'>
                                {question.description}
                            </div>
                            <div className='mb-3'>
                                <img
                                    src={question.img}
                                    alt="errorImage"
                                    className='object-cover rounded-[4px] border' />
                            </div>
                        </div>
                        <div className='p-2'>
                            <div className='font-bold text-[#023047] mb-2'>
                                {question.responses.length} Answer (s)
                                
                            </div>
                            <div className='flex justify-end items-start absolute top-0 right-0'>
             
            </div>
                            <div className='mb-10 ml-3'>
                                {
                                    question.responses.map((response, index) => (
                                        <div key={index} className='border-b-[1px] border-[#DADADA] mb-3 '>
    <div className='text-[#023047] text-xs text-justify mb-2'>
        {response.content}
    </div>
    <div className='flex justify-end items-center mb-2'>
        <div className='text-[#023047] text-xs'>
            {response.user === user?.nom && (<>
            <button className='mr-2 text-blue-500'  >Edit</button>
            <button className='mr-2 text-red-500' onClick={()=>openpopup(response.id)} >Delete</button>
            
        </>)}
            {/* Answered 14 mins ago by */}
            {moment(new Date(response.date).getTime()).fromNow()} by 
             <span className='font-bold text-[#219EBC]'>{response.user} </span>
        </div>
    </div>
</div>

                                        
                                    ))
                                }
                            </div>

                            <div className='mb-4'>
                                <form onSubmit={handleSendAnswer}>
                                    <div className='font-bold text-[#023047] mb-2'>
                                        Your Answer
                                    </div>
                                    <div className='mb-3'>
                                        <textarea
                                            onChange={handleChange}
                                            name='problem'
                                            placeholder='Write here ...'
                                            className='border h-36 appearance-none resize-none block w-full mt-1 block w-full px-3 py-2 bg-[#F3F4F6] rounded-[4px] text-xs shadow-sm placeholder-slate-400
                                            focus:outline-none focus:border-[#219EBC] focus:ring-1 focus:ring-[#219EBC]
                                            invalid:border-pink-500 invalid:text-pink-600
                                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                                        >

                                        </textarea>
                                    </div>
                                    <div className='mb-1'>
                                        <button
                                            className='text-sm h-[40px] w-[130px] bg-[#023047] text-white
                                        rounded-[4px] hover:bg-[#022f46d6] hover:font-bold'>
                                            Post Your Answer
                                        </button>
         
                                    </div>
                                
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default QuestionDetails