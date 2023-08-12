import React, { useState } from "react";
import Loginpage from "./Loginpage";
import Signinpage from "./Signinpage";

export default function Login() {
 
  
  
  const [log, sign] = useState(true);
  
  return (
    <div className="w-full h-screen bg-slate-300">
      <div className="flex h-full items-center justify-center ">
        {log ? <Loginpage log={log} sign = {sign}/>: <Signinpage log={log} sign={sign}/>}
      </div>
    </div>
  );
}
