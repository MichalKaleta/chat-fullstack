import { useState } from "react";
import axios from "axios";
import { Button, Input } from "../Form/Form";
import { useQuery } from "react-query";
import { AxiosError } from "axios";

const host = "localhost";
//const host2 = "172.18.176.94";

type LoginParams = {
  getLogin: (login: string) => void;
};

const Login: React.FC<LoginParams> = ({ getLogin }) => {
  const [{ login, password, guestName = "" }, setLoginData] = useState({
    login: "dude",
    password: "password",
    guestName: "",
  });

  const sendGuestName = async () =>
    axios.post("/api/guest", {
      guestName,
    });

  const sendLoginData = async () =>
    axios.post(`/${host}:3000/api/login`, {
      login,
      password,
    });

  const {
    data: guestData,
    error: guestError,
    refetch: fetchGuest,
  } = useQuery<
    { data: { login: string; token: string } },
    AxiosError<{ data: string }>
  >("login", sendGuestName, {
    onSuccess: (res) => {
      const login = res.data.login;
      const token = res.data.token;
      axios.defaults.headers.common = {
        Authorization: `bearer ${token}`,
      };
      axios.get("/api/chat").then(() => getLogin(login));
    },
    enabled: false,
  });
  console.log(guestData, fetchGuest);

  const {
    data,
    error: authError,
    refetch: fetchAuth,
  } = useQuery<{ data: { login: string } }, AxiosError<{ data: string }>>(
    "login",
    sendLoginData,
    {
      onSuccess: (res) => getLogin(res.data.login),
      enabled: false,
    }
  );
  console.log(data);

  const error = guestError || authError || undefined;
  return (
    <div className="my-4">
      {error && (
        <div className="bg-red-500 text- text-slate-100 w-96 p-2">
          <p className="">
            {typeof error.response?.data === "string"
              ? error.response.data
              : "An error occurred"}
          </p>
        </div>
      )}
      <form>
        <Input
          value={login}
          placeholder="username"
          type="text"
          onChange={(e) =>
            setLoginData((state) => ({
              login: e.target.value,
              password: state.password,
              guestName: state.guestName,
            }))
          }
        />

        <Input
          value={password}
          placeholder="password"
          type="password"
          onChange={(e) => {
            setLoginData((state) => ({
              login: state.login,
              password: e.target.value,
              guestName: state.guestName,
            }));
          }}
        />
        <Button
          className="items-center justify-center text-black"
          aria-label="Like"
          onClick={() => fetchAuth()}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
