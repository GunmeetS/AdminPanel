"use client"

import Link from "next/link";
import useAuth from "@/utils/useAuth";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import axios from "axios";
import { login } from "@/ProxyUrls";
import Image from "next/image";

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios
      .post(login, { email, password })
      .then((res) => {
        if (res.data.message === "success") {
          localStorage.setItem("jwt-token", res.data.token);
          setEmail("");
          setPassword("");
          router.push("/admin/dashboard");
        } else {
          router.push("/auth/login");
        }
      })
      .catch((err) => {
        alert(err.response.data.error )
      });
  };

  return (
    <>
      <section className="bg-gradient-to-b from-gray-700 via-gray-700 to-purple-600 min-h-screen flex items-center justify-center  ">
        <div className="bg-white  flex rounded-2xl shadow-lg max-w-3xl p-5 items-center ">
          <div className="md:w-1/2 px-8 lg:px-8 py-16 w-[80vw]">
            <h2 className="font-bold text-2xl  text-purple-700">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                className=" mt-8 rounded-xl border md:p-2 lg:p-2  p-4"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                className="rounded-xl border w-full md:p-2 lg:p-2 p-4"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button
                type="submit"
                className="bg-purple-800 rounded-xl text-white  hover:scale-105 duration-300 lg:py-3 md:py-2 p-4"
              >
                Login
              </button>
            </form>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>

            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Don't have an account?</p>
              <Link
                href="/auth/register"
                className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
              >
                Register
              </Link>
            </div>

          </div>

          <div className="md:block hidden w-1/2">
            <Image
              alt=""
              className="rounded-2xl"
              width={1887}
              height={1200}
              src="https://images.unsplash.com/photo-1479920252409-6e3d8e8d4866?q=80&w=870&auto=format&fit=crop&w=1887&h=1200"
              />
          </div>
        </div>
      </section>
    </>

  )
}
