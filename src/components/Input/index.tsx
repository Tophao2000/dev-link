import { type InputHTMLAttributes } from "react";

function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-11/12 max-w-xl bg-white text-black py-2 px-2.5 rounded-sm border-0 outline-none"
      {...props}
    />
  );
}

export default Input;
