import React, { FormEvent, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Changedpassword = () => {
  const [posted, setPosted] = useState<boolean>(false);
  const [form, setForm] = useState<any>({ oldpassword: '', newpassword: '', repeatpassword: '' });
  const [error, setError] = useState<string>(''); // State to store the error message
  const [success, setSuccess] = useState<string>(''); // State to store the success message
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendpassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess('');
    if(form.newpassword !== form.repeatpassword){
      setError('passwords are not the same');
    }else{
    await axios
      .post('http://127.0.0.1:8000/api/changedpassword', form, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        
        setSuccess(res.data);
      })
      .catch((err) => setError(err.response.data));}
  };
 

  return (
    <div className="flex justify-center items-center h-screen">
      <Navbar />
       <div className="flex flex-col items-center mb-4 ">
        {error && (
          <div className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 inline w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Info</span>
            <div>
               {error}
            </div>
          </div>)}
          {success && (
            <div className="flex p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span className="sr-only">Info</span>
            <div>
              {success}
            </div>
          </div>
          
          )}
        
        <form className="w-80" onSubmit={handleSendpassword}>
            <div className="mb-3">
              <h3>Change your password</h3>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your old password
              </label>
              <input
                type="password"
                onChange={handleChange}
                name="oldpassword"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"

                required />
            </div>
            <div className="mb-6">
              <label htmlFor="repeat-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat New password</label>
              <input type="password" name="newpassword"
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required />
            </div>
            <div className="mb-6">
              <label htmlFor="repeat-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat New password</label>
              <input type="password" name="repeatpassword"
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change password</button>
          </form>
          
    </div>
    </div>

  )
}
export default Changedpassword
