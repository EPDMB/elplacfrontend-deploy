"use client";
import { useEffect, useState, useRef } from "react";

import { SearchbarProps, UserDto } from "@/types";
import SearchIcon from "./SearchIcon.tsx";
const Searchbar: React.FC<SearchbarProps> = ({ users, setUsersFiltered }) => {
  const [search, setSearch] = useState<string>("");

  // const [showResults, setShowResults] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       searchRef.current &&
  // !searchRef.current.contains(event.target as Node)
  //     ) {
  //       setShowResults(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    // setShowResults(true);
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUsersFiltered(filteredUsers);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center  border border-[#D0D5DD] rounded-lg py-2 px-4 w-40 md:w-60 bg-white ">
        <div>
          <SearchIcon className=" bg-red-100 text-red-500" />
        </div>
        <input
          onChange={handleChange}
          value={search}
          className="focus:outline-none text-primary-darker flex-grow ml-2 bg-transparent"
          placeholder="Buscar"
        />
      </div>
      {/* {showResults && search !== "" && usersFiltered.length > 0 && (
        <ul className="border p-2 rounded-md bg-white absolute top-full left-0 w-full shadow-md mt-n1">
          {usersFiltered.map((user) => (
            <li
              className="text-primary-darker  cursor-pointer  "
              key={user.id}
              onClick={() => setShowResults(false)}>
              {user.name}
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default Searchbar;
