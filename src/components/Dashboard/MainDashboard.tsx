"use client"
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthProvider'
import { decodeJWT } from '@/helpers/decoder';
import MainDashboardSeller from './MainDashboardSeller';
import MainDashboardUser from './MainDashboardUser';
import { useProfile } from '@/context/ProfileProvider';
import { getUser } from '@/helpers/services';
import { UserDto } from '@/types';
import Navbar from '../Navbar';



function MainDashboard() {
  const { token } = useAuth()
  const { userDtos, setUserDtos } = useProfile()
  const [triggerReload, setTriggerReload] = useState(false);



    useEffect(() => {
      if (token) {
        const decoded = decodeJWT(token);
        if (decoded && decoded.id) {
          const userProfile = async () => {
            const res = await getUser(token, decoded.id);
            setUserDtos(res);
          };
          userProfile();
        }
      }
    }, [token, triggerReload, setUserDtos]);

  if (!userDtos) {
    return 
  }

  console.log(userDtos)

if (userDtos.role === 'seller') {
  return (
    <div>
      <div className="w-full h-32 flex items-center">
        <Navbar />
      </div>
      <MainDashboardSeller/>
    </div>
  );
}

if (userDtos.role === "user") {
  return (
    <div>
      <div className="w-full h-32 flex items-center ">
        <Navbar />
      </div>
      <MainDashboardUser/>
    </div>
  );
}

}



export default MainDashboard