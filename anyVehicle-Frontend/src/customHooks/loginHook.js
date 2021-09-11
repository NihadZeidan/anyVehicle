import superAgent from "superagent";

const useHandleLogin = (e, setUser) => {
  e.preventDefault();
  superAgent
    .post("https://bid-fast-and-last.herokuapp.com/login")
    .send({
      email: e.target.email.value,
      password: e.target.password.value,
    })
    .then((data) => {
      // reactCookie.save("token", data.body.token);
      // reactCookie.save("userName", data.body.user.userName);
      setUser(data.body);
      e.target.reset();
      //   history.push("/profile");
    })
    .catch((e) => console.error(e));
};

export default useHandleLogin;
