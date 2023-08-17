import { useContext,useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router";
import {Link} from "react-router-dom";
import axios from 'axios';
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function AccountPage(){
    const {ready,user,setUser}= useContext(UserContext);
    const [redirect,setRedirect] = useState(null);
    let{subpage}  = useParams();
    if (subpage === undefined) {
      subpage = 'profile';
    }
    if(!ready){
        return 'Sit Back tight.....'
    }
   async function logout(){
   await axios.post('/logout');
    setRedirect('/');
    setUser(null);
   };

    if(ready && !user && !redirect){
     return <Navigate to={'/login'}/>
    }
  
  
  

 
    if (redirect) {
      return <Navigate to={redirect} />
    }
   
    return (
        <div>
           <AccountNav />

            <div className="flex align-content: space-between">
              { subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto my-30 mt-8">
                  Logged in as {user.name} ({user.email})
                  <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
              )};
            </div>
            <div>
              { subpage === 'places' && (
                <PlacesPage />
              )}
            </div>
        </div>
    )
}