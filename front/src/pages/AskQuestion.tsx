import React, { FormEvent, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AskQuestion = () => {

    const [selectedImage, setSelectedImage] = useState<string>('')
    const [selectedImageName, setSelectedImageName] = useState<string>('')
    const [form, setForm] = useState<any>({})
    const navigate = useNavigate()
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
    }

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

    return (
        <div>
            <Navbar />
            <div className='min-h-[100vh] flex justify-center'>
                <div className=' w-[600px]'>
                    <div className='mt-[70px] py-2 text-[#219EBC] font-bold mb-5'>
                        Ask a public question
                    </div>

                    <form onSubmit={handleSubmit}>
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
                                    onChange={handleChange}
                                    name='titre'
                                    type='text'
                                    placeholder='e.g. I have react project and get error when i want to build.'
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
                                    onChange={handleChange}
                                    name='description'
                                    placeholder='Write here ...'
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
                                    alt="error"
                                    id='selected-image'
                                    className='w-full object-fill rounded-[4px] ' />
                            </div>
                        </div>

                        <div className='mb-6'>
                            <button
                                className='text-sm h-[40px] w-[110px] bg-[#023047] text-white
                            rounded-[4px] hover:bg-[#022f46d6] hover:font-bold'>
                                Post Question
                            </button>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default AskQuestion