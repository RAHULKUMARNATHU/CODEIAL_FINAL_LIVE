export function getFormBody(params) {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); //'user name' => 'user%20name'
    let encodedvalue = encodeURIComponent(params[property]); // rahul 123 => rahul%20123
    formBody.push(encodedKey + '=' + encodedvalue);
  }
  return formBody.join('&'); //'username = rahul& password = 123123'
}

export function getAuthTokenFromLocalStorage() {
  return localStorage.getItem('token');
}
