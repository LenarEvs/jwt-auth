import { FC, ReactNode } from "react";

interface ILayout {
  children: ReactNode;
}
export const Layout: FC<ILayout> = ({ children }) => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      {children}
    </div>
  );
};
