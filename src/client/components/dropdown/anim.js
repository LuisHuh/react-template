export const anim = (params = {
   element: {},
   opacity: [],
   scaleX: [],
   scaleY: [],
   duration: 0
}) => {
   const element = params.element;
   const opacity = params.opacity || [];
   const scaleX = params.scaleX || [];
   const scaleY = params.scaleY || [];
   const duration = params.duration;
   
   const opacityAnim = (time, start, end) => {
      setTimeout(() => {
         if (start < end - 0.1) {
            start = start + 0.1;
            element.setState( prevState => {
               const style = Object.assign({}, prevState.style);
               style['opacity'] = start;
               return {
                  style
               }
            }, () => {
               opacityAnim(time, start, end);
            });
         }
      }, time);
   }

   const scaleAnim = (pos, time, start, end) => {
      setTimeout(() => {
         if (start < end - 0.1) {
            start = start + 0.1;
            element.setState( prevState => {
               const style = Object.assign({}, prevState.style);
               const sclX = pos === 'X' ? start : style.scaleX || 0;
               const sclY = pos === 'Y' ? start : style.scaleY || 0;
               style['scaleX'] = sclX;
               style['scaleY'] = sclY;
               style['transform'] = `scaleX(${sclX}) scaleY(${sclY})`;
               return {
                  style
               }
            }, () => {
               scaleAnim(pos, time, start, end);
            });
         }
      }, time);
   }

   if (opacity !== undefined && opacity !== null && opacity.length > 0) {
      opacityAnim(duration, opacity[0], opacity[1]);
   }

   if (scaleX !== undefined && scaleX !== null && scaleX.length > 0) {
      scaleAnim('X', duration, scaleX[0], scaleX[1]);
   }

   if (scaleY !== undefined && scaleY !== null && scaleY.length > 0) {
      scaleAnim('Y', duration, scaleY[0], scaleY[1]);
   }
}