import React from "react";

const Layout = ({ children }: React.PropsWithChildren) => {
  return <div className="min-h-screen bg-slate-100">{children}</div>;
};

export default Layout;
