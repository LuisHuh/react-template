import React, { Component } from 'react';
import {Wellmakeyourslide} from '../../oldweddingcomponents';
import Api from '@app/Api';
import UseText from '@app/UseText';
import { Subtitle } from '../../components';



export default class WeddingsSlider extends Component {
   constructor(props){
      super(props)
      this.state = {
         slide:[],
         unidadNegocio:0
      };
   }

   componentDidMount(){
      this.apigetBusinessUnits();

   }


   apigetBusinessUnits(){
      Api.getBusinessUnits()
      .then( response => {
         this.setState({slide: response.data || []});
         if(Array.isArray(response.data)){
         response.data.map((element,index) => {
            this.state.unidadNegocio=element.idCategory
         })}
      })
      .catch(err => {
         console.error('Err en Unidades de Negocios', err);
      });
   }



   render() {

      return (
         <>
            <div className="text-center" style={{width: "100%", padding: "0 0.5rem"}}>
               <br/>
               <h3>
                  <UseText i18n="YOUR_WAY"/>
               </h3>
               <Subtitle size={2} className="hide-for-small-only">
                  <UseText i18n="UNFORGETTABLE_WEDDING"/>
               </Subtitle>
            </div>
            <section component="wellmakeyour">
                  <section className="well-make">
                     <div className='title-container'></div>
                     <section className="">
                        {!Array.isArray(this.state.slide) ? null :
                           <Wellmakeyourslide
                              slide={this.state.slide}
                           />}
                     </section>
                  </section>
               <div className="divicion-section"></div>
            </section>
         </>
      )
   }
}
