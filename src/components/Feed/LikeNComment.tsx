import { useMutation } from '@tanstack/react-query';
import { backendUrl } from '../main/utils/url';
import { useContext } from 'react';
import CommentContext from '../../context/comment';
import { queryClient } from '../../main';

export function LikeNComment({
   likes,
   comment,
   mode,
   userId,
   id,
   query,
   isLiked,
}: {
   likes: number;
   comment: any[];
   mode: boolean;
   userId: string;
   id: string;
   query: { refetch: Function };
   isLiked: boolean;
}) {
   let auth = localStorage.getItem('-jwtKey-');

   //mutate post like field
   const likeMutation = useMutation({
      mutationFn: async ({ id }: { id: string }) => {
         const A = await fetch(`${backendUrl}/function/post/like/inc/${id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `${auth}`,
            },
         });
         return A.json();
      },

      mutationKey: ['like', 'postlike'],

      onSuccess: () => {
         query.refetch();
      },
   });

   let { commentMod, setCommentMod } = useContext(CommentContext);

   return (
      <div className='flex flex-row items-center w-full justify-center my-2' data-user={userId} data-post={id}>
         {[
            { i: isLiked ? 'favorite' : 'favorite_border', val: likes },
            { i: 'chat_bubble', val: comment ? comment.length : 0 },
         ].map(({ i, val }, index) => {
            return (
               <div
                  className={`${mode ? 'bg-[#2b2b2b]' : 'bg-gray-100'} w-full p-1 px-2 rounded-full flex justify-center mx-1`}
                  onClick={() => {
                     if (index === 0) {
                        likeMutation.mutate({ id });
                        queryClient.refetchQueries();
                     } else {
                        query.refetch(['getComment', 'getPost']);
                        setCommentMod(id === commentMod ? '' : id);
                     }
                  }}
               >
                  <div className='flex flex-row justify-center cursor-pointer self-center w-full' key={index}>
                     <i
                        className={`${mode ? 'text-[hsl(0,0%,80%)]' : 'text-[hsl(0,0%,10%)]'} text-2xl material-icons-outlined text-center`}
                     >
                        {i}
                     </i>
                     <span
                        className={`${mode ? 'text-slate-100' : 'text-[#191919]'} text-[15px] text-center ml-0.5 self-center font-medium`}
                     >
                        {val}
                     </span>
                  </div>
               </div>
            );
         })}
      </div>
   );
}
