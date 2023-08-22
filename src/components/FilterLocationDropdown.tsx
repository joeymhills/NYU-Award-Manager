
"use client"

import { Menu, Transition } from "@headlessui/react";
import { useAtom } from "jotai";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { searchLocationFilter } from "./atoms";
import { Fragment } from "react";

 export default function FilterLocationDropdown() {
  const [ location, setLocation ] = useAtom(searchLocationFilter)

  function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
  }


  return (
 
  <div className="w-full flex flex-col justify-center items-center">
  <Menu as="div" className="relative inline-block md:w-72 lg:w-96 text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-md font-bentonreg text-gray-900 drop-shadow-md ring-1 ring-inset
          ring-gray-300 hover:cursor-pointer hover:bg-gray-50">
         {(location == "") ? "Select a location" : location}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute hover:cursor-pointer left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> setLocation("NYU Langone")}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                NYU Langone 
                </a>
              )}
            </Menu.Item>


            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> setLocation("NYU Langone Hospital—Brooklyn")}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                NYU Langone Hospital—Brooklyn
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> setLocation("NYU Langone Hospital—Long Island")}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                NYU Langone Hospital—Long Island 
                </a>
              )}
            </Menu.Item>


            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> setLocation("NYU Langone Orthopedic Hospital")}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                NYU Langone Orthopedic Hospital
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> setLocation("Rusk Rehabilitation")}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                Rusk Rehabilitation
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> setLocation("Tisch Hospital and Kimmel Pavilion")}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                Tisch Hospital and Kimmel Pavilion
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> setLocation("Other")}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
               Other 
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    </div>
  )
}
