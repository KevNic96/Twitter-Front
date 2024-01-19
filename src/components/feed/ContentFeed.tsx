import React, { useEffect, useRef } from "react";
import Feed from "./Feed";
import { useGetFeed } from "../../hooks/useGetFeed";

const ContentFeed = () => {
  const { posts, loading, loadMore, Load } = useGetFeed();
  const loader = useRef(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(()=>{
    if(observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      entries =>{
        if(entries[0].isIntersecting && Load){
          loadMore();
        }
      },
      {
        root:null,
        rootMargin: "1px",
        threshold:1.0
      }
    );

    if(loader.current){
      observer.current.observe(loader.current);
    }

    return () => {
      if(observer.current){
        observer.current.disconnect();
      }
    };
  },[Load, loadMore]);

  // return <Feed posts={posts} loading={loading} />;

  return (
    <div>
      <Feed posts={posts} loading={loading} />
      <div className="loading" ref={loader}></div>
    </div>
  )
};


export default ContentFeed;
