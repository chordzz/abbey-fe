import { useEffect, useState } from "react"
import AbbeyLogo from "../../assets/logos/abbey.svg"
import { Link, useNavigate } from "react-router-dom"


const RegisterPage = () => {

    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")
    const [loading, setLoading ] = useState(false)

    const baseUrl = process.env.REACT_APP_BASE_URL
    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            email,
            username,
            password
        }

        try {
            setLoading(true)
            const response = await fetch(`${baseUrl}api/user/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            .then( res => {
                if (res.ok){
                    setLoading(false)
                    return res.json()
                } else if (res.status === 400){
                    setLoading(false)
                    setError("An Error Occurred")
                    throw new Error('400, An error occurred')
                } else if (res.status === 403){
                    setLoading(false)
                    setError("User with this email already exists")
                    throw new Error('403, User with this email already exists')
                }
            })
    
            if(response.status === 200) {
                navigate('/')
            }
        } catch(err) {
            console.log(err.message)
        }
        
    }

    useEffect(() => {
        const timerId = setTimeout(() => {
            setError("")
        }, 2000);

        return (() => clearTimeout(timerId))
    }, [error])

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
                                Firstname
                            </span>
                            <input required type="text" name="firstname" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter Firstname" onChange={(e) => setFirstName(e.target.value)} />
                        </label>

                        <label className="block">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                Lastname
                            </span>
                            <input required type="text" name="lastname" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter Lastname" onChange={(e) => setLastName(e.target.value)} />
                        </label>

                        <label className="block">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                Username
                            </span>
                            <input required type="text" name="username" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        </label>

                        <label className="block">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                Email
                            </span>
                            <input required type="email" name="email" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)} />
                        </label>

                        <label className="block">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                Password
                            </span>
                            <input required type="password" name="password" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                        </label>

                        {
                            error ?
                            <div className="">
                                <p className="text-sm font-semibold text-red-500">{error}</p>
                            </div>
                            :
                            null
                        }

                        <button type="submit" className="bg-blue-900 hover:bg-blue-800 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 rounded-md cursor-pointer font-bold" disabled={loading}>
                            Submit
                        </button>
                        <span className="text-center text-sm font-light cursor-pointer">
                            <Link to={'/'}>Login</Link>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;