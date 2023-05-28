import React from 'react'
import moment from 'moment'

const QuestionView: React.FC<{
  text: string,
  answersCount: number,
  time: number
  profile?: boolean
}> = ({ text, answersCount, time }) => {
  return (
    
    <div className='z-0 flex flex-col justify-between drop-shadow-md rounded-[4px] h-[110px] bg-white p-2 mb-10 hover:cursor-pointer hover:drop-shadow-lg'>
      <div className='text-[#219EBC] font-bold text-justify'>
        {text}
      </div>
      <div className='flex items-center justify-between text-xs text-[#023047]'>
        <div>
          {answersCount} Answers
        </div>
        <div>
          {moment(time).fromNow()}
        </div>
      </div>
    
    </div>
    
  )
}

export default QuestionView