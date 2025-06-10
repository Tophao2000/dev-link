import { type ButtonHTMLAttributes } from "react";

function Buttton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="submit"
      className="flex items-center justify-center gap-2 mb-7 text-white w-full max-w-xl bg-gradient-to-l from-yellow-500 to-orange-400 py-2 rounded-lg text-lg font-medium  hover:from-yellow-600 hover:to-orange-500 transition-colors duration-300"
      {...props}
    >
    </button>
  );
}

export default Buttton;
