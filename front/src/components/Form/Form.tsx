import { HTMLInputTypeAttribute, ComponentProps, ReactNode } from "react";

type ButtonProps = {
  text?: ReactNode;
};

function Button({
  onClick = () => undefined,
  text,
  type,
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & ButtonProps) {
  return (
    <>
      <button
        type={type}
        className={`bg-black mx-2 mt-2 rounded-md h-11 ${className}`}
        onClick={onClick}
        {...props}
      >
        <span
          className={`flex text-align-center -translate-x-1 -translate-y-1 
            border-2 border-black bg-yellow-500 p-1 px-2 text-2xl hover:-translate-y-1.5 hover:-translate-x-1.5 
            active:translate-x-0 active:translate-y-0 
            rounded-md transition-all h-11`}
        >
          {text || children}
        </span>
      </button>
    </>
  );
}

type InputProps = {
  label?: string;
};

function Input({
  placeholder = "",
  type = "text",
  label = "",
  name = label || "",
  value = "",
  onChange,
  className,
}: ComponentProps<"input"> & InputProps) {
  return (
    <>
      {label && <label htmlFor={name || label || ""}>{label}</label>}
      <input
        value={value}
        name={name || label}
        type={type}
        className={`w-96 border-black border-2 text-2xl p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md m-2 ${className}`}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
}

type InputContainerProps = {
  className?: string;
  children: string | JSX.Element | JSX.Element[];
  justify?: "start" | "end";
};

const InputContainer = ({
  className,
  children,
  justify,
}: InputContainerProps) => (
  <div
    className={`flex items-center text-2xl${
      justify === "start" ? "justify-start" : "justify-end"
    } ${className}`}
  >
    {children}
  </div>
);

export { Button, Input, InputContainer };
