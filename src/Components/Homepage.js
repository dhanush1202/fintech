import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import video from "../resources/bgvideo.mp4"

export default function Homepage() {
  const { handleSubmit, register, reset } = useForm();
  const submitform = (data) => {
    console.log(data);
    const credentials = {
      username: 'listmonk',
      password: 'lBjRdUAZVu9HxH7f'
    };

    axios.post('http://localhost:9000/api/subscribers', data, {
      headers: {
        'Content-Type': 'application/json'
      },
      auth: credentials
    })
    .then(response => {
      console.log('Successful response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
  }
  return (
    <div>
       <video src={video} className=" object-cover opacity-70 h-full w-[200vw] top-0 left-0 -z-3  absolute" autoPlay loop muted playsInline={true} disablePictureInPicture={true} ></video>
    <div className="flex justify-center items-center h-screen ">
      <form
        onSubmit={handleSubmit(submitform)}
        className="p-5 bg-slate-700 rounded-lg z-10"
      >
        <h2 className="sm:text-3xl text-xl mb-2 py-4 px-2 text-slate-300">
          Subscribe to our Newsletter
        </h2>
        <input
          type="text"
          placeholder="Name"
          className=" my-3 p-3 rounded-md w-full bg-[#ccd6f6] text-gray-800"
          required
          {...register("name")}
        />
        <input
          type="email"
          placeholder="Email"
          className=" my-3 p-3 rounded-md w-full bg-[#ccd6f6] text-gray-800"
          required
          {...register("email")}
        />
        <button
          type="submit"
          className="text-white border-2 hover:bg-pink-600 hover:border-pink-600 py-2 px-4 my-2 mx-auto rounded-lg text-xl duration-500"
        >
          Subscribe
        </button>
      </form>
    </div>
    </div>
  );
}
