const getUser = user => {
  const userJson = localStorage.getItem("user");
  return JSON.parse(userJson);
};

const storeUser = user => {
  const userJson = JSON.stringify(user);
  localStorage.setItem("user", userJson);
};

export {getUser, storeUser};