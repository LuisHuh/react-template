import React,{Component} from 'react';
import { Grid, Cell, Button, Currency } from '../../components';
import WithContext from '@app/ServiceContext';
import { withRouter } from "react-router-dom";
// import { WithCatalog } from '@templates/CatalogTemplate';
import DetailCatalog from "../../oldweddingcomponents/detailcatalog";


class ViewDetailCatalog extends Component {
    
    
    render(){
        const datos= this.props.location.state || {};
        const data = datos.data || {}
        const imagen= data.idconcepto || 0
        const validarimagen=imagen==2?true:false
        const Add= this.props.location.state|| {};
        const onAdd = Add.onAdd || {}
        const gallery= this.props.location.state || {};
        const gallery_data= gallery.gallery_data || {};
        const src= data?data.src:""
        const logos = data.logo || {}
        const logo= Object.keys(logos).length === 0?0:logos.indexOf("h")
        const validar =Object.keys(data).length === 0?0:1

        return (
            <React.Fragment>
            {validar!=0?
                <section component="cakeDetail" className="show">
                    <Grid type="x">
                        <Cell medium="1" large="3"></Cell>
                            <Cell small="12" medium="10" large="6">
                                <Grid type="x">
                                    <Cell small="2" medium="2" large="2" className="border-color">
                                        <a onClick={this.props.onBack } onClickCapture={()=>{localStorage.isBackTabs=true}}>
                                            <i className="prs pr-chevron-left pr-lg"></i>
                                        </a>
                                    </Cell>
                                    <Cell small="10" medium="10" large="10" className={"grid-flex-20-20-f2f2f2"}>
                                    </Cell>
                                </Grid>
                                <Grid type="x" className={"border-20-20-f2f2f2 bor-top"}  >
                                    <Cell small="6" medium="6" large="6">
                                        <div className="_media_detail">
                                            <div className="_card_detail">        
                                                <img className="_photo_left img" src={src } alt="placeholder"/>
                                            </div>
                                        </div>
                                    </Cell>
                                    <Cell small="6" medium="6" large="6">
                                        <div className="_content_detail">
                                        {logo==-1?
                                            <div className="_logo_detail">
                                                <img src={logos} alt="placeholder"/>
                                            </div>:null}
                                            <span className="subtitle-3">{ data.hasOwnProperty('title') ? data.title : ""}</span>
                                        </div>
                                        {
                                                data.hasOwnProperty('price') ? 
                                                <div className="_description_detail">
                                                    <Currency value={this.data.price} isDefault={true} region={'usa'} />
                                                </div> 
                                                : null
                                        }  
                                        <div>
                                            <hr className="divider"></hr>
                                        </div>
                                        {
                                        data.hasOwnProperty('detail') ? 
                                        <div className="_description_detail">
                                                { data.detail }
                                        </div> 
                                        : null
                                        }        
                                        <Button onClick={this.props.category } className="primary"   href="#"> {`${ this.props.onSelected ? "  PAY NOW" : "  ADD TO CART"} `}</Button>
                                    </Cell>
                                </Grid>
                            </Cell>
                        <Cell medium="1" large="3"></Cell>
                    </Grid>
                </section>
                : ""}
            {validarimagen==true?
            <Grid type="x">
            <DetailCatalog src ={src}
                gallery_data={gallery_data} 
                imagen={imagen}>
            </DetailCatalog>
            </Grid>
            : ""}
            </React.Fragment>
        );
    }
}
ViewDetailCatalog.defaultProps = { 
    data: {},
    onBack : () => {},
    onAdd : () => {},
    onClick : () => {},
    onSelected : false

};

export default withRouter(WithContext(ViewDetailCatalog));
