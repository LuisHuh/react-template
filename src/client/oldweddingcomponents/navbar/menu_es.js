const menus = {
    "menuMobile": [
        //{ "Titulo": "Login", "Url": "/", "Key": 7 },
        { "Titulo": "Destinatinos de Bodas", "Url": "/es/destinationweddings", "Key": 2 },
        { "Titulo": "Beneficios Complementarios", "Url": "/es/beneficios-complementarios", "Key": 3 },
        { "Titulo": "Ofertas", "Url": "/es/ofertas", "Key": 4 },
        { "Titulo": "Planeación", "Url": "/es/planeacion", "Key": 5 },
        { "Titulo": "Ceremonias Religiosas y Culturales", "Url": "/es/ceremonias-religiosas-y-culturales", "Key": 6 },
        { "Titulo": "Galeria", "Url": "/es/galeria", "Key": 8 },
        { "Titulo": "Blog", "Url": "/es/blog", "Key": 9 },
        { "Titulo": "FAQs", "Url": "/es/faqs", "Key": 10 },
        { "Titulo": "Contacto", "Url": "/es/contacto-preview", "Key": 11 },///es/contacto
        { "Titulo": "Nuestros Sitios Web", "Url": "/es/our-websites", "Key": 12 },
        { "Titulo": "Palace Resorts", "Url": "https://www.palaceresorts.com", "Key": 12, "External": 1 },
        { "Titulo": "Moon Palace", "Url": "https://www.moonpalacecancun.com", "Key": 12, "External": 1 },
        { "Titulo": "Le Blanc Spa Resort", "Url": "https://www.leblancsparesorts.com", "Key": 12, "External": 1 }
    ],
    "menuResorts": [
        {
            "Titulo": "Jamaica", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/jamaica.jpg", "url": "/es/destino/jamaica",
            "menu": [
                { "Titulo": "Moon Palace Jamaica", "Url": "/es/nuestros-resorts/moon-palace-jamaica", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/moon-palace-jamaica.jpg" },
                { "Titulo": "The Grand At Moon Palace Cancún", "Url": "/es/nuestros-resorts/the-grand-at-moon-palace-cancun", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/the-grand-at-moon-palace-cancun.jpg" },
                { "Titulo": "Moon Palace Cancún", "Url": "/es/nuestros-resorts/moon-palace-cancun", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/moon-palace-cancun.jpg" },
            ]
        },
        {
            "Titulo": "Los Cabos", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/los-cabos.jpg", "url": "/es/destino/los-cabos",
            "menu": [
                { "Titulo": "Le Blanc Spa Resort Cancún", "Url": "/es/nuestros-resorts/le-blanc-cancun", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/le-blanc-cancun.jpg" },
                { "Titulo": "Le Blanc Spa Resort Los Cabos", "Url": "/es/nuestros-resorts/le-blanc-los-cabos", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/le-blanc-los-cabos.jpg" },
            ]
        },
        {
            "Titulo": "Cancún", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/cancun.jpg", "url": "/es/destino/cancun",
            "menu": [
                { "Titulo": "Playacar Palace", "Url": "/es/nuestros-resorts/playacar-palace", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/playacar-palace.jpg" },
                { "Titulo": "Beach Palace", "Url": "/es/nuestros-resorts/beach-palace", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/beach-palace.jpg" },
            ]
        },
        {
            "Titulo": "Playa Del Carmen", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/playa-del-carmen.jpg", "url": "/es/destino/playa-del-carmen",
            "menu": [
                { "Titulo": "Cozumel Palace", "Url": "/es/nuestros-resorts/cozumel-palace", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/cozumel-palace.jpg" }
            ]
        },
        {
            "Titulo": "Isla Mujeres", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/isla-mujeres.jpg", "url": "/es/destino/isla-mujeres",
            "menu": [
                { "Titulo": "Isla Mujeres Palace", "Url": "/es/nuestros-resorts/isla-mujeres-palace", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/isla-mujeres-palace.jpg" }
            ]
        },
        {
            "Titulo": "Cozumel", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/cozumel.jpg", "url": "/es/destino/cozumel",
            "menu": [
                { "Titulo": "Sun Palace", "Url": "/es/nuestros-resorts/sun-palace", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/sun-palace.jpg" },
            ]
        }
    ],
    "topMenu": [
        //{ "Titulo": "Login", "Url": "/", "Key": 7 },
        { "Titulo": "Galeria", "Url": "/es/galeria", "Key": 8 },
        { "Titulo": "Blog", "Url": "/es/blog", "Key": 9 },
        { "Titulo": "FAQs", "Url": "/es/faqs", "Key": 10 },
        { "Titulo": "Contacto", "Url": "/es/contacto-preview", "Key": 11 },///es/contacto
        { "Titulo": "Suscribete", "Url": "/", "Key": 12, "Subs": 1 },
        {
            "Titulo": "Nuestro Sitios Web", "Url": "/es/nuestros-resorts", "Key": 13,
            "Submenu": [
                {"Titulo":"Palace Resorts.","Url":"https://www.palaceresorts.com","Key":12, "External":1},
                {"Titulo":"Moon Palace","Url":"https://www.moonpalacecancun.com","Key":12, "External":1},
                {"Titulo":"Le Blanc Spa Resort","Url":"https://www.leblancsparesorts.com","Key":12, "External":1}
            ]
        },
        {
            "Titulo": "Phone", "Url": "/", "Key": 14,
            "Submenu": [
                { "Titulo": "Reservaciones US & Canada:", "Titulo2": "1 (877) 725-4933", "Url": "tel:1 (877) 725-4933" },
                { "Titulo": "Reservaciones UK:", "Titulo2": "0-808-258-0083", "Url": "tel:0-808-258-0083" },
                { "Titulo": "Reservaciones México:", "Titulo2":"01-800-841-664", "Url": "tel:01-800-841-664" }
            ]
        },
        {
            "Titulo": "Lang", "Url": "/", "Key": 15,
            "Submenu": [
                { "Titulo": "en", "Url": "/en" },
                { "Titulo": "es", "Url": "/es" },
            ]
        }
    ],
    "mainMenu": [
        {
            "Titulo": "Resorts", "Url": "/es/destino/cancun", "Key": 1,
            "Submenu": [
                {
                    "Titulo": "Cancún",
                    "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/cancun.jpg",
                    "url": "/es/destino/cancun",
                    "menu": [
                        {
                            "Titulo": "Beach Palace",
                            "Url": "/es/nuestros-resorts/beach-palace",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/beach-palace.jpg"
                        },
                        {
                            "Titulo": "Sun Palace",
                            "Url": "/es/nuestros-resorts/sun-palace",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/sun-palace.jpg"
                        },
                        {
                            "Titulo": "Moon Palace Cancún",
                            "Url": "/es/nuestros-resorts/moon-palace-cancun",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/moon-palace-cancun.jpg"
                        },
                        {
                            "Titulo": "Le Blanc Spa Resort Cancún",
                            "Url": "/es/nuestros-resorts/le-blanc-cancun",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/le-blanc-cancun.jpg"
                        },
                        {
                            "Titulo": "The Grand At Moon Palace Cancún",
                            "Url": "/es/nuestros-resorts/the-grand-at-moon-palace-cancun",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/the-grand-at-moon-palace-cancun.jpg"
                        }
                    ]
                },
                {
                    "Titulo": "Cozumel",
                    "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/cozumel.jpg",
                    "url": "/es/destino/cozumel",
                    "menu": [
                        {
                            "Titulo": "Cozumel Palace",
                            "Url": "/es/nuestros-resorts/cozumel-palace",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/cozumel-palace.jpg"
                        }
                    ]
                },
                {
                    "Titulo": "Los Cabos",
                    "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/los-cabos.jpg",
                    "url": "/es/destino/los-cabos",
                    "menu": [
                        {
                            "Titulo": "Le Blanc Spa Resort Los Cabos",
                            "Url": "/es/nuestros-resorts/le-blanc-los-cabos",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/le-blanc-los-cabos.jpg"
                        }
                    ]
                },
                {
                    "Titulo": "Isla Mujeres",
                    "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/isla-mujeres.jpg",
                    "url": "/es/destino/isla-mujeres",
                    "menu": [
                        {
                            "Titulo": "Isla Mujeres Palace",
                            "Url": "/es/nuestros-resorts/isla-mujeres-palace",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/isla-mujeres-palace.jpg"
                        }
                    ]
                },
                {
                    "Titulo": "Jamaica",
                    "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/jamaica.jpg",
                    "url": "/es/destino/jamaica",
                    "menu": [
                        {
                            "Titulo": "Moon Palace Jamaica",
                            "Url": "/es/nuestros-resorts/moon-palace-jamaica",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/moon-palace-jamaica.jpg"
                        }
                    ]
                },
                {
                    "Titulo": "Playa Del Carmen",
                    "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/playa-del-carmen.jpg",
                    "url": "/es/destino/playa-del-carmen",
                    "menu": [
                        {
                            "Titulo": "Playacar Palace",
                            "Url": "/es/nuestros-resorts/playacar-palace",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/playacar-palace.jpg"
                        }
                    ]
                }
            ]
        },
        {
            "Titulo": "Destinos de Bodas", "Url": "/es/destinos-de-boda", "Key": 2, "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/submenu-destination-weddings.jpg",
            "Submenu": [
                { "Titulo": "¿Por que una boda en el destino?", "Url": "/es/destinos-de-boda/porque-una-boda-en-el-destino" },
                { "Titulo": "¿Cuál es tu estilo de boda?", "Url": "/es/destinos-de-boda/resort-quiz" },
                { "Titulo": "Haz el día tuyo", "Url": "/es/destinos-de-boda/personaliza-tu-dia" },
                { "Titulo": "Inspirate", "Url": "/es/destinos-de-boda/informacion-util" }
            ]
        },
        { "Titulo": "Beneficios Complementarios", "Url": "/es/beneficios-complementarios", "Key": 3 },
        { "Titulo": "Ofertas", "Url": "/es/ofertas", "Key": 4 },
        {
            "Titulo": "Planeación", "Url": "/es/planeacion", "Key": 5, "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/submenu-plannning.jpg",
            "Submenu": [
                { "Titulo": "Paso a Paso", "Url": "/es/planeacion/paso-a-paso" },
                { "Titulo": "Check list", "Url": "/es/planeacion/lista-de-pendientes-para-la-boda" },
                { "Titulo": "Conozca más", "Url": "/es/planeacion/recursos" },
            ]
        },
        {
            "Titulo": "Ceremonias Religiosas y Culturales", "Url": "/es/ceremonias-religiosas-y-culturales", "Key": 6, "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/submenu-religiones.jpg",
            "Submenu": [
                { "Titulo": "Bodas hindués", "Url": "/es/ceremonias-religiosas-y-culturales/indian" },
                { "Titulo": "Bodas católicas", "Url": "/es/ceremonias-religiosas-y-culturales/chatolic" },
                { "Titulo": "Bodas no denominacionales", "Url": "/es/ceremonias-religiosas-y-culturales/nondenominational" },
                { "Titulo": "Ceremonias mayas", "Url": "/es/ceremonias-religiosas-y-culturales/mayan" },
                { "Titulo": "Bodas judías e interreligiosas", "Url": "/es/ceremonias-religiosas-y-culturales/jewish" },
                { "Titulo": "Bodas simbólicas", "Url": "/es/ceremonias-religiosas-y-culturales/symbolic" }
            ]
        }
    ]
}

export default menus;