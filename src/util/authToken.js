export function getAuthToken() {
  const localData = localStorage.getItem("userlogin");
  let token = "";
  if (localData) {
    token = JSON.parse(localData);
  }
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}
