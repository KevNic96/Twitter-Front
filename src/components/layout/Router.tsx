import React, { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import { StyledSideBarPageWrapper } from "../../pages/side-bar-page/SideBarPageWrapper";
import NavBar from "../navbar/NavBar";
import SignUpPage from "../../pages/auth/sign-up/SignUpPage";
import SignInPage from "../../pages/auth/sign-in/SignInPage";
import HomePage from "../../pages/home-page/HomePage";
import RecommendationPage from "../../pages/recommendation/RecommendationPage";
import ProfilePage from "../../pages/profile/ProfilePage";
import TweetPage from "../../pages/create-tweet-page/TweetPage";
import CommentPage from "../../pages/create-comment-page/CommentPage";
import PostPage from "../../pages/post-page/PostPage";
import { useHttpRequestService } from "../../service/HttpRequestService";
import ChatPage from "../../pages/chat-page/ChatPage";
import Loader from "../loader/Loader";


/*
const WithNav = () => {
  return (
    <StyledSideBarPageWrapper>
      <NavBar />
      <Outlet />
    </StyledSideBarPageWrapper>
  );
};
*/

const WithNav = () => {
  const token = localStorage.getItem("token")?.split(" ")[1]
  const service = useHttpRequestService()
  const [isValid, setIsValid ] = useState(true)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (token) {
      service.verifyToken(token)
        .then(res => {
          console.log(res)
          res ? setIsValid(true) : setIsValid(false)
        })
        .catch(e => {
          setIsValid(false)
        })
    } else {
      setIsValid(false)
    }
    setLoading(false)
  }, [])

  return (
    <>
      {loading && <Loader />}
      {isValid &&  !loading &&
      <>
        <StyledSideBarPageWrapper>
          <NavBar />
          <Outlet />
        </StyledSideBarPageWrapper>
      </>}
      {!loading && !isValid && <Navigate to="/sign-in" replace={true} />}
    </>
  );
};

export const ROUTER = createBrowserRouter([
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    element: <WithNav />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/recommendations",
        element: <RecommendationPage />,
      },
      {
        path: "/profile/:id",
        element: <ProfilePage />,
      },
      {
        path: "/post/:id",
        element: <PostPage />,
      },
      {
        path: "/compose/tweet",
        element: <TweetPage />,
      },
      {
        path: "/post/:id",
        element: <CommentPage />,
      },
      //TODO CHAT PATH HERE
      {
        path: "/chat",
        element: <ChatPage />,
      }
    ],
  },
]);
