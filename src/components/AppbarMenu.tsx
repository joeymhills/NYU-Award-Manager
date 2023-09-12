"use client"

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ChevronDownIcon, EllipsisHorizontalCircleIcon, EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { signIn, signOut } from 'next-auth/react'

export const LogoutButton = () => {
  return <button onClick={() => signOut()}>Sign Out</button>
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AppbarMenu() {
  return (
    <Menu as="div" className="fixed top-2 left-3 z-60 inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-semibold text-gray-900" >
          <EllipsisVerticalIcon className="-mr-1 h-9 w-9 text-white" aria-hidden="true" />
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
        <Menu.Items className="absolute left-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/addAward"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-lg'
                  )}
                >
                 Add award 
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/admin2"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-lg'
                  )}
                >
                Admin Page 
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => signOut()}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900 hover:cursor-pointer' : 'text-gray-700',
                    'block px-4 py-2 text-lg hover:cursor-pointer'
                  )}
                >
                 Sign out
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}