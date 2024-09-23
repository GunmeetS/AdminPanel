'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
  return (
    <>
    <div className={`bg-gradient-to-b from-gray-700 via-gray-700 to-purple-600 text-white absolute w-[250px]  h-screen transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-4">
        <div className="flex justify-end">
  
        <button onClick={toggleSidebar} className="bg-purple-600 lg:hidden text-white px-4 py-2 rounded">&times;</button>
      </div>
      <div className="p-2 flex">
                    <Link href="/">
                        <Image src="/assets/images/logo.svg" alt="Company Logo" width={300} height={300} />
                    </Link>
                </div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <ul>
                <li className="py-2 pt-6"><Link href="/admin/dashboard" className="hover:text-gray-300">Home</Link></li>
                <li className="py-2"><Link href="/admin/dashboard/addpage" className="hover:text-gray-300">Add Page</Link></li>
                <li className="py-2"><Link href="/admin/dashboard/editpage" className="hover:text-gray-300">Edit Page</Link></li>
                <li className="py-2"><Link href="/admin/dashboard/deletepage" className="hover:text-gray-300">Delete Page</Link></li>
                <li className="py-2">
            <Link
              href="/auth/login"
              onClick={() => {
                localStorage.removeItem("jwt-token") }
              }
              className="text-red-400"
            >

              Logout
            </Link>
          </li>

            </ul>
        </div>
    </div>
  
    <div className="flex-1 p-6 lg:hidden">
        <button onClick={toggleSidebar} className="bg-blue-500 text-white px-4 py-2 rounded">Toggle Sidebar</button>
    </div>
  </>
  )
  }
