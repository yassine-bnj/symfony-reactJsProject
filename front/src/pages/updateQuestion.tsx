import React, {  FormEvent, useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
const UpdateQuestion = () => {
    interface Answer {
        id: number,
        content: string,
        user: string
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
    const { id } = useParams()
    const [selectedImage, setSelectedImage] = useState<any>('')
    const [selectedImageName, setSelectedImageName] = useState<string>('')
    const [form, setForm] = useState<any>({})
    const navigate = useNavigate()
    const [open, setOpen] = useState<boolean>(false)
    const fileChangeHandler = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.files[0]
        })
        setSelectedImageName('')
        const img: any = document.getElementById('selected-image')
        setSelectedImageName(e.target.files[0].name)
        setSelectedImage(URL.createObjectURL(e.target.files[0]))
        img.src = URL.createObjectURL(e.target.files[0])
    }


    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        console.log(form)
    }
    const deletequestion = async (id:any) => {
       

        await axios.delete(`http://127.0.0.1:8000/api/question/${id}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            } }).then(res => {
                navigate('/questionuser')
            })
            .catch(err => console.log(err))}

    const [question, setQuestion] = useState<Question>()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
       console.log(form)
        await axios.post('http://127.0.0.1:8000/api/questions', form, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                navigate('/explore')
            })
            .catch(err => console.log(err))
    }
    const openpopup = () => {

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
              deletequestion(question?.id)
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
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
        setForm({
            titre: question?.titre,
            description: question?.description,
            img: question?.img,
            id: question?.id
        })
       setSelectedImage(question?.img)
    }, [handleGetQuestionById, ])
    return (
        <div>
            <Navbar /> 
{open &&(
  <div>       
<div id="popup-modal" tabIndex={-1}className="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
                <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                    Yes, I'm sure
                </button>
                <button data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
            </div>
        </div>
    </div>
</div></div>   )}
            <div className='min-h-[100vh] flex justify-center'>
                <div className=' w-[600px]'>
                    <div className='mt-[70px] py-2 text-[#219EBC] font-bold mb-5'>
                        Edit question
                    </div>
                    <button onClick={()=>openpopup()}
                                className='text-sm h-[40px] w-[110px] bg-[red] text-white
                            rounded-[4px] hover:font-bold'>
                             Delete
                            </button>
                    <form onSubmit={handleSubmit}>
                            <div className='mb-6'>
                               
                               
                            </div>
                            <div className='mb-1'>
                                <input type="hidden"
                                    onChange={handleChange} value={question?.id}
                                    name='id'
                                />
                            </div>
                        
                        <div className='bg-white rounded-[4px] p-2 drop-shadow-md mb-[30px]'>
                            <div className='mb-6'>
                                <div className='text-[#023047] font-bold'>
                                    Title
                                </div>
                                <div className='text-[#4B5563] text-xs'>
                                    Be specific and imagine you’re asking a question to another person.
                                </div>
                            </div>
                            <div className='mb-1'>
                                <input
                                    onChange={handleChange} value={question?.titre}
                                    name='titre'
                                    type='text'
                                    className='h-8 mt-1 block w-full px-3 py-2 bg-[#F3F4F6] rounded-[4px] text-xs shadow-sm placeholder-slate-400
                                            focus:outline-none focus:border-[#219EBC] focus:ring-1 focus:ring-[#219EBC]
                                            invalid:border-pink-500 invalid:text-pink-600
                                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                                />
                            </div>
                        </div>

                        <div className='bg-white rounded-[4px] p-2 drop-shadow-md mb-[30px]'>
                            <div className='mb-6'>
                                <div className='text-[#023047] font-bold'>
                                    What are the details of your problem?
                                </div>
                                <div className='text-[#4B5563] text-xs'>
                                    Introduce the problem and expand on what you put in the title.
                                </div>
                            </div>
                            <div className='mb-1'>
                                <textarea
                                    onChange={handleChange} value={question?.description} 
                                    name='description'
                                    className=' h-36 appearance-none resize-none block w-full mt-1 block w-full px-3 py-2 bg-[#F3F4F6] rounded-[4px] text-xs shadow-sm placeholder-slate-400
                                focus:outline-none focus:border-[#219EBC] focus:ring-1 focus:ring-[#219EBC]
                                invalid:border-pink-500 invalid:text-pink-600
                                focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                                >

                                </textarea>
                            </div>
                        </div>

                        <div className='bg-white rounded-[4px] p-2 drop-shadow-md mb-[30px]'>
                            <div className='mb-6'>
                                <div className='text-[#023047] font-bold'>
                                    Image for the problem
                                </div>
                                <div className='text-[#4B5563] text-xs'>
                                    Please provide an image that visually represents a problem that you are currently facing.
                                </div>
                            </div>
                            <div className='mb-4'>
                                <label
                                    htmlFor='image'
                                    className='flex items-center h-8 mt-1 block w-full px-3 py-2 bg-[#F3F4F6] rounded-[4px] text-xs shadow-sm placeholder-slate-400
                                            focus:outline-none focus:border-[#219EBC] focus:ring-1 focus:ring-[#219EBC]
                                            invalid:border-pink-500 invalid:text-pink-600
                                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                                >
                                    <span
                                        className='mr-2 px-5 py-1 rounded-full bg-[#9FD1DF] text-[#219EBC] font-bold cursor-pointer hover:bg-[#AFE6F5]'
                                    >
                                        Choose File
                                    </span>
                                    <span>
                                        {
                                            selectedImageName === '' ?
                                                'No file chosen' :
                                                selectedImageName
                                        }
                                    </span>
                                </label>
                                <input
                                    id='image'
                                    name='img'
                                    type='file'
                                    className='hidden'
                                    onChange={fileChangeHandler} 
                                />
                            </div>
                            <div className={`mb-1 rounded-[4px] border ${selectedImage === '' && 'hidden'}`}>
                                <img
                                    src={selectedImage}
                                    
                                    id='selected-image'
                                    className='w-full object-fill rounded-[4px] ' />
                            </div>
                        </div>

                        <div className='mb-6'>
                            <button
                                className='text-sm h-[40px] w-[110px] bg-[#023047] text-white
                            rounded-[4px] hover:bg-[#022f46d6] hover:font-bold '>
                                Update Question
                            </button>
                          
                         
                        </div>
                        
                        </form>
                       
                </div>
            </div>


        </div>
    )
}

export default UpdateQuestion