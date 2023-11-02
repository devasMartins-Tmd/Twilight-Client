import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FaceComponent = () => {
   let navigate = useNavigate();
   const Switch = () => setTimeout(() => navigate('/index'), 4300);

   useEffect(() => {
      Switch();
   });
   return (
      <section className='w-screen h-screen bg-[#000] flex justify-center'>
         <section className='flex flex-col items-center self-center'>
            <div className='flex flex-row items-center'>
               <p className='font-lora font-black text-4xl text-center text-white'>Twilight</p>
               <i className={`fa text-4xl ml-2 text-[hsl(0,0%,100%)] animate-spin`}>&#xf20e;</i>
            </div>
            <div className='flex flex-row items-center self-center relative'>
               <motion.div
                  initial={{ width: '0' }}
                  whileInView={{ width: '200px', transition: { duration: 4 } }}
                  className='w-4 h-1 rounded-full mt-3 bg-[#666666]'
               ></motion.div>
            </div>
         </section>
      </section>
   );
};

export default FaceComponent;
