/**
 * @class WeddingLayout
 * @version 1.0.0
 * @author alanjimenez
 * @summary Layout para las páginas de Weddings
 */
import WithContext from '@app/ServiceContext';
import { Footer, Image, Navbar, Sidebar } from '@components';
import Banner from '@docs/img/portada-desktop.jpg';
import BannerThumb from '@docs/img/portada-desktop_thumb.jpg';
import BannerMobile from '@docs/img/portada-mobile.jpg';
import BannerMobileThumb from '@docs/img/portada-mobile_thumb.jpg';
import React from 'react';

import Template from '@layouts/template';
import { Footer } from '../components/footer';


class WeddingLayout extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedMenuItem: null
      };
      this.mainContainer = React.createRef();
   }

   componentDidMount() {
      this.updateSidebar(null, location.pathname);
      // Título del sitio
      if (this.props.title) {
         document.title = this.props.title + " - Palace Resorts Wedding";
      }
   }


	/**
	 * Actualiza la información mostrada en el sidebar después de hacer clic en algún botón
	 * @param {event} e El evento capturado por el elemento HTML
	 * @param {string} selected El valor o url del elemento de menú que disparó el evento
	 */
   updateSidebar = (e, selected) => {
      this.setState({ selectedMenuItem: selected });

      if (['my-wedding', 'profile'].indexOf(selected) >= 0) {
         // Mostrar sidebar
         this.mainContainer.current.classList.add('container-20-80');
         this.mainContainer.current.classList.remove('container-full-width');
      } else {
         // No mostrar sidebar
         this.mainContainer.current.classList.remove('container-20-80');
         this.mainContainer.current.classList.add('container-full-width');
      }
   }

   static getDerivedStateFromProps(props, state) {
      let newProps = {};
      let omitProps = [];
      Object.keys(props).forEach(key => {
         if (omitProps.indexOf(key)) {
            if (props[key] != state[key]) {
               newProps[key] = props[key];
            }
         }
      });
      return Object.keys(newProps).length > 0 ? newProps : null;
   }

   render() {

      return <Template theme='wedding-theme'>
         {/* Barra de navegación principal */}
         <Navbar onClick={this.updateSidebar} />

         {/* Imágenes de la parte superior */}
         <Image src={Banner} thumbSrc={BannerThumb} className="desktop-banner" />
         <Image src={BannerMobile} thumbSrc={BannerMobileThumb} className="mobile-banner" />

         {/* Sidebar */}
         <section ref={this.mainContainer}>
            <Sidebar selected={this.state.selectedMenuItem} />
            <main>
               {this.props.heading}
               {this.props.children}
            </main>
         </section>

         <Footer />

         {/* <Footermobile /> */}
         {/* <NavbarBottom /> */}
      </Template>
   }
}

export default WithContext(WeddingLayout);