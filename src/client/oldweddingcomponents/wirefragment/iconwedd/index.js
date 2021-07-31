import React from 'react';
import svg from './../../../docs/img/sprite.svg';

const Iconwedd = (props) =>{
    
    /*
Listado de colores disponibles
    pink
    light-pink
    dark-gray
    black
    gray-weddings
    light-gray
    white
    light-gray-trans
    dark-gray-full
    pale-pink
    */
    
      let color=props.color==null?"black":props.color
      return( 
        <span component="iconwedd" className="area-icon" style={props.style!=null?props.style:{"":""}} onClick={props.onClick}>
          <svg  className={'svg-icon-'+color+" "+props.icon+" area-icon"} d={"svg"} ref={props.refIcon!=null?props.refIcon:null}>
            <use className="area-icon" xlinkHref={`${svg}#${props.icon}`} d={"svg_"} />
          </svg>
        </span>
        )
    
    
  }
  
  export default Iconwedd