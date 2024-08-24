import React from "react";

interface DeleteItemBtnProps {
  onDeleteClick(): void;
}

function DeleteItemBtn({ onDeleteClick }: DeleteItemBtnProps) {
  return (
    <button
      onClick={onDeleteClick}
      className="text-lg px-5 py-2 bg-error rounded-3xl text-bgColor hover:bg-errorDark"
    >
      Delete Item
    </button>
  );
}

export default DeleteItemBtn;
