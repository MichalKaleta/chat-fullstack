import { useState } from "react";
import axios from "axios";
import { Button, Input } from "../components/Form/Form";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { apiCall } from "../utils/apiCall";

type LoginParams = {
  getLogin: (login: string) => void;
};

const Login: React.FC<LoginParams> = ({ getLogin }) => {
  const [{ email, password }, setLoginData] = useState({
    email: "dude",
    password: "password",
  });

  const sendGuestName = async () =>
    apiCall.post("/api/guest", {
      guestName,
    });

  const sendLoginData = async () =>
    apiCall.post(`/api/login`, {
      email,
      password,
    });

  const {
    data: guestData,
    error: guestError,
    refetch: fetchGuest,
  } = useQuery<
    { data: { email: string; token: string } },
    AxiosError<{ data: string }>
  >("login", sendGuestName, {
    onSuccess: (res) => {
      console.log("SuCCESS");
      const email = res.data.email;
      const token = res.data.token;
      axios.defaults.headers.common = {
        Authorization: `bearer ${token}`,
      };
      apiCall.get("/api/chat").then(() => getLogin(email));
    },
    enabled: false,
  });
  console.log(guestData);

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
    },
  );
  // console.log(data);

  const error = guestError || undefined;
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
          value={email}
          placeholder="email"
          type="text"
          onChange={(e) =>
            setLoginData((state) => ({
              email: e.target.value,
              password: state.password,
            }))
          }
        />

        <Input
          value={password}
          placeholder="password"
          type="password"
          onChange={(e) => {
            setLoginData((state) => ({
              email: state.email,
              password: e.target.value,
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
