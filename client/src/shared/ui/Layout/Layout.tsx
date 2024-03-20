import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ILayout {
  children: ReactNode;
}
export const Layout: FC<ILayout> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  }, []);

  return (
    <div className="flex min-h-screen justify-center items-center">
      {children}
    </div>
  );
};
