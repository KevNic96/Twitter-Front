import React, { useState, useEffect } from "react";
import { StyledContainer } from "../../components/common/Container";
import Tweet from "../../components/tweet/Tweet";
import Loader from "../../components/loader/Loader";
// import { HttpService } from "../../service/HttpRequestService";
import TweetBox from "../../components/tweet-box/TweetBox";
import { StyledH5 } from "../../components/common/text";
import { StyledFeedContainer } from "../home-page/components/contentContainer/FeedContainer";
import CommentFeed from "../../components/feed/CommentFeed";
import { useHttpRequestService } from "../../service/HttpRequestService";

// Punto 3)

  const PostPage = () =>{

    const [postId] = useState(window.location.href.split("/")[4]) // setPostId?
    // window.location.href.split : obtiene la URL completa de la ventana y la divide en partes con "/"
    // [4] accede al 5to elemento del array resultante

    const [post, setPost] = useState(undefined);

    const service = useHttpRequestService();

    const fetchPost = () => {
      service
        .getPostById(postId)
        .then((res) => {
          setPost(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  
    useEffect(() => {
      fetchPost();
    }, [postId])

    return (
      <StyledContainer borderRight={"1px solid #ebeef0"}>
        <StyledContainer
          padding={"16px"}
          borderBottom={"1px solid #ebeef0"}
          maxHeight={"53px"}
        >
          <StyledH5>Tweet</StyledH5>
        </StyledContainer>
        <StyledFeedContainer>
          {post ? (
            <>
              <Tweet post={post} />
              <StyledContainer
                borderBottom={"1px solid #ebeef0"}
                padding={"16px"}
              >
                <TweetBox parentId={postId} />
              </StyledContainer>

              <StyledContainer minHeight={"53.5vh"}>
                <CommentFeed postId={postId} />
              </StyledContainer>
            </>
          ) : (
            <StyledContainer justifyContent={"center"} alignItems={"center"}>
              <Loader />
            </StyledContainer>
          )}
        </StyledFeedContainer>
      </StyledContainer>
    );
  }

export default PostPage;

/*
class PostPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: window.location.href.split("/")[4],
      post: undefined,
    };

    this.service = new HttpService().service;
  }

  componentDidMount() {
    this.fetchPost();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.postId !== this.state.postId) {
      this.fetchPost();
    }
  }

  fetchPost() {
    this.service
      .getPostById(this.state.postId)
      .then((res) => {
        this.setState({ post: res });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  */
