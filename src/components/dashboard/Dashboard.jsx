import { useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

  const [userDetails, setUserDetails] = useState(null);
  const [activeList, setActiveList] = useState('myFriends')
  const [allFriends, setAllFriends] = useState([])

  const token = localStorage.getItem("abbeyUserToken")
  const baseUrl = process.env.REACT_APP_BASE_URL
  const navigate = useNavigate()

  const fetchUserDetails = async (token) => {

    const response = await fetch(`${baseUrl}api/user/`, {
      method: 'GET',
      headers: {
          "Authorization": `Bearer ${token}`
      },
    })
    .then( res => res.json())

    if (response.status === 200) {
      setUserDetails(response.data)
    } else {
      navigate('/')
    }

  }

  const fetchAllFriends = async () => {

    const response = await fetch(`${baseUrl}api/friend/all`)
    .then( res => res.json())

    if (response.status === 200) {
      console.log(response.message)
      setAllFriends(response.data)
    }

  }

  const handleLogout = () => {
    localStorage.removeItem("abbeyUserToken")
    navigate('/')
  }

  const handleActiveListChange = (list) => {
    if (list !== activeList) setActiveList(list)
    return
  }

  const addFriend = async (item) => {

    const newArr = allFriends.map( (friend, idx) => {      
      if (friend.name === item.name) return { ...friend, added: true}
      return friend
    })
    setAllFriends(newArr)

    const response = await fetch(`${baseUrl}api/user/addfriend/${item.id}`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then( res => res.json())

    if (response.status === 200) {
      console.log(response.message)
      setAllFriends(response.data)
    }
  }

  useEffect(() => {

    if (!token){
      navigate('/')
    }
    fetchAllFriends()
    fetchUserDetails(token)

  }, []);

  // useEffect(() => {
  //   console.log(allFriends)
  // }, [allFriends])

  return (
    <div className="w-screen h-screen flex items-center">
      {userDetails ? (
        <div className="md:w-[65%] w-[80%] mx-auto bg-slate-200 p-5 rounded-md text-center">
          <div className="py-5 flex justify-center flex-col items-center">
            <FaUser className="mx-auto text-5xl text-blue-800" />
            <h1 className="text-3xl font-bold text-center text-blue-900 mt-4">{`${userDetails.firstName} ${userDetails.lastName}`}</h1>
            <p className="text-lg font-semibold">{userDetails.username}</p>
            <span className="italic flex">
              <HiOutlineMail className="text-2xl text-blue-900 mr-2" />
              {userDetails.email}
            </span>
          </div>

          <button className="underline font-bold text-red-600" onClick={handleLogout}>Logout</button>

          <div className="text-lg px-10 py-5 bg-white rounded-md mt-4">
            <h3 className="text-2xl text-center"> Friends </h3>
            <div className="text-center my-4">
              <button disabled={activeList === 'myFriends'} className="bg-red-600 rounded-md font-bold text-white py-2 px-2 text-sm mx-2 disabled:bg-red-200 disabled:cursor-auto " onClick={() => handleActiveListChange("myFriends")}>My Friends</button>
              <button disabled={activeList === 'allFriends'} className="bg-red-600 rounded-md font-bold text-white py-2 px-2 text-sm mx-2 disabled:bg-red-200 disabled:cursor-auto " onClick={() => handleActiveListChange("allFriends")}>Add New Friends</button>
            </div>

            {/* Add New friends list */}
            {
              activeList === "allFriends" ? 
                <div className="max-h-[300px] overflow-scroll">
                  <ul class="divide-y divide-slate-200">
                      
                    {
                      allFriends && allFriends.map( item => {
                        return (
                          <li class="flex py-4 first:pt-0 last:pb-0">
                            <FaUser class="h-10 w-10 rounded-full text-blue-800" />
                            <div class="ml-3 overflow-hidden">
                              <p class="text-sm font-medium text-slate-900">{`${item.firstName} ${item.lastName}`}</p>
                              <p class="text-sm text-slate-500 truncate">{item.username}</p>
                            </div>
                            <span>
                              {
                                item.added ? <button>Added</button> : <button onClick={() => addFriend(item)}>Add Friend</button>
                              }
                            </span>
                          </li>
                        )
                      })
                    }

                  </ul>
                </div>
                :
                null
            }
            

            {/* My friends list */}
            {
              activeList === "myFriends" ? 
                <div className="max-h-[300px] overflow-scroll">
                  <ul class="divide-y divide-slate-200">
                  
                    {
                      userDetails && userDetails.friends.map( item => {
                        return (
                          <li class="flex py-4 first:pt-0 last:pb-0">
                            <FaUser class="h-10 w-10 rounded-full text-blue-800" />
                            <div class="ml-3 overflow-hidden">
                              <p class="text-sm font-medium text-slate-900">{`${item.firstName} ${item.lastName}`}</p>
                              <p class="text-sm text-slate-500 truncate">{item.username}</p>
                            </div>
                          </li>
                        )
                      })
                    }

                  </ul>
                </div>
                :
                null
            }
          </div>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
