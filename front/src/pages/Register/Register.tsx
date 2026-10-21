import { useState, FC } from "react";
import { Button, Input } from "../../components/Form/Form";
import "./Register.scss";
import { apiCall } from "../../utils/apiCall";

const Register: FC = () => {
  const [{ email, password }, setRegisterData] = useState({
    email: "",
    password: "",
  });

  async function sendRegisterData(): Promise<void> {
    console.log(email, password);
    apiCall
      .post("/api/register", {
        email,
        password,
      })
      .then((res) => console.log(res));
  }

  return (
    <div className="my-4">
      <form>
        <Input
          value={email}
          placeholder="email"
          type="email"
          onChange={(e) =>
            setRegisterData((state) => ({
              ...state,
              email: e.target.value,
            }))
          }
        />

        <Input
          value={password}
          type="password"
          placeholder="password"
          onChange={(e) =>
            setRegisterData((state) => ({
              ...state,
              password: e.target.value,
            }))
          }
        />

        <Button onClick={sendRegisterData}>Submit</Button>
      </form>
    </div>
  );
};
export default Register;
