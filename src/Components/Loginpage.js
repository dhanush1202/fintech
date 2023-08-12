import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { userLogin } from "../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
export default function Loginpage() {
  const { userobj, isError, isSuccess, isLoading, errMsg } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // let dispatch = useDispatch();
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
  const { register, handleSubmit, reset } = useForm();
  const submitlogin = (data) => {
    const actionObj=userLogin(data)
    dispatch(actionObj)
    // console.log(isSuccess);
    // if (isSuccess) {
    //   dispatch()
    //   navigate("/dashboard");
    // }

    // window.alert("logged in");
    reset();
  };
  return (
    <div>
      <div className={`lg:w-[50vw] w-[90vw] h-fit bg-slate-700 p-5 rounded-lg`}>
        <h1 className="text-4xl text-white uppercase py-5">Login</h1>
        <div className="w-full flex items-center justify-center mx-auto">
          <form
            className="flex flex-col max-w-[600px] w-full group"
            onSubmit={handleSubmit(submitlogin)}
          >
            <input
              type="text"
              placeholder="Username"
              className="p-2  bg-[#ccd6f6] text-gray-800 rounded-md"
              name="name"
              required
              {...register("uname")}
            />
            <input
              type={show}
              placeholder="Password"
              className="my-4 p-2 bg-[#ccd6f6] rounded-md text-gray-800"
              name="email"
              required
              {...register("password")}
            />
            <button
              type="submit"
              className="text-white border-2 hover:bg-pink-600 hover:border-pink-600 py-2 px-4 my-2 mx-auto rounded-lg text-xl duration-500"
            >
              Log in
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
          <h1>forgot password?</h1>
        </div>
        <hr className="border-1 w-full" />
        <div className=" flex p-10 w-full justify-center">
          <h2>
            Not a member?{" "}
            <NavLink
              className=" text-pink-950 hover:text-pink-700 duration-500"
              to="/signin"
            >
              {" "}
              Create Account
            </NavLink>
          </h2>
        </div>
      </div>
    </div>
  );
}