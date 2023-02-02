import {getDocs, collection} from 'firebase/firestore'
import { db } from '../../config/auth';
import { useEffect, useState } from 'react';
import { Post } from './post';

export interface Post {
    id: string;
    userId: string;
    title: string;
    description: string;
    username: string;
}
export const Main = ()=>{
    const [postsList, setPostsList] = useState<Post[] | null>(null)
    
    const postsRef = collection(db,'post');
        const getPosts = async()=>{
            const data = await getDocs(postsRef)
            setPostsList(data.docs.map((doc)=>({...doc.data(),id:doc.id})) as Post[])
        }
        useEffect(()=>{
            getPosts();
        },[]);
        
    return (
    <div>
        {postsList?.map((post)=>(
        <Post post={post} />
    ))}
    </div>
    )
}