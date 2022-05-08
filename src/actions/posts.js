import { UPDATE_POSTS } from './actionTypes';

export function fetchPosts() {
  return (dispatch) => {
    const url = 'https://codeial.codingninjas.com:8000/api/v2/posts?page=1&limit=5';
    fetch(url)
      .then((response) => {
        // console.log('response',response);
      return response.json();

      }).then((data)=> {
        console.log(data)
        dispatch(updatePosts(data.data.posts))
      })
  }
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}