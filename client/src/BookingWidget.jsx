import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { Navigate, useParams } from "react-router";
import { UserContext } from "./UserContext";


export default function BookingWidget({place}){
   const [checkIn,setCheckIn]=useState('');
   const [checkOut,setCheckOut]=useState('');
   const [numberofGuests,setNumberofGuests]=useState(1);
   const [name,setName]=useState('');
   const [phone,setPhone]=useState('');
   const [redirect,setRedirect] = useState('');
   const {user} =useContext(UserContext);
   let noofdays=0;

   useEffect(()=>{
     if(user){
      setName(user.name);
     }
   },[user]);

   if(checkIn && checkOut){
    noofdays=differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
   }

   async function bookThisPlace() {
    const response = await axios.post('/bookings', {
      checkIn,checkOut,numberofGuests,name,phone,
      place:place._id,
      price:noofdays * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
    return (
        <>
           <div className="bg-white p-4 rounded-2xl shadow">
            <div className="text-2xl text-center">
              Price: ₹{place.price}/per night
            </div>
            <div className="rounded-2xl border mt-4">
                 <div className="flex">
                <div className="py-4 px-4 ">
                <label>Check in:</label>
                <input type="date" value={checkIn} onChange={ev =>setCheckIn(ev.target.value)} />
                </div>
                <div className="py-4 px-4 border-l">
                <label>Check out:</label>
                <input type="date" value={checkOut} onChange={ev =>setCheckOut(ev.target.value)}/>
                 </div>
               </div>
               <div className="py-4 px-4 border-t" >
                 <label>No of Guests:</label>
                <input type="number" value={numberofGuests} onChange={ev =>setNumberofGuests(ev.target.value)}/> 
                 </div>
            {noofdays > 0 && (
               <div className="py-3 px-3 border-1">
                <label>Full Name:</label>
                <input type="text" value={name} onChange={ev=>setName(ev.target.value)} placeholder="Aegon Targaryen" />
                <label>Phone Number:</label>
                <input type="tel" value={phone} onChange={ev=>setPhone(ev.target.value)} placeholder="1234" />
               </div> 
              
            )}
            </div>
          <button className="primary mt-4" onClick={bookThisPlace}>
            Book this Place <br />
            {noofdays > 0 && (
              <span>₹{noofdays * place.price}</span>
            )}
          </button>
        </div>
        </>
    )
}