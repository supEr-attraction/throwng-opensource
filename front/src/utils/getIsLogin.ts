export const getIsLogin = () => {
  return !!localStorage.getItem("jwt");
};
