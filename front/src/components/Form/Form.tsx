import { HTMLInputTypeAttribute } from "react";

type ButtonProps = {
	className?: string;
	text?: string | number;
	onClick?: (...args: unknown[]) => unknown | Promise<void> | void;
	children?: string | JSX.Element | JSX.Element[];
};
function Button({
	onClick,
	text = "Submit",
	className = "",
	children,
}: ButtonProps) {
	return (
		<>
			<button
				className={`bg-black mx-2 mt-2 rounded-md h-11 ${className}`}
				onClick={(e) => {
					e.preventDefault();
					onClick && onClick(e);
				}}
			>
				<span
					className={`flex text-align-center 
                        -translate-x-1 -translate-y-1 
                        border-2 border-black 
                        bg-yellow-500 p-1 px-2 text-xl  
                        hover:-translate-y-1.5  hover:-translate-x-1.5 
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
	className?: string;
	label?: string;
	onChange?: (...args: unknown[]) => void;
	name?: string;
	type?: HTMLInputTypeAttribute;
	value?: string;
	placeholder?: string | undefined;
};

function Input({
	placeholder = "",
	type = "text",
	label = "",
	name = label || "",
	value = "",
	onChange,
	className,
}: InputProps) {
	return (
		<>
			{label && <label htmlFor={name || label || ""}>{label}</label>}
			<input
				value={value}
				name={name || label}
				type={type}
				className={`w-96 border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md m-2 ${className}`}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</>
	);
}

type InputContainerProps = {
	className?: string;
	children: string | JSX.Element | JSX.Element[];
};

const InputContainer = ({ className, children }: InputContainerProps) => (
	<div className={`flex items-center justify-end ${className}`}>{children}</div>
);

export { Button, Input, InputContainer };
