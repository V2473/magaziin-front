import React from "react";
import SignoutButton from "./SignoutButton";

const Appbar = () => {
  return (
    <div className="flex justify-end gap-4 p-4 bg-gray-200 text-black">
      <SignoutButton />
    </div>
  );
};

export default Appbar;
