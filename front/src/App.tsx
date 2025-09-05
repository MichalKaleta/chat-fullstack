import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Router from "./Router";
import Guest from "./components/Guest/Guest";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import "./App.scss";

function App() {
  const [login, setLogin] = useState("");
  const [value, setValue] = useState(2);

  console.log(login);
  return (
    <main className="min-w-auto font-mono px-10 text-2xl">
      <Box>
        <Tabs
          className="header__tabs"
          value={value}
          onChange={(_, value) => setValue(value)}
        >
          {["LOGIN", "REGISTER", "GUEST"].map((name) => (
            <Tab label={name} />
          ))}
        </Tabs>
      </Box>
      {!login && (
        <>
          {value === 0 && <Login getLogin={(login) => setLogin(login)} />}
          {value === 1 && <Register />}
          {value === 2 && <Guest getLogin={(login) => setLogin(login)} />}
        </>
      )}

      <div className="flex justify-center">
        <Router />
      </div>
    </main>
  );
}
export default App;
