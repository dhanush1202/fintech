import React from 'react';
import { useForm} from 'react-hook-form';

export default function Homepage() {
  const {handleSubmit, register, reset} = useForm();
  const submitform = (data) => {
    console.log(data);

    reset();
  }
  return (
    <div className="flex justify-center items-center h-screen bg-slate-300 ">
      <form onSubmit={handleSubmit(submitform)} className="p-5 bg-slate-700 rounded-lg">
        <h2 className="sm:text-3xl text-xl mb-2 py-4 px-2 text-slate-300">Subscribe to our Newsletter</h2>
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
  );
}
