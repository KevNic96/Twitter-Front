import type { PostData, SingInData, SingUpData } from "./index";
import axios from "axios";
import { S3Service } from "./S3Service";
import { AxiosInterceptor } from "./Interceptors/axios.interceptors";

AxiosInterceptor();

const url = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const axiosInstance = axios.create()

const httpRequestService = {
  signUp: async (data: Partial<SingUpData>) => {
    const res = await axios.post(`${url}/auth/signup`, data);
    if (res.status === 201) {
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      return true;
    }
  },

  signIn: async (data: SingInData) => {
    const res = await axios.post(`${url}/auth/login`, data);
    if (res.status === 200) {
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      return true;
    }
  },

  createPost: async (data: PostData) => {
    const res = await axios.post(`${url}/post`, data);
    if (res.status === 201) {
      const { upload } = S3Service;
      for (const imageUrl of res.data.images) {
        const index: number = res.data.images.indexOf(imageUrl);
        await upload(data.images![index], imageUrl);
      }
      return res.data;
    }
  },

  deletePost: async (id: string) => {
    await axios.delete(`${url}/post/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },

  createComment: async(data: PostData) =>{
    const res = await axios.post(`${url}/comment/${data.parentId}`,{
      content: data.content,
      image: data.images
    });
    if(res.status === 201)
    {
      return res.data
    }
  },

  getPaginatedPosts: async (limit: number, after: string, query: string) => {
    const res = await axios.get(`${url}/post/${query}`, {
      params: {
        limit,
        after,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },

  getPosts: async (query: string) => {
    const res = await axios.get(`${url}/post/${query}`, {
      params:{
        limit: query[0],
      }
    });
    if (res.status === 200) {
      return res.data;
    }
  },

  getRecommendedUsers: async (limit: number, skip: number) => {
    const res = await axios.get(`${url}/user/`, {
      params: {
        limit,
        skip,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },

  me: async () => {
    const res = await axios.get(`${url}/user/me`, {});
      /*headers: {
        Authorization: localStorage.getItem("token"),
      },
    });*/
    if (res.status === 200) {
      return res.data;
    }
  },

  getPostById: async (id: string) => {
    const res = await axios.get(`${url}/post/${id}`,{});
    /*
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    */
    if (res.status === 200) {
      return res.data;
    }
  },

  createReaction: async (postId: string, reaction: string) => {
    const res = await axios.post(
      `${url}/reaction/${postId}`,
      {},
      /*
      { type: reaction },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    */
   {
    params: {
      type:reaction,
    },
   }
  );
    if (res.status === 201) {
      return res.data;
    }
  },

  deleteReaction: async (postId: string, reaction: string) => {
    const res = await axios.delete(`${url}/reaction/${postId}`, {
      params: {
        type: reaction,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },

  followUser: async (userId: string) => {
    const res = await axios.post(`${url}/follower/follow/${userId}`, {});
      /*
      {},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );*/
    if (res.status === 201) {
      return res.data;
    }
  },

  unfollowUser: async (userId: string) => {
    const res = await axios.post(`${url}/follower/unfollow/${userId}`, {});
    /*
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });*/
    if (res.status === 200) {
      return res.data;
    }
  },

  doesFollow: async(id: string) => {
    const res = await axios.get(`${url}/follower/follow/${id}`, {});
    if( res.status === 200){
      return res.data;
    }
  },

  getMutualFollows: async () =>{
    const res = await axios.get(`${url}/follower/mutual/`, {});

    if(res.status === 200){
      return res.data;
    }
  },

  searchUsers: async (username: string, limit: number, skip: number) => {
    try {
      const cancelToken = axios.CancelToken.source();

      const response = await axios.get(`${url}/user/by_username/${username}`, {
        // headers: {
        //   Authorization: localStorage.getItem("token"),
        // },
        params: {
          // username,
          limit,
          skip,
        },
        cancelToken: cancelToken.token,
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (!axios.isCancel(error)) console.log(error);
    }
  },

  getProfile: async (id: string) => {
    const res = await axios.get(`${url}/user/${id}`, {});
      // headers: {
      //   Authorization: localStorage.getItem("token"),
      // },
    // });
    if (res.status === 200) {
      return res.data;
    }
  },

  getPaginatedPostsFromProfile: async (
    limit: number,
    after: string,
    id: string
  ) => {
    const res = await axios.get(`${url}/post/by_user/${id}`, {
      // headers: {
      //   Authorization: localStorage.getItem("token"),
      // },
      params: {
        limit,
        after,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },
  getPostsFromProfile: async (id: string) => {
    const res = await axios.get(`${url}/post/by_user/${id}`, {});
    //   headers: {
    //     Authorization: localStorage.getItem("token"),
    //   },
    // });

    if (res.status === 200) {
      return res.data;
    }
  },

  isLogged: async () => {
    const res = await axios.get(`${url}/user/me`, {});
    //   headers: {
    //     Authorization: localStorage.getItem("token"),
    //   },
    // });
    return res.status === 200;
  },

  getProfileView: async (id: string) => {
    const res = await axios.get(`${url}/user/${id}`, {});
    //   headers: {
    //     Authorization: localStorage.getItem("token"),
    //   },
    // });

    if (res.status === 200) {
      return res.data;
    }
  },

  deleteProfile: async () => {
    const res = await axios.delete(`${url}/user/me`, {});
    //   headers: {
    //     Authorization: localStorage.getItem("token"),
    //   },
    // });

    if (res.status === 204) {
      localStorage.removeItem("token");
    }
  },

  /*
  getChats: async () => {
    const res = await axios.get(`${url}/chat`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },
  */

  createChat: async (id: string) => {
    const res = await axios.post(`${url}/chat`,
      {
        users: [id],
      });
      // {
      //   headers: {
      //     Authorization: localStorage.getItem("token"),
      //   },
      // }
      if(res.status === 201){
        return res.data;
      }
  },

  getChat: async (id: string) => {
    const res = await axios.get(`${url}/message/chat/${id}`, {});
      // headers: {
      //   Authorization: localStorage.getItem("token"),
      // },

    if (res.status === 200) {
      return res.data;
    }
  },

  getPaginatedCommentsByPostId: async (
    id: string,
    limit: number,
    after: string
  ) => {
    const res = await axios.get(`${url}/post/comment/by_post/${id}`, {
      // headers: {
      //   Authorization: localStorage.getItem("token"),
      // },
      params: {
        limit,
        after,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },

  getCommentsByPostId: async (id: string) => {
    const res = await axios.get(`${url}/comment/${id}`, {});
    //   headers: {
    //     Authorization: localStorage.getItem("token"),
    //   },
    // });
    if (res.status === 200) {
      return res.data;
    }
  },

  //Se crea para verificar el token Punto 1)
  verifyToken: async(token: string) =>{
    const res = await axios.post(`${url}/auth/verifyToken`, {token})
    console.log(res)
    if(res.status === 200)
    {
      return res.data.isValid
    }

    return false
  },

  // Se crea para subir una imagen a un post Punto 2)
  uploadPostImage: async (file: File) => {
    const res = await axios.get(`${url}/post/image/presignedUrl`, {
      params: {
        filetype: file.type,
      },
    });
    if (res.status === 200) {
      const presignedUrl = res.data.presignedUrl;
      const imageUrl = res.data.fileUrl;

      try {
        const uploadResponse = await axiosInstance.put(presignedUrl, file, { //Interceptor punto 4)
          headers: {
            "Content-Type": file.type,
          },
        });
        if (uploadResponse.status === 200) {
          return imageUrl;
        }
      } catch (err) {
        console.error(err);
      }
    }
  },

  getContacts: async () =>{
    const res = await axios.get(`${url}/message/chat`, {});

    if(res.status === 200){
      return res.data;
    }
  }
};

const useHttpRequestService = () => httpRequestService;

// For class component (remove when unused)
// class HttpService {
//   service = httpRequestService;
// }

export { useHttpRequestService };
