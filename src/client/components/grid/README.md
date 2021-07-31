## Grid

Basado en el __Grid__ de [Foundation](https://get.foundation/sites/docs/xy-grid.html).

El componente Grid se encarga de distribuir los elementos visuales por todo la pagina, entiendase como una cuadricula dividida en filas y columnas con maximo de _n_ filas y 12 columnas máximo.

### Importación

~~~javascript
import { Grid, Cell } from 'url_de_tu_carpeta_de_componentes';
~~~

### Tipos de grid

Existen 3 tipos de Grid: **Grid Container**, **Horizontal** y **Vertical**.

#### Grid Container ([.grid-container](https://get.foundation/sites/docs/xy-grid.html#grid-container))

El _grid container_ se encarga de centrar los elementos de la pagina, agregar margenes a los lados de contenedor y habilita la responsividad del contenido.

Ejemplo:

~~~javascript
<Grid>
   Hola mundo >:c
</Grid>
~~~

Para hacer que los elementos ocupen el espacio disponible de la pagina, agregar la clase `fluid`.

Ejemplo:

~~~javascript
<Grid className="fluid">
   Hola mundo >:c
</Grid>
~~~

Para hacer que los elementos ocupen el espacio disponible de la pagina y eliminar los margenes, agregar la clase `full`.

Ejemplo:

~~~javascript
<Grid className="full">
   Hola mundo >:c
</Grid>
~~~

Para más información y ver el funcionamiento, favor de consultar la documentación de [Foundation](https://get.foundation/sites/docs/xy-grid.html#grid-container).

#### Grid Horizontal ([.grid-x](https://get.foundation/sites/docs/xy-grid.html#basics))

El _grid horzontal_ se encarga distribuir los elementos de forma horizontal como su nombre lo indica, este será el elemento de más uso.

El uso del ___grid horzontal___ y ___grid vertical___ sin una ___celda___ no hara gran cosa, es decir, no se apreciara el funcionamiento y su comportamiento sera como un `div` cualquiera.

Ejemplo:

~~~javascript
<Grid type="x">
   Hola mundo >:c
</Grid>
~~~

Aunque si se colocan una seguida de otra, tendrá el comportamiento de una fila.

Ejemplo:

~~~javascript
<Grid type="x">
   Fila 1
</Grid>
<Grid type="x">
   Fila 2
</Grid>
<Grid type="x">
   Fila 3
</Grid>
~~~

#### Celdas ([.cell](https://get.foundation/sites/docs/xy-grid.html#basics))

Las ___celdas___ son basicamente las encargadas de distribuir los elementos en la cuadricula horizontal o vertical, dependiendo si es ___grid horzontal___ o ___vertical___.

Ejemplo:

~~~javascript
<Grid>
   <Grid type="x">
      <Cell>full width cell</Cell>
      <Cell>full width cell</Cell>
   </Grid>
</Grid>
~~~

Para indicarle a la celda cuantos espacios debe ocupar en la cuadricula hay que establecer los parametros `small` para ___movil___, `medium` para ___tableta___ o ___escritorio___ pequeño y `large` para ___escritorios___ normales, al no especificarlos se entiende que se ocupará 12 columnas por defecto.

Ejemplo:

~~~javascript
<Grid>
   <Grid type="x">
      <Cell small="12" medium="6" large="4">12/6/4 cells</Cell>
      <Cell small="12" medium="6" large="8">12/6/8 cells</Cell>
   </Grid>
</Grid>
~~~

Si se desea que las celdas se distribuyan equivalentemente, establecer los parametros `smallup` para ___movil___, `mediumup` para ___tableta___ o ___escritorio___ pequeño y `largeup` para ___escritorios___ normales en el ___grid horzontal___ (No aplica para ___grid vertical___).

Ejemplo:

~~~javascript
<Grid>
   <Grid type="x" smallup="2" mediumup="4" largeup="6">
      <Cell>6/3/2 cells</Cell>
      <Cell>6/3/2 cells</Cell>
      <Cell>6/3/2 cells</Cell>
      <Cell>6/3/2 cells</Cell>
      <Cell>6/3/2 cells</Cell>
      <Cell>6/3/2 cells</Cell>
   </Grid>
</Grid>
~~~

Para agregar margenes a las ___celdas___, establecer las clases `.grid-margin-x` o `.grid-margin-y` a los ___grid horzontal___ o ___vertical___, dependiendo el tipo.

Ejemplo:

~~~javascript
<Grid>
   <Grid type="x" className="grid-margin-x">
      <Cell small="12" medium="6" large="4">12/6/4 cells</Cell>
      <Cell small="12" medium="6" large="8">12/6/8 cells</Cell>
   </Grid>
</Grid>

<Grid>
   <Grid type="y" className="grid-margin-y">
      <Cell small="12" medium="6" large="4">12/6/4 cells</Cell>
      <Cell small="12" medium="6" large="8">12/6/8 cells</Cell>
   </Grid>
</Grid>
~~~

Para agregar paddings o rellenos a las ___celdas___, establecer las clases `.grid-padding-x` o `.grid-padding-y` a los ___grid horzontal___ o ___vertical___, dependiendo el tipo.

Ejemplo:

~~~javascript
<Grid>
   <Grid type="x" className="grid-padding-x">
      <Cell small="12" medium="6" large="4">12/6/4 cells</Cell>
      <Cell small="12" medium="6" large="8">12/6/8 cells</Cell>
   </Grid>
</Grid>

<Grid>
   <Grid type="y" className="grid-padding-y">
      <Cell small="12" medium="6" large="4">12/6/4 cells</Cell>
      <Cell small="12" medium="6" large="8">12/6/8 cells</Cell>
   </Grid>
</Grid>
~~~

Estas clases se pueden combinar.

Ejemplo:

~~~javascript
<Grid>
   <Grid type="x" className="grid-margin-x grid-padding-x">
      <Cell small="12" medium="6" large="4">12/6/4 cells</Cell>
      <Cell small="12" medium="6" large="8">12/6/8 cells</Cell>
   </Grid>
</Grid>

<Grid>
   <Grid type="y" className="grid-margin-y grid-padding-y">
      <Cell small="12" medium="6" large="4">12/6/4 cells</Cell>
      <Cell small="12" medium="6" large="8">12/6/8 cells</Cell>
   </Grid>
</Grid>
~~~

Para que una ___celda___ se adapte al contenido, establecer la clase `.shrink`. Para que se adapte al contenido restante, establecer `.auto`.

Ejemplo:

~~~javascript
<Grid>
   <Grid type="x" className="grid-margin-x">
      <Cell className="shrink">Shrink!</Cell>
      <Cell className="auto">Expand!</Cell>
   </Grid>
</Grid>
~~~

Existen más clases para los componentes ___Grid Horizontal - Vertical___ y para las ___Celdas___, favor de consultar la documentación de [Foundation](https://get.foundation/sites/docs/xy-grid.html).