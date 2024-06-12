"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

const RoundedIcon = ({ icon, title, to }) => {
  const router = useRouter();

  const onClickIconHandler = () => {
    router.push(to);
  };

  return (
    <div
      onClick={onClickIconHandler}
      className="p-2 rounded-full shadow cursor-pointer transition-transform duration-200 hover:bg-gray-200 hover:scale-105"
      title={title}
    >
      {icon}
    </div>
  );
};

export default RoundedIcon;
