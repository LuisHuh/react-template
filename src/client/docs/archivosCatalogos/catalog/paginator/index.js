/**
 * @class Paginator
 * @version 1.0.0
 * @author alanjimenez
 * @summary Contendor con paginación
 * @property pages
 * @property pages
 * @property pages
 */
import React from 'react';

import WithContext from '@app/ServiceContext';

// import { Titlesection, Input } from '../../../oldweddingcomponents/wirefragment';


class Paginator extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         data : [],
         totalPages : 0,         
      };
      this.pages = [];
      this.current = 0;
      this.total = this.props.total;
   }

   /**
   * @author Miguel Chan <michan@palaceresorts.com>
   * Funcion para parciar un arreglo en grupos
   * @param array:(array)
   * @param size:(int)
   * @return mixed
   */
	chunkArray(array, size){
		var tempArray = [];
		for (let index = 0; index < array.length; index += size) {
			tempArray.push(array.slice(index, index + size));
		}
		return tempArray;
	}

   skipToPage(index){
      if (index != this.current) {
            this.current = index;
            this.props.onClick(this.pages[index]);
      }
   }

   componentDidMount() {
      this.setDataGallery(this.props.data);  
   }

   componentDidUpdate(prevProps, prevState) {
      if (prevProps.data != this.props.data) {
         this.setDataGallery(this.props.data);  
      }

   }

   setDataGallery(data){
      this.pages = this.chunkArray(data, this.total);
      this.current = 0;
      this.setState({ data: data, totalPages: this.pages.length,  page: this.pages.length > 0 ? this.pages[this.current] : [] });
      this.props.onClick(this.pages[this.current]);
   }

   renderPaginatorNumbers(){
      let numberList = [];
      let totalPages = this.state.totalPages;
      for (let index = 0; index < totalPages; index++) {
			// Botón para ir a la primera página
         if (index == 0) {
            numberList.push(<a key={0}
               component="paginator-first"
               onClick={(e) => this.skipToPage(0)}>&lt;</a>);
         }
            numberList.push(<a key={index + 1}
            component="paginator-number"
            onClick={(e) => this.skipToPage(index)}
            className={"page-number-item " + ( index == this.current ? 'active' : '') }>{index + 1}</a>);
         if (index == (totalPages - 1)) {
            // Botón para ir a la última página
            numberList.push(<a key={index + 2}
               component="paginator-last"
               onClick={(e) => this.skipToPage(index)}>&gt;</a>);
         }
         
          
		}
      return numberList;
   };

   render() {
      return (
         
            this.state.totalPages > 1 ? 
               <div key={`paginator`} component="paginator" className="paginator">
                  {this.renderPaginatorNumbers()}
               </div> 
            : null
         
      );
   }
}

Paginator.defaultProps = {
   total: 0,
   data : [],
   onClick : (value) =>{}
};

export default WithContext(Paginator);