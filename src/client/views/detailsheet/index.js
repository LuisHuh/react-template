import Api from '@app/Api';
import Auth from '@app/Auth';
import { Cell, Grid, Page } from '@components';
import React, { Component } from 'react';
import WithContext from '@app/ServiceContext';

class DetailSheetView extends Component {
   constructor(props) {
      super(props);
      this.iframe = React.createRef()
      this.state = {
         pdfurl: '',
         isloading: true,
         viewerUrl: null,
         viewerHeight: "320px",
         lang:1,
      };
      this.getUrlByLang = this.getUrlByLang.bind(this);
   }

   componentDidMount() {
      const auth = Auth.userData();
      const language = (this.props.app.languageId) ? this.props.app.languageId : 1 ;
      const pdfUrl = Api.urlGetDetailSheetPDFV2(language, auth.id);
      let viewerHeight="320px";
      if(document.body.clientWidth > 1024) {
         viewerHeight = "865px";
      }
      this.setState({lang:language, pdfurl:  window.location.origin+pdfUrl,viewerHeight: viewerHeight});
   }

   iframeLoaded = () => {
      // Fix para aumentar el tiempo en que desaparece el loader
      if (this.iframe) {
         let iframe = this.iframe.current;
         if (iframe  && this.state.isloading == true) {
            setTimeout(() => {
               this.setState({ isloading: false })
            }, 500);
         }
      }
   }

   /**
    * funcion para detectar el cambio de ideoma de la pagina
    */
   getUrlByLang(){
      const auth = Auth.userData();
      let  pdfurl =window.location.origin;
      if( this.state.lang != this.props.app.languageId){
         let url = Api.urlGetDetailSheetPDFV2(this.props.app.languageId, auth.id)
         pdfurl = pdfurl+url;
       }else{
         pdfurl = this.state.pdfurl
       }

       return pdfurl;
   }

   render() {
      const pdfurl = this.getUrlByLang();
      return <Page title="DETAIL_SHEET" loading={this.state.isloading}>
         <Grid type='x' page="details-sheet">
            <Cell>
            {
               (pdfurl != "") ?
               <iframe id="pdfviewer" src={`https://docs.google.com/gview?embedded=true&url=${pdfurl}`} frameBorder="0" width="100%" height={this.state.viewerHeight} onLoad={this.iframeLoaded} ref={this.iframe}></iframe>
               :null

            }
            </Cell>
         </Grid>
      </Page>
   }
}
export default WithContext(DetailSheetView)