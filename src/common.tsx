import React from "react";

export const H = (props: {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <span className={"text-fg-600 " + props.className}>{props.children}</span>
  );
};

export const Callout = ({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
}) => (
  <div className=" bg-bg-50 border px-3 py-1 rounded-xl shadow-xl pb-4 relative">
    <div className="text-2xl text-fg-700 font-bold">{title}</div>
    <hr className="mb-4" />
    {children}
  </div>
);
