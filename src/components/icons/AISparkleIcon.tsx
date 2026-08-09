import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export function AISparkleIcon({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Main central AI sparkle star */}
      <path d="M12 3C12 7.5 8.5 11 4 11C8.5 11 12 14.5 12 19C12 14.5 15.5 11 20 11C15.5 11 12 7.5 12 3Z" />
      
      {/* Top-right secondary sparkle star */}
      <path d="M18.5 2.5C18.5 4.5 17 6 15 6C17 6 18.5 7.5 18.5 9.5C18.5 7.5 20 6 22 6C20 6 18.5 4.5 18.5 2.5Z" />
      
      {/* Bottom-left small circular dot */}
      <circle cx="6.5" cy="17.5" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default AISparkleIcon;
