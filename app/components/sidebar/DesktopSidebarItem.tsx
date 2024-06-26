import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface IDesktopSidebar {
  lable: string;
  icon?: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}
const DesktopSidebarItem: React.FC<IDesktopSidebar> = ({
  lable,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick} className="list-none">
      <Link
        href={href}
        className={clsx(
          `group flex gap-x-3  p-3 rounded-md text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100`,
          active && 'bg-gray-100 text-black'
        )}
      >
        <Icon className="h-6 w-6 shrink-0"/>
        <span className="sr-only">{lable}</span>
      </Link>
    </li>
  );
};

export default DesktopSidebarItem;
