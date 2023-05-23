import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import "./NavbarStyles.css";
import Cookies from 'universal-cookie';
import { Navigate } from "react-router-dom";

class Navbar extends Component {
  state = { clicked: false , check : false};
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    const cookies = new Cookies();
    

    const logout = () => {
      cookies.remove('user');
      this.setState({check: true });
    }

    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">Trippy</h1>
        <div className="menu-icons" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>

        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link className={item.cName} to={item.url}>
                  <i className={item.icon}></i>
                  {item.title}
                </Link>
              </li>
            );
          })}
          <button onClick={logout}>Logout</button>
          {
            this.state.check&&<Navigate to="/" replace={true} />
          }
        </ul>
      </nav>
    );
  }
}

export default Navbar;
