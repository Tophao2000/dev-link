import { type InputHTMLAttributes } from "react";

function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full max-w-xl bg-white text-black py-2 px-2.5 rounded-sm border-2 border-gray-800 dark:border-none outline-none focus:ring-2 focus:ring-yellow-500"
      {...props}
    />
  );
}

export default Input;
