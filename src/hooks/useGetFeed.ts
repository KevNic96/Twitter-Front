import { useEffect, useState } from "react";
import { useHttpRequestService } from "../service/HttpRequestService";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export const useGetFeed = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [Load, setLoad] = useState(true)
  const posts = useAppSelector((state) => state.user.feed);

  const dispatch = useAppDispatch();

  const service = useHttpRequestService();

  const loadMore = async() =>{
    if(loading || !Load) return;

    setLoading(true);
    setError(false);

    try{
      const lastPostId = posts[posts.length - 1]?.id || '';
      const newPosts = await service.getPaginatedPosts(5, lastPostId, '');

      if(newPosts.length === 0){
        setLoad(false);
      } else{
        const updatedPosts = [...posts, ...newPosts];
        dispatch(updateFeed(updatedPosts));
        dispatch(setLength(updatedPosts.length));
      }
    } catch(e){
      setError(true);
      console.log(e);
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    loadMore();
  }, []);

  return {posts, loading, error, loadMore, Load}
};

/*
  useEffect(() => {
    try {
      setLoading(true);
      setError(false);
      service.getPosts(query).then((res) => {
        const updatedPosts = Array.from(new Set([...posts, ...res]));
        dispatch(updateFeed(updatedPosts));
        dispatch(setLength(updatedPosts.length));
        setLoading(false);
      });
    } catch (e) {
      setError(true);
      console.log(e);
    }
  }, [query]);

  return { posts, loading, error };
  */

