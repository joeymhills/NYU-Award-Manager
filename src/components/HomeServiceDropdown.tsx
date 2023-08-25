"use client"

import { useRouter } from "next/navigation"
import { Menu, Transition } from "@headlessui/react";
import { useAtom } from "jotai";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { searchServiceFilter } from "./atoms";
import { Fragment } from "react";

 export default function HomeServiceDropdown() {
    const [ serviceLine, setServiceLine] = useAtom(searchServiceFilter)

  function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
  }
  
  const router = useRouter();

  return (
 
  <div className="flex flex-col justify-center items-center">
  <Menu as="div" className="relative inline-block w-72 sm:w-96 text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-ellipsis bg-white px-3 py-2 text-md font-bentonreg text-gray-900 drop-shadow-md ring-1 ring-inset
          ring-gray-300 hover:cursor-pointer hover:bg-gray-50">
         {(serviceLine == "") ? "Select a service line" : serviceLine}

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
        <Menu.Items className="absolute hover:cursor-pointer left-0 z-10 mt-2 w-72 sm:w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> {setServiceLine("Neurology & Neurosurgery");router.push("search?q=")}}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Neurology & Neurosurgery
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=>{setServiceLine("Diabetes & Endocrinology");router.push("search?q=")}}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Diabetes & Endocrinology
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={()=> {setServiceLine("Urology");router.push("search?q=")}}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Urology
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> {setServiceLine("Pulmonology & Lung Surgery");router.push("search?q=")}}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                 Pulmonology & Lung Surgery 
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> {setServiceLine("Gastroenterology & GI Surgery");router.push("search?q=")}}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                 Gastroenterology & GI Surgery 
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> {setServiceLine("Pulmonology & Lung Surgery");router.push("search?q=")}}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                 Pulmonology & Lung Surgery 
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> {setServiceLine("Cardiology, Heart & Vascular Surgery");router.push("search?q=")}}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Cardiology, Heart & Vascular Surgery
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> {setServiceLine("Orthopedics");router.push("search?q=")}}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                Orthopedics 
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> {setServiceLine("Rehabilitation");router.push("search?q=")}}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                Rehabilitation 
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> {setServiceLine("Cancer");router.push("search?q=")}}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                Cancer
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> {setServiceLine("Geriatrics");router.push("search?q=")}}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                 Geriatrics 
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> {setServiceLine("Rheumatology");router.push("search?q=")}}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                 Rheumatology 
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> {setServiceLine("Ear, Nose and Throat");router.push("search?q=")}}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                 Ear, Nose and Throat 
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> {setServiceLine("Obstetrics & Gynecology");router.push("search?q=")}}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                 Obstetrics & Gynecology 
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> {setServiceLine("Psychiatry");router.push("search?q=")}}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                 Psychiatry 
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> {setServiceLine("Ophthalmology");router.push("search?q=")}}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Ophthalmology
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> {setServiceLine("Pediatrics");router.push("search?q=")}}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                 Pediatrics 
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> {setServiceLine("Nephrology");router.push("search?q=")}}
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                Nephrology 
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=> {setServiceLine("Other ");router.push("search?q=")}}
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
