import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth';
import { useEffect, useState, useContext } from 'react';
import { SignUpAuth } from '..';
import { useMutation } from '@tanstack/react-query';
import { authenticationFn } from './query';
import { backendUrl } from '../main/utils/url';

//Login: authentication component
const LoginAuth: React.FC = () => {
   let { setAuthPage } = useContext(AuthContext);
   let [form, setformState] = useState({
      email: '',
      password: '',
   });

   let navigate = useNavigate();

   const handleInput = (e: any) => {
      let { name, value: val } = e.target;
      let tagVal = name === 'tag' ? (val === 'farmer' ? 1 : 0) : val;
      setformState((prev) => ({
         ...prev,
         [name]: tagVal,
      }));
   };

   const mutation = useMutation({
      mutationFn: () => authenticationFn(backendUrl + '/auth/login', form),
      mutationKey: ['login', 'auth'],
   });

   useEffect(() => {
      if (mutation.status == 'loading') console.log('loading...');
      if (mutation.status == 'error') console.log(mutation.error);
      if (mutation.status == 'success') {
         console.log(mutation.data);
         localStorage.setItem('-jwtKey-', mutation.data.token);
         if (mutation.data.done) {
            navigate('/home');
         }
      }
   }, [mutation.status]);

   return (
      <form className={'w-[90%] flex flex-col items-start gap-3 justify-between h-full mx-auto'}>
         <div className='flex flex-col items-start justify-start w-full'>
            <p className='font-head text-3xl font-black'>Welcome!</p>
            <p className='font-open text-xs text-[hsl(0,0%,30%)]'>Make sure all fields are filled!</p>
         </div>
         <div className='w-full flex justify-center'>
            <i className={`fa text-[60px] mr-2 self-center animate-spin`}>&#xf20e;</i>
         </div>
         <div className='flex flex-col items-center w-full'>
            <div className='flex flex-col items-start justify-between gap-1 w-full mb-3'>
               <input
                  type={'email'}
                  className='p-5 block w-full font-lora text-lg outline-none rounded bg-[#FAFAFB] border border-zinc-100'
                  placeholder='email'
                  onChange={handleInput}
                  name='email'
               />
            </div>
            <div className='flex flex-col items-start justify-between gap-1 w-full'>
               <input
                  type={'password'}
                  className='p-5 block w-full font-lora text-lg outline-none rounded bg-[#FAFAFA] border border-zinc-100'
                  placeholder='password'
                  onChange={handleInput}
                  name='password'
               />
            </div>
         </div>
         <div className='flex flex-col items-center w-full gap-3 justify-center'>
            <button
               className='p-4 rounded-lg bg-[hsl(0,0%,0%)] text-white block w-full text-center font-slab text-lg font-normal'
               type='button'
               onClick={() => {
                  console.log(form);
                  mutation.mutate();
               }}
            >
               Login
            </button>
            <div className='flex justify-center w-full cursor-pointer' onClick={() => setAuthPage({ currentPage: <SignUpAuth /> })}>
               <p className='font-open text-sm font-medium'>
                  Don't have an account? <span className='font-semibold'>sign up</span>
               </p>
            </div>
         </div>
      </form>
   );
};
export default LoginAuth;
