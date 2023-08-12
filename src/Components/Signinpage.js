import React, { useState } from 'react';
import { useForm } from "react-hook-form";

export default function Signinpage({ log, sign }) {
  const tochange = () => {
    sign(!log);
  };

  const [toggle, settoggle] = useState("");
  const [show, setshow] = useState("password");

  const showpwd = () => {
    if (toggle === "") {
      settoggle("checked");
      setshow("text");
    } else {
      settoggle("");
      setshow("password");
    }
  };

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    reset,
    formState: { errors },
    watch
  } = useForm();

  const passwordValidation = {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  };

  const confirmPasswordValidation = {
    required: "Confirm Password is required",
    validate: (value) =>
  value === watch("password") || "Passwords do not match",

  };

  const submitsignin = (data) => {
    console.log(data);
    window.alert("sign in");
    reset();
  };

  return (
    <div>
      <div className={`lg:w-[50vw] w-[90vw] h-fit bg-slate-700 p-5 rounded-lg`} id="signin">
        <h1 className="text-4xl text-white uppercase py-5">Sign in</h1>
        <div className="w-full flex items-center justify-center mx-auto">
          <form
            className="flex flex-col max-w-[600px] w-full group"
            onSubmit={handleSubmit1(submitsignin)}
          >
            <input
              type="text"
              placeholder="Name"
              className="my-1 p-2  bg-[#ccd6f6] text-gray-800 rounded-md"
              name="name"
              required
              {...register1("name")}
            />
            <input
              type="email"
              placeholder="Email"
              className="my-1 p-2 bg-[#ccd6f6] rounded-md text-gray-800"
              name="email"
              required
              {...register1("email")}
            />
            <input
              type={show}
              placeholder="Password"
              className={`my-1 p-2 bg-[#ccd6f6] rounded-md text-gray-800 ${
                errors.password ? "border-red-500" : ""
              }`}
              name="password"
              required
              {...register1("password", passwordValidation)}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <input
              type={show}
              placeholder="Confirm Password"
              className={`my-1 p-2 bg-[#ccd6f6] rounded-md text-gray-800 ${
                errors.cpassword ? "border-red-500" : ""
              }`}
              name="cpassword"
              required
              {...register1("cpassword", confirmPasswordValidation)}
            />
            {errors.cpassword && (
              <p className="text-red-500">{errors.cpassword.message}</p>
            )}
            <button
              type="submit"
              className="text-white border-2 hover:bg-pink-600 hover:border-pink-600 py-2 px-4 my-2 mx-auto rounded-lg text-xl duration-500"
            >
              Sign in
            </button>
          </form>
        </div>
        <div className="flex justify-between py-4 text-white">
          <h1 onClick={showpwd} className="cursor-pointer">
            {" "}
            <input
              type="checkbox"
              checked={toggle}
              className="checkbox"
              onChange={showpwd}
            />{" "}
            Show password
          </h1>
        </div>
        <hr className="border-1 w-full" />
        <div className=" flex  w-full justify-center p-5">
          <h2>
            Existing User?{" "}
            <button className=" text-pink-950 hover:text-pink-700 duration-500" onClick={tochange}>
              {" "}
              Log in
            </button>
          </h2>
        </div>
      </div>
    </div>
  );
}
