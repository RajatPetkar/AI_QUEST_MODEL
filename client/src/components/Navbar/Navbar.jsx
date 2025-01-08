import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import decode from 'jwt-decode';

import Avatar from '../Avatar/Avatar';
import { setCurrentUser } from '../../actions/currentUser';

import logo from '../../assets/icon.png';
import bars from '../../assets/bars-solid.svg';
import './Navbar.css';

const Navbar = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector((state) => state.currentUserReducer);
  // const [searchResults, setSearchResults] = useState([]);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
    navigate('/');
    dispatch(setCurrentUser(null));
  };



  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
  }, [User?.token, dispatch]);

  return (
    <nav className="main-nav">
      <div className="navbar">
        <button className="slide-in-icon">
          <img src={bars} alt="bars" width="15" />
        </button>
        <div className="navbar-1">
          <Link to="/" className="nav-item nav-logo">
            <span className="nav-logo-container">
              <img src={logo} alt="logo" className="logo-img" />
              {/* <span className="logo-text">AI Quset</span> */}
            </span>
          </Link>

          <Link
            className="nav-item nav-btn res-nav"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Chatbot
          </Link>
          <Link to="/community" className="nav-item nav-btn res-nav">
            Community
          </Link>
          <Link to="/company" className="nav-item nav-btn res-nav">
            Register Company
          </Link>
        </div>
        <div className="navbar-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >

          </form>
          {User === null ? (
            <Link to={'/Auth'} className="nav-item nav-links">
              Log In
            </Link>
          ) : (
            <>
              <Avatar
                backgroundColor="#161717"
                px="12px"
                py="7px"
                borderRadius="50%"
                color="white"
              >
                <Link
                  to={`/Users/${User?.result?._id}`}
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  {User.result.name.charAt(0).toUpperCase()}
                </Link>
              </Avatar>
              <button className="nav-item nav-links" onClick={handleLogout}>
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
      {/* {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((result) => (
            <Link
              key={result._id}
              to={`/questions/${result._id}`}
              className="search-result-item"
            >
              {result.title}
            </Link>
          ))}
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;
