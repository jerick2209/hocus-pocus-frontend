const checkUserLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export default checkUserLoggedIn;
