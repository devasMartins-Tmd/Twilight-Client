import { useContext, useState } from 'react';
import AuthContext from '../../context/auth';
import { Loader, LoginAuth } from '..';
import { useMutation } from '@tanstack/react-query';
import { authenticationFn } from './query';
import { backendUrl } from '../main/utils/url';

const SignUpAuth: React.FC = () => {
   let { setAuthPage } = useContext(AuthContext);

   let [formState, setformState] = useState({
      name: '',
      email: '',
      password: '',
   });

   const handleInput = (e: any) => {
      let { name, value } = e.target;
      setformState((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const mutation = useMutation({
      mutationFn: () => authenticationFn(backendUrl + '/auth/signup', formState),
      mutationKey: ['signup', 'auth'],
      onSuccess: () => setAuthPage({ currentPage: <LoginAuth /> }),
      onError: (err) => console.log(err),
   });

   if (mutation.status == 'loading') return <Loader on={mutation.isLoading} />;

   return (
      <form className={'w-[90%] flex flex-col items-center gap-3 justify-between h-full mx-auto '}>
         <div className='flex flex-col items-start justify-start w-full'>
            <p className='font-head text-3xl font-black'>Create Account!</p>
            <p className='font-open text-xs text-[hsl(0,0%,30%)]'>Make sure all fields are filled!</p>
         </div>
         <div className='w-full flex justify-center'>
            <i className={`fa text-[60px] mr-2 self-center animate-spin`}>&#xf20e;</i>
         </div>
         <div className='w-full flex flex-col items-center gap-3'>
            <div className='flex flex-col items-start justify-between w-full'>
               <input
                  type={'text'}
                  className='sm:p-5 p-3.5 font-lora text-lg block w-full outline-none rounded bg-[#FAFAFA] border border-zinc-100'
                  placeholder='name'
                  onChange={handleInput}
                  name='name'
               />
            </div>
            <div className='flex flex-col items-start justify-between w-full my-3'>
               <input
                  type={'email'}
                  className='sm:p-5 p-3.5 font-lora text-lg block w-full outline-none rounded bg-[#FAFAFA] border border-zinc-100'
                  placeholder='email'
                  onChange={handleInput}
                  name='email'
               />
            </div>
            <div className='flex flex-col items-startjustify-between w-full'>
               <input
                  type={'password'}
                  className='sm:p-5 p-3.5 font-lora text-lg block w-full outline-none rounded bg-[#FAFAFA] border border-zinc-100'
                  placeholder='password'
                  name='password'
                  onChange={handleInput}
               />
            </div>
         </div>
         <button
            className='p-4 font-lora rounded-sm bg-zinc-800 text-white block w-full text-center font-slab text-lg font-normal'
            type='button'
            onClick={() => {
               console.log(formState);
               mutation.mutate();
            }}
         >
            Signup
         </button>
         <div className='flex justify-center w-full cursor-pointer' onClick={() => setAuthPage({ currentPage: <LoginAuth /> })}>
            <p className='font-lora text-base font-medium self-center text-center'>
               Already have an account? <span className='font-black'>Log In</span>
            </p>
         </div>
      </form>
   );
};
export default SignUpAuth;
