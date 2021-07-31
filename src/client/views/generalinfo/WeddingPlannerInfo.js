import React, { useEffect, useState } from 'react';
import Api from '../../app/Api';
import Auth from '@app/Auth';
import { Cell, Grid, Subtitle } from '@components';
import defaultUserImage from '@docs/img/icons/user-profile.png';
import UseText from '@app/UseText';

export default function WeddingPlannerInfo(props) {
   const { showAllInfo } = props;
   const info = Auth.userData() || {};
   const { id_planner } = info || null;
   const [profileimage, setProfileimage] = useState(null);
   const [name, setName] = useState(null);
   const [numero, setNumero] = useState(null);
   const [extension, setExtension] = useState(null);
   const [email, setEmail] = useState(null);

   const [shortname, setShortname] = useState('');

   /**
    * Devuelve la cadena ingresada como un número de teléfono en formato de 7, 10 y 11 dígitos
    * @param {string} phoneNumber El número telefónico al cual se le dará formato
    */
   const formatPhoneNumber = (phoneNumber) => {
      // Extraemos los dígitos del teléfono
      let extractedNumbers = ('' + phoneNumber).replace(/\D/g, '');
      let match = null;

      switch (extractedNumbers.length) {
         //#region Número telefónico de 7 caracteres
         case 7: match = extractedNumbers.match(/^(\d{3})(\d{4})$/)
            if (match) {
               return `${match[1]}-${match[2]}`
            }
            break;
         //#endregion

         //#region Número telefónico de 11 caracteres
         case 11: match = extractedNumbers.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/)
            if (match) {
               return `${match[1]} (${match[2]}) ${match[3]}-${match[4]}`
            }
            break;
         //#endregion

         //#region Número telefónico de 10 caracteres
         case 10: match = extractedNumbers.match(/^(\d{3})(\d{3})(\d{4})$/)
            if (match) {
               return `(${match[1]}) ${match[2]}-${match[3]}`
            }

         default: return phoneNumber;
         //#endregion
      }
   }

   useEffect(() => {
      if(id_planner != null) {
         Api.infoPlanner(id_planner)
            .then(response => response.data)
            .then((data) => {
               let name = data.name || '';
               let phone_number = data.firmas || {};
               phone_number = phone_number.Toll_free || '';
               phone_number = formatPhoneNumber(phone_number);
               setProfileimage(data.profileimage || defaultUserImage);
               setName(data.name);
               setShortname(name.split(' ')[0]);
               setNumero(phone_number);
               setExtension(data.extension);
               setEmail(data.email);
               // Permite acceder a la información desde el componente padre
               if (typeof props.onLoad === 'function') {
                  props.onLoad(data);
               }
            })
            .catch();
      }
   }, []);

      return   <Grid type='x' className='planner-detail grid-margin-x'>
                  <Cell small="4">
                     <div page='perfil' align='left'>
                        <img src={profileimage} page='perfil' className='imagen' />
                     </div>
                  </Cell>
                  <Cell small="8">
                     <Subtitle size={3} className="uppercase sm-f10x md-f10x lg-f16x"><UseText i18n="YOUR_PR_PLANNER" /></Subtitle>
                     <h4 className="sm-f18x md-f18x lg-f30x">{name}</h4>
                     {showAllInfo ?
                        <Subtitle size={2} className="sm-f12x md-f12x lg-f20x">{numero ? numero : ''} {extension ? `Ext. ${extension}` : ''}</Subtitle> : null
                     }
                     <Subtitle size={2} className="sm-f12x md-f12x lg-f20x">{email}</Subtitle> 
                     <Subtitle size={2} className="sm-f12x md-f14x lg-f20x">
                        <u style={{ color: '#ea8685', textTransform: 'uppercase' }}><UseText i18n="CONTACT_TO" /> {shortname}</u>
                     </Subtitle>
                  </Cell>
               </Grid>;
}
WeddingPlannerInfo.defaultProps = {
   showAllInfo: true,
};