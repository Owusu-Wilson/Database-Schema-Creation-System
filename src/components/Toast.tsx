import React from 'react'
import { ToastContainer, toast } from "react-toastify";

export default function Toast() {

    
  const notify = () => toast("Wow so easy!");
  
  return (
    <div>
         <ToastContainer
          position="bottom-right"
          theme="dark"
          hideProgressBar={false}
          newestOnTop={true}
        />
    </div>
  )
}
