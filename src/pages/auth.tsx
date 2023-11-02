import { useContext } from 'react';
import AuthContext from '../context/auth';

const Authentication: React.FC = () => {
   let { authPage } = useContext(AuthContext);

   return (
      <main className='flex justify-center w-full h-screen bg-[#0e0d0d]'>
         <section className='sm:w-[60%] w-full mx-auto sm:h-3/4 bg-red-400 h-full flex self-center items-center'>
            <div className='w-full bg-white h-full flex flex-col justify-center relative'>
               <div className='w-full h-3/4 my-auto z-30'>{authPage.currentPage}</div>
            </div>
         </section>
      </main>
   );
};

export default Authentication;
