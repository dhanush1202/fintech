import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function EditProfile() {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userName = localStorage.getItem("email"); 
        const response = await axios.get(
          `http://localhost:4000/user/editprofile?name=${userName}`
        );
        setUserDetails(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, []);

  const submit = async (data) => {
    try {
      await axios.put("http://localhost:4000/user/editprofile", data);
      alert("Profile updated successfully");
    } catch (error) {
      alert(`Error updating profile: ${error}`);
    }
  };

  const {
    handleSubmit,
    register,
    formState: errors,
    reset,
  } = useForm({
    defaultValues: userDetails,
  });

  return (
    <div className="bg-slate-300 w-full min-h-screen flex justify-center items-center">
      <div className={`lg:w-[50vw] w-[90vw] h-fit bg-slate-700 p-5 rounded-lg`}>
        <h1 className="text-4xl text-white uppercase py-5">Update Profile</h1>
        <div className="w-full flex items-center justify-center mx-auto">
          <form
            className="flex flex-col max-w-[600px] w-full group"
            onSubmit={handleSubmit(submit)}
          >
            <input
              type="text"
              placeholder="Username"
              className="my-1 p-2  bg-[#ccd6f6] text-gray-800 rounded-md"
              name="name"
              required
              {...register("name")}
            />
            <input
              placeholder="Email"
              className="my-1 p-2  bg-[#ccd6f6] text-gray-800 rounded-md"
              name="email"
              required
              {...register("email")}
            />
            <input
              placeholder="Password"
              className="my-1 p-2  bg-[#ccd6f6] text-gray-800 rounded-md"
              name="password"
              type="password"
              required
              {...register("password")}
            />

            <button
              type="submit"
              className="text-white border-2 hover:bg-pink-600 hover:border-pink-600 py-2 px-4 my-2 mx-auto rounded-lg text-xl duration-500"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
