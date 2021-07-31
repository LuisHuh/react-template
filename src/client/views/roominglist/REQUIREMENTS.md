# Pendientes para POSTLOGIN - Rooming List

## APIs:

- [ ] Vista de current Book, textos que se muestran para desplegar em Card
- [ ] Formulario "BOOK NOW" de la parte superior de la Vista
- [ ] PDF de la parte inferior de la Vista


## Assets

- [ ] Iconos
    - [ ] ícono cama (Formulario "BOOK NOW" - primer ícono izquierdo)
    - [ ] ícono triangulo down (Formulario "BOOK NOW" - selects)
- [ ] imagen novios (card Current Book)
- [ ] Textos
    - [ ] Terminos (Card Current Book - seccion inferior)
    - [ ] Tipografia pagina



```

link de bodas (mas de un link por boda)
pre - post evento

el codigo de la boda puede tener contratos por 1 o mas links

puede cancelar el usuario que creo el link
    reservaciones | equipo de ray ? 
    (casi no se cancela)

Link Produccion
https://www3.palaceresorts.com/NET/Formularios/Nd/Groups_nd.aspx?gc=19137w7740&sb=BODA&ag=19137w7740
https://www3.palaceresorts.com/NET/Formularios/Nd/Groups_nd.aspx?gc=wdrusrasa&sb=BODA&ag=wdrusrasa
Link Expirado


TABLA
modulo - planner
event_link_reservas

idevent_grupo                   int(11)
idclv_propiedad                 varchar(50)
origen_clever                   tinyint(1)
origen_externo                  tinyint(1)
link                            text


modulo de reservaciones - Events
notificado tinyint(1) - si no

agregar campotabla "aprobado"


regular bookings


agregar excel lista faltantes

```


---

## Reunión 04/Ago/2020

nombres, apellido, llegada, salida, expedia - filtra planner en events

se refleja en la tabla como "pendiente"
la planner actualiza los "pendientes" y los envia (se refleja en POSTLOGIN)


reglas 3 dias antes y 3 despues para fechas en formulario de acuerdo a la reserva