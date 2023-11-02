import { useMutation, useQuery } from '@tanstack/react-query';
import { backendUrl } from '../components/main/utils/url';
import { useContext, useMemo, useState } from 'react';
import RefetchContext from '../context/refetch';
import ThemeContext from '../context/theme';
import { EmptyField, Loader, exp, expL } from '../components';

const ExplorePage = () => {
   let auth = localStorage.getItem('-jwtKey-');
   let { reft } = useContext(RefetchContext);
   let { mode } = useContext(ThemeContext);
   let [key, setkey] = useState(1);

   let Exp: string = useMemo(() => {
      return mode ? expL : exp;
   }, [mode]);

   const { data, isLoading, isSuccess } = useQuery({
      queryFn: async () => {
         const A = await fetch(`${backendUrl}/explore/get`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `${auth}`,
            },
         });
         return A.json();
      },
      queryKey: ['explore', 'getExplore', reft, key],
      enabled: !!backendUrl,
   });

   const mutation = useMutation({
      mutationFn: async (id: string) => {
         const A = await fetch(`${backendUrl}/friend/add`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `${auth}`,
            },
            body: JSON.stringify({ id }),
         });
         return A.json();
      },
      mutationKey: ['updateExplore'],
      onSuccess() {
         setkey(Math.floor(Math.random() * 1000));
      },
   });

   if (isLoading) return <Loader on={isLoading} />;

   if (isSuccess && data) {
      return (
         <main className={`flex flex-col items-center w-full justify-center p-3`}>
            <header className='flex justify-start mb-10 mt-5 flex-col items-start sm:w-[90%] w-[97%]'>
               <p className={`${mode ? 'text-[hsl(0,0%,100%)]' : 'text-[hsl(0,0%,1%)]'} font-russ text-3xl`}>Explore</p>
               <p className={`${mode ? 'text-[hsl(0,0%,100%)]' : 'text-[hsl(0,0%,1%)]'} text-sm text-left font-russ font-thin`}>
                  Explore and discover friends.
               </p>
            </header>
            <section className='sm:w-[90%] w-[97%] mx-auto grid grid-cols-1 gap-4'>
               {isSuccess && data && data.explore.length > 0 ? (
                  data?.explore.map((item: { name: string; profileImg: string; tag: string; _id: string }, index: number) => {
                     return (
                        <div
                           key={index}
                           className={`flex flex-row items-center w-full p-3 justify-between ${
                              mode ? 'bg-[hsl(0,0%,25%)]' : 'bg-[#ECECEC]'
                           } rounded-lg`}
                        >
                           <div className='flex flex-row items-center'>
                              <img
                                 src={item.profileImg || Exp}
                                 alt='explore user image'
                                 className='w-12 h-12 rounded-full border border-[#c4c4c4] object-cover'
                              />
                              <p className={`flex justify-start ml-3 font-russ capitalize text-lg ${mode ? 'text-white' : 'text-black'}`}>
                                 {item.name}
                              </p>
                           </div>
                           <button
                              className={`${mode ? 'bg-[hsl(0,0%,10%)]' : 'bg-[hsl(0,0%,20%)]'} rounded-lg px-7 flex justify-center`}
                              onClick={() => mutation.mutate(item._id)}
                           >
                              <i className={`${mode ? 'text-white' : 'text-white'} font-thin text-xl self-center material-icons-outlined`}>
                                 person_add
                              </i>
                           </button>
                        </div>
                     );
                  })
               ) : (
                  <EmptyField text='Friend List' size='w-1/2' />
               )}
            </section>
         </main>
      );
   }
};

export default ExplorePage;
