import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import QuestionView from '../components/QuestionView'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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

const Profil = () => {

    const [questions, setQuestions] = useState<Question[]>([])
    const navigate = useNavigate()


    const handleNavigate = (to: string) => {
        navigate(to)
    }


    const handleGetQuestions = useCallback(async () => {
        await axios.get('http://127.0.0.1:8000/api/questionsuser', {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log(res.data)
                setQuestions(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        handleGetQuestions()
    }, [handleGetQuestions])

    return (
        <div>
            <Navbar />
            {questions.length === 0 && (
                <div className='min-h-[100vh] flex justify-center items-center'>
                    <div className='text-[#023047] font-bold text-2xl'>
                        No Questions yet
                    </div>
                </div>
            )


            }
                <div className='min-h-[100vh] flex justify-center'>
                <div className=' w-[600px] border-l-[1px] border-[#4B5563]'>
                    <div className='mt-[70px] p-2 text-[#023047] font-bold mb-[40px]'>
                       Your Questions
                    </div>

                    <div className='p-2'>
                        {
                            questions.reverse().map((item: Question, index: number) => (
                                <React.Fragment key={index}>
                                    <div onClick={() => handleNavigate('/question/update/' + item.id)}>
                                        <QuestionView
                                            text={item.titre}
                                            answersCount={item.responses.length}
                                            time={new Date(item.date).getTime()}
                                            profile={true}
                                            
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

export default Profil