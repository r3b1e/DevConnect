import React from "react";

export default function AnimatedCrossButton({
  onClick = () => {},
  size = 20,
  className = "",
  title = "Close",
  ...props
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={title}
      title={title}
      {...props}
      className={`inline-flex items-center justify-center 
        w-10 h-10 rounded-md border-0 bg-transparent 
        cursor-pointer text-gray-800 transition 
        hover:bg-gray-200 focus:outline-none 
        focus:ring-2 focus:ring-blue-500 
        active:scale-95 ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className="transition-transform duration-200 group-hover:rotate-45"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M6 6 L18 18 M6 18 L18 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
