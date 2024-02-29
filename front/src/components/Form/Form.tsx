import React from "react";

function Button({ onClick = () => null, text = "Submit" }) {
	return (
		<>
			<button
				className=" bg-black ml-2 mt-2 rounded-md"
				onClick={(e) => {
					e.preventDefault();
					onClick();
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
					{text}
				</span>
			</button>
		</>
	);
}

function Input({
	placeholder = "",
	type = "button",
	label = "",
	name = label || "",
	onChange = () => null,
}) {
	return (
		<>
			{label && <label htmlFor={name || label || ""}>{label}</label>}
			<input
				name={name || label || ""}
				type={type}
				className="w-96 border-black border-2 p-2.5 
                    focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] 
                    active:shadow-[2px_2px_0px_rgba(0,0,0,1)] 
                    rounded-md m-2"
				placeholder={placeholder}
				onChange={onChange}
			/>
		</>
	);
}

export { Button, Input };
