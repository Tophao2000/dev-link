import { type ReactNode } from "react";
import { Link } from "react-router-dom";

interface SocialProps {
  url: string;
  children: ReactNode;
}

function Social({ url, children }: SocialProps) {
  return (
    <>
      <Link to={url} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    </>
  );
}

export default Social;
