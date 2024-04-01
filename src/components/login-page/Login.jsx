import { useState } from "react";

import AbbeyLogo from "../../assets/logos/abbey.svg"
import { Link, useNavigate } from "react-router-dom";


const LoginPage = () => {

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const baseUrl = process.env.REACT_APP_BASE_URL
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            email,
            password
        }

        const response = await fetch(`${baseUrl}api/user/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then( res => res.json())

        if (response.status === 200){
            localStorage.setItem("abbeyUserToken", response.token)
            navigate('dashboard')
        }
        else alert("Error!")

        console.log(response)
    }

    return (
        <div className="w-full h-screen bg-white flex items-center text-blue-900">
            <div className="mx-auto bg-slate-200 w-1/2 rounded-md shadow-xl">
                <div className="mb-3">
                    <img src={AbbeyLogo} alt="Abbey Logo" className="w-1/2 mx-auto" />
                </div>

                <div className="flex flex-col gap-6 items-center pb-4">
                    <h1 className="w-full font-extrabold text-2xl text-center">Login</h1>
                    <form onSubmit={handleSubmit} className="w-[80%] flex flex-col gap-6">
                        <label className="block">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                Email
                            </span>
                            <input required type="email" name="email" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)}/>
                        </label>

                        <label className="block">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                Password
                            </span>
                            <input required type="password" name="password" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
                        </label>
                        <button type="submit" className="bg-blue-900 hover:bg-blue-800 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 rounded-md cursor-pointer font-bold">
                            Submit
                        </button>
                        <div className="flex justify-between text-sm">
                            <span >
                                <Link to={'/register'}>Register</Link></span>
                            <span className="text-red-500 text-sm font-light cursor-pointer">Forgot password?</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;