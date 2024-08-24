import React from "react";

function ContentCenter({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[90dvh] w-full  grid place-items-center py-10 ">
      {children}
    </div>
  );
}

export default ContentCenter;
