import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import QuestionView from '../components/QuestionView'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode';

interface Answer {
    id: number,
    contnent: string,
    user: string
}

interface Question {
    id: number
    titre: string
    description: string
    date: string,
    image: string,
    userId: string,
    responses: Answer[]
}

const Home = () => {

    const [questions, setQuestions] = useState<Question[]>([])
    const navigate = useNavigate()
    const [form, setForm] = useState({
     
    })
    const[id,setId]=useState('')
   
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
            
        })
        console.log(form)
        
    }

    const handleNavigate = (to: string) => {
        navigate(to)
    }


  
    const handlesearchQuestions = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setQuestions([])
        await axios.post('http://127.0.0.1:8000/api/search',form, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setQuestions(res.data)
                console.log(form)
                console.log(res.data)
               
            })
            .catch(err => console.log('error'))
    }
 

    const handleGetQuestions = useCallback(async () => {
       
        await axios.get('http://127.0.0.1:8000/api/questions', {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
               
            }
          
        })
            .then(res => {
                setQuestions(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        handleGetQuestions()
         setId(jwtDecode<any>(localStorage.getItem('token')!).id)
    }, [handleGetQuestions])

    return (
        <div>
            <Navbar />
            <div className='min-h-[100vh] flex justify-center'>
                <div className=' w-[600px] border-l-[1px] border-[#4B5563]'>
               
                    <div className='mt-[70px] p-2 text-[#023047] font-bold mb-[40px]'>
                        Top problems
                    </div>
                    <form className="flex items-center mb-3" onSubmit={handlesearchQuestions} >   
    <label htmlFor="simple-search" className="sr-only">Search</label>
    <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
        </div>
        <input type="text" id="simple-search"  name="titre" onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder="Search"  />
    </div>
    <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <span className="sr-only">Search for a problem</span>
    </button>
</form>
                    <div className='p-2'>
                        {
                            questions.reverse().map((item: Question, index: number) => (
                                <React.Fragment key={index}>
                                    <div onClick={() => handleNavigate('/question/details/' + item.id)}>
                                        <QuestionView
                                            text={item.titre}
                                            answersCount={item.responses.length}
                                            time={new Date(item.date).getTime()}
                                        />
                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home