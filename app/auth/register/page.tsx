"use client"

import { checkToken, createUser } from "@/ProxyUrls";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

export default function Home() {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [contactError, setContactError] = useState<any>(null);
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (e: any) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const router = useRouter();
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
          router.push("/auth/register");
          return;
        }

        const response = await axios.get(checkToken, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (!response.data) {
          router.push("/auth/login");
        } else {
          router.push("/admin/dashboard");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    checkAuthentication();
  }, [router]);


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (register.password !== confirmPassword )  {
      setError('Passwords do not match.');
    } else {
      setError('');
    }
    await axios
    .post(createUser, register)
    .then((res) => {
      console.log(res,"contact");
      
      setContactError(null);
      if (res.data.message === "success") {
        router.push("/auth/login");
        alert("Register Success...");
      }
    })
    .catch((err) => {
      if (err.response.status === 400) {
        alert(err.response.data.error)
        setContactError(err.response.data.errors);
      } else {
        console.log("internal server error!");
      }
    });
  };

  return (
    <section className="bg-gradient-to-b from-gray-700 via-gray-700 to-purple-600 min-h-screen flex items-center justify-center  p-5">
      <div className="bg-white  flex rounded-2xl shadow-lg max-w-3xl p-5 items-center ">
        <div className="md:block hidden w-1/2">
          <Image
            alt=""
            height={1887}
            width={1200}
            className="rounded-2xl"
            src="https://images.unsplash.com/photo-1479920252409-6e3d8e8d4866?q=80&w=870&auto=format&fit=crop&w=1887&h=1200"
          />
        </div>
        <div className="md:w-1/2 px-8 md:px-8">
          <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            Create your account. It’s free and only take a minute
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-49">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={register.name}
              onChange={changeHandler}
              className="p-2 rounded-xl mt-8 border w-full"
            />
            {contactError && contactError.name ? (
              <>
                <p className="text-red-500  text-xs">
                  {contactError.name}
                </p>
              </>
            ) : (
              <></>
            )}
            <input
              className="p-2 mt-4 rounded-xl border"
              type="email"
              name="email"
              value={register.email}
              onChange={changeHandler}
              placeholder="Email"
            />
            {contactError && contactError.email ? (
              <>
                <p className="text-red-500  text-xs">
                  {contactError.email}{" "}
                </p>
              </>
            ) : (
              <></>
            )}
            <input
              className="p-2 mt-4 rounded-xl border w-full"
              type="password"
              name="password"
              value={register.password}
              onChange={changeHandler}
              placeholder="Password"
            />
            {contactError && contactError.password ? (
              <>
                <p className="text-red-500  text-xs	">
                  {contactError.password}{" "}
                </p>
              </>
            ) : (
              <></>
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 mt-4 rounded-xl border w-full"
            />
            {error && <p className="text-red-500  text-xs">{error}</p>}



            <button
              type="submit"
              className="bg-[#002D74] mt-4 rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              Register
            </button>
          </form>
          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Have an account?</p>
            <Link
              href="/auth/login"
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
            >
              Login
            </Link>
          </div>


        </div>
      </div>
    </section>
  )
}
