/**
 * @class Navbar
 * @version 2.0.0
 * @author alanjimenez
 * @summary Barra de navegación
 */
import React from 'react';

import WithContext from '@app/ServiceContext';

class Navbar extends React.Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   openMenuDrawer = () => {
      
   }

   sendClickedElement = ({ target }) => {
      
   }

   render() {

      return <header className="top-bar" onClick={this.sendClickedElement}>
         <div className="topbar-container">
            <div className="brand"><i className="prb pr-palace-wedding"></i></div>
            <div className="navbar-container">
               {/* Menu Desktop */}
               <div className="navbar-top-container hide-for-medium-only hide-for-small-only show-for-large">
                  <nav className="nav-top-user show">
                     <a href="#">Welcome Elaine</a>
                     <a href="#"><i className="fa fa-ring"></i> My Wedding</a>
                     <a href="#"><i className="fa fa-child"></i> My Profile</a>
                  </nav>
                  <nav className="nav-top-links">
                     <a href="#">Logout</a>
                     <a href="#">Gallery</a>
                     <a href="#">Blog</a>
                     <a href="#">FAQs</a>
                     <a href="#">Contact Us</a>
                     <a href="#"><i className="fa fa-envelope"></i> Subscribe</a>
                     <a href="#"><i className="fa fa-phone"></i> <i className="fa fa-chevron-down"></i> </a>
                     <a href="#"><i className="fa fa-globe"></i> <i className="fa fa-chevron-down"></i> </a>
                  </nav>
               </div>
               <nav className="nav-primary hide-for-medium-only hide-for-small-only show-for-large">
                  <a href="#" className="submenu visible">Our Resorts
                           <aside>
                        <div className="container">
                           <div className="container-1">
                              <h1>By Destination:</h1>
                              <ul className="col-1">
                                 <li> <span><i className="fa fa-chevron-right"></i> Cancun</span>
                                    <ul>
                                       <li><i className="fa fa-chevron-right"></i> Beach Palace</li>
                                       <li><i className="fa fa-chevron-right"></i> Sun Palace</li>
                                       <li><i className="fa fa-chevron-right"></i> Moon Palace Cancun</li>
                                       <li><i className="fa fa-chevron-right"></i> Le Blanc Spa Resort Cancun</li>
                                       <li><i className="fa fa-chevron-right"></i> The Grand At Moon Palace cancun</li>
                                    </ul>
                                 </li>
                              </ul>
                           </div>
                           <div className="container-2">
                              <ul className="col-2">
                                 <li><i className="fa fa-chevron-right"></i> <span>Cozumel</span>
                                    <ul>
                                       <li><i className="fa fa-chevron-right"></i> Cozumel Palace</li>
                                    </ul>
                                 </li>
                                 <li><i className="fa fa-chevron-right"></i> <span>Isla Mujeres</span>
                                    <ul>
                                       <li><i className="fa fa-chevron-right"></i> Isla Mujeres Palace</li>
                                    </ul>
                                 </li>
                                 <li><i className="fa fa-chevron-right"></i> <span>Playa del Carmen</span>
                                    <ul>
                                       <li><i className="fa fa-chevron-right"></i> Playacar Palace</li>
                                    </ul>
                                 </li>
                              </ul>
                              <ul className="col-3">
                                 <li><i className="fa fa-chevron-right"></i> <span>Los Cabos</span>
                                    <ul>
                                       <li><i className="fa fa-chevron-right"></i> Le Blanc Resort Spa Los Cabos</li>
                                    </ul>
                                 </li>
                                 <li><i className="fa fa-chevron-right"></i> <span>Ocho Rios, Jamaica</span>
                                    <ul>
                                       <li><i className="fa fa-chevron-right"></i> Moon Palace Jamaica</li>
                                    </ul>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </aside>
                  </a>
                  <a href="#">Destination Weddings</a>
                  <a href="#">Complimentary Benefits</a>
                  <a href="#">Offers</a>
                  <a href="#">Planning</a>
                  <a href="#">Religious &amp; Cultural Offerings</a>
               </nav>

               {/* Menu small */}
               <nav id="menu-mobile" className="hide-for-large">
                  <span className="collapsible">
                     <a onClick={this.openMenuDrawer}>Our Resorts <i className="fa fa-chevron-down"></i></a>
                     <div id="drawer-wrapper" className="collapsible-items">
                        <a href="#">Beach Palace</a>
                        <a href="#">Sun Palace</a>
                        <a href="#">Moon Palace Cancún</a>
                        <a href="#">Le Blanc Spa Resorts Cancún</a>
                        <a href="#">The Grand At Moon Palace Cancún</a>
                        <a href="#">Moon Palace Jamaica</a>
                        <a href="#">Isla Mujeres Palace</a>
                        <a href="#">Playacar Palace</a>
                        <a href="#">Le Blanc Spa Resort Los Cabos</a>
                     </div>
                  </span>
                  <a id="toggledrawer">
                     <i className="fa fa-bars fa-1x rounded-icon"></i>
                  </a>
               </nav>
            </div>
         </div>
      </header>
   }

}

Navbar.defaultProps = {
};

export default WithContext(Navbar);