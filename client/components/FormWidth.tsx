import React from "react";

function FormWidth({ children }: { children: React.ReactNode }) {
  return (
    <div className="xl:w-1/2 md:w-2/4 sm:w-3/4 sm:px-0 px-5  mx-auto">
      {children}
    </div>
  );
}

export default FormWidth;
