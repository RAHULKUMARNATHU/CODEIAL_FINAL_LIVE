import { ADD_COMMENT, ADD_POST, UPDATE_POSTS, UPDATE_POST_LIKE } from './actionTypes';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';

export function fetchPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts();
    fetch(url)
      .then((response) => {
        // console.log('response',response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(updatePosts(data.data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function createPost(content) {
  return (dispatch) => {
    const url = APIUrls.createPost();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body:getFormBody({content}),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('DATA' ,data);

      if(data.success){
        dispatch(addPost(data.data.post));
      }
    })
  };
}



export function createComment(content, postId) {
  return (dispatch) => {
    const url = APIUrls.createComment();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content, post_id: postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addComment(data.data.comment, postId));
        }
      });
  };
}

export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId,
  };
}


export function addLike(id , likeType ,userId){
  return(dispatch) => {
    const url = APIUrls.toggleLike();
    fetch(url ,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
    .then(response => response.json())
    .then(data =>{
      console.log('LIKE_DATA',data)

      if(data.success){
        dispatch(addLikeToStore(id,userId));
      }
    } )
  }
}

export function addLikeToStore(postId ,userId){
  return{
    type :UPDATE_POST_LIKE,
    postId,
    userId,
  }
}