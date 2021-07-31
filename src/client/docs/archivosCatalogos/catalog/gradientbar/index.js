/**
 * @version 1.0.1
 * @author alanjimenez
 * @type Stateless Component
 * @returns {component} GradientBar
 * @summary component description
 */
import React from 'react';
import { Cell } from '../../../components';

export const GradientBar = props => (
   <Cell component="GradientBar" className="GradientBar" {...props} >
      {props.children}
   </Cell>
);

export default GradientBar;