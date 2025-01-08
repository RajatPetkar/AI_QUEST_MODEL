import React from "react";
import "./LeftSidebar.css";
import { NavLink } from "react-router-dom";
import Globe from "../../assets/Globe.svg";
import users from "../../assets/users.png"
import tags from "../../assets/tags.png"
import society from "../../assets/society.png";
import home from "../../assets/home.png"

const LeftSidebar = () => {

  return (
    <div className="left-sidebar">
      <nav className="side-nav">
      
        <button className="nav-btn">
          <NavLink to="/" className="side-nav-links" activeclassname="active">
            <p >Home</p>
          </NavLink>
        </button>

        <div className="side-nav-div">
          <div>
            <p>Public</p>
          </div>
          <button  className="nav-btn">
            <NavLink
              to="/Questions"
              className="side-nav-links"
              activeclassname="active"
            >
              <img className="img-left" src={Globe} alt="Globe" />
              <p style={{ paddingLeft: "10px" }}> Questions </p>
            </NavLink>
          </button>
          <button  className="nav-btn">
            <NavLink
              to="/Tags"
              className="side-nav-links"
              activeclassname="active"
            >
              <img className="img-left" src={tags} alt="Globe" />
              <p style={{ paddingLeft: "10px" }}> Tags </p>
            </NavLink>
          </button>
          <button  className="nav-btn">
            <NavLink
              to="/Users"
              className="side-nav-links"
              activeclassname="active"
            >
              <img className="img-left" src={users} alt="Globe" />
              <p style={{ paddingLeft: "10px" }}> Users </p>
            </NavLink>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
