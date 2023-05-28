import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCallback } from 'react'
import QuestionDetails from '../pages/QuestionDetails'
const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
    const navigate = useNavigate()
    const [user, setUser] = useState<User>({} as User)
    const handleNavigate = (to: string): void => {
        navigate(to)
    }
    const [login, setLogin] = useState<boolean>(false)
    interface User {
        id: number,
        nom: string,
        email: string,
    }
 
  const handleLogout = useCallback(async () => {
        localStorage.removeItem('token')
        handleNavigate('/login')
    }, [])
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

    return (
        <div className='z-50 fixed top-0 w-full flex justify-between items-center bg-[#F3F4F6] px-4 h-[60px]'>
            <div>
                <img src={logo} alt="logo" className='w-[100px]' />
            </div>
            <div className='flex items-center'>
                <div className='flex p-1 mr-1'>
                
                  <div
                        className='flex items-center justify-center 
                        cursor-pointer border border-[#023047] rounded-[4px] 
                        w-[100px] h-[40px] text-sm text-[#023047]
                        hover:bg-white hover:font-bold'
                         onClick={() => handleNavigate('/explore')}
                    >
                        Home
                    </div>
                
                </div>
            
                <div className='flex p-1 mr-1'>
                    <div
                        className='flex items-center justify-center 
                        cursor-pointer bg-[#023047] rounded-[4px] 
                        w-[100px] h-[40px] text-sm text-white
                        hover:bg-[#022f46d6] hover:font-bold'
                        onClick={() => handleNavigate('/ask')}
                    >
                        Ask Question
                    </div>
                </div>


                {user.nom!=='' && (
                <div className="flex p-1 border border-[#F3F4F6] rounded-[4px] cursor-pointer hover:border-white hover:bg-white hover:drop-shadow-sm">
                <div className="relative inline-block">
               
                <div
        
                className="flex items-center justify-center text-md text-white font-bold mr-2 rounded-full bg-[#219EBC] w-[40px] h-[40px]"
                 onClick={toggleDropdown} >
                   A
                   </div>
      
      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" >
            <li>
              <a onClick={()=>handleNavigate('/questionuser')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My problems</a>
            </li>
            <li>
              <a onClick={()=>handleNavigate('/changedpassword')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile settings</a>
            </li>
           
            <li onClick={()=>handleLogout()}> 
              <a   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
            </li>
          </ul>
        </div>
      )}
    </div>
                      
                  
  
                    <div className='h-[40px] flex items-center text-[#023047] font-bold text-sm'  >
                        {user.nom}
                    </div>
                </div>)}
            </div>

        
          
        </div>
              
    )
}

export default Navbar