import { useState } from "react";
import { PencilAltIcon } from "@heroicons/react/outline";

import { DateTimFormater } from "../../helpers/dateTImeFormater";
import { ChoseImage } from "../ChoseImageProfile";
import Icon from "../../assets/user.png";
import { useUser } from "../../context/user.context";

export function Profile() {
  const [visible, setIsVisible] = useState(false);
  const { user } = useUser();

  return (
    <div className='flex space-x-2 items-center'>
      <div className='relative'>
        <img
          src={user.avatarUrl ? user.avatarUrl : Icon}
          alt={user.name}
          className='w-16 rounded-full'
        />
        <button
          className='absolute -bottom-2 -right-1 bg-silver p-[1px] rounded-full'
          onClick={(e) => {
            setIsVisible(true);
          }}
        >
          <PencilAltIcon className='text-white stroke-1 z-10 w-4' />
        </button>
      </div>
      <div className='flex flex-col'>
        <div className='flex'>
          <p>{user.name}</p>
          <span className='ml-1 text-silver'>@{user.userName}</span>
        </div>
        <div>
          <p>{DateTimFormater(user.createdAt ? user.createdAt : "")}</p>
        </div>
      </div>
      <ChoseImage isVisible={visible} setIsVisible={setIsVisible} />
    </div>
  );
}
