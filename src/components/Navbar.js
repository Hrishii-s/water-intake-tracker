import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {removeUser} from "../store/AuthSlice"


function Navbar(){
  var user=useSelector(store=>store.auth.user)
  const dispatch=useDispatch()
  var navigate=useNavigate()



  function handleLogout(){
    if(user){
      axios.post('https://demo-blog.mashupstack.com/api/logout/',{},{
        headers:{'Authorization':"Bearer "+user.token}
      })
      alert(`you r logging out from ${user.email}`)
       dispatch(removeUser())
       navigate("/login/")
    }
      

  }
    return(
        <div>
        <nav className="navbar navbar-expand-lg py-3" style={{backgroundColor:' #e3f2fd'}}>
  <div className="container-fluid">
    <a className="navbar-brand text-emphasis" href="/">HydrateToday</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item"><NavLink className="nav-link" to="/" activeClassName="active" aria-current="page">Home</NavLink></li>
        <li className="nav-item"> <NavLink className="nav-link" to="/view/" activeClassName="active" aria-current="page">Track</NavLink></li>
        {user?(
        <>
        <li className="nav-item"><span className='nav-link' onClick={handleLogout}> Logout </span></li>
        </>
    ):(
      <li className="nav-item"> <NavLink className="nav-link" to="/login/" activeClassName="active" aria-current="page">Login</NavLink></li>
    )
        }


        </ul>
  </div>
  </div>
</nav>
</div>
    )
}

export default Navbar