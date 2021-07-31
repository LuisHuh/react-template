const menus = {
    "menuMobile": [
        //{"Titulo":"Login","Url":"/","Key":7},
        { "Titulo": "Destination Weddings", "Url": "/en/destinationweddings", "Key": 2 },
        { "Titulo": "Complimentary Benefits", "Url": "/en/complimentary-benefits", "Key": 3 },
        { "Titulo": "Offers", "Url": "/en/offers", "Key": 4 },
        { "Titulo": "Planning", "Url": "/en/planning", "Key": 5 },
        { "Titulo": "Religious & Cultural Offerings", "Url": "/en/religious-and-cultural-offerings", "Key": 6 },
        { "Titulo": "Gallery", "Url": "/en/gallery", "Key": 8 },
        { "Titulo": "Blog", "Url": "/en/blog", "Key": 9 },
        { "Titulo": "Frequently Asked Questions", "Url": "/en/faqs", "Key": 10 },
        { "Titulo": "Contact Us", "Url": "/en/contact-preview", "Key": 11 },///en/contact-us
        { "Titulo": "Our Resorts Websites", "Url": "/en/our-websites", "Key": 12 },
        { "Titulo": "Palace Resorts", "Url": "https://www.palaceresorts.com", "Key": 12, "External": 1 },
        { "Titulo": "Moon Palace", "Url": "https://www.moonpalacecancun.com", "Key": 12, "External": 1 },
        { "Titulo": "Le Blanc Spa Resort", "Url": "https://www.leblancsparesorts.com", "Key": 12, "External": 1 }
    ],
    "menuResorts": [
        {
            "Titulo": "Jamaica", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/jamaica.jpg", "url": "/en/destination/jamaica",
            "menu": [
                { "Titulo": "Moon Palace Jamaica", "Url": "/en/our-resorts/moon-palace-jamaica", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/moon-palace-jamaica.jpg" },
                { "Titulo": "The Grand At Moon Palace Cancun", "Url": "/en/our-resorts/the-grand-at-moon-palace-cancun", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/the-grand-at-moon-palace-cancun.jpg" },
                { "Titulo": "Moon Palace Cancun", "Url": "/en/our-resorts/moon-palace-cancun", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/moon-palace-cancun.jpg" },
            ]
        },
        {
            "Titulo": "Los Cabos", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/los-cabos.jpg", "url": "/en/destination/los-cabos",
            "menu": [
                { "Titulo": "Le Blanc Spa Resort Cancun", "Url": "/en/our-resorts/le-blanc-cancun", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/le-blanc-cancun.jpg" },
                { "Titulo": "Le Blanc Spa Resort Los Cabos", "Url": "/en/our-resorts/le-blanc-los-cabos", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/le-blanc-los-cabos.jpg" },
            ]
        },
        {
            "Titulo": "Cancun", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/cancun.jpg", "url": "/en/destination/cancun",
            "menu": [
                { "Titulo": "Playacar Palace", "Url": "/en/our-resorts/playacar-palace", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/playacar-palace.jpg" },
                { "Titulo": "Beach Palace", "Url": "/en/our-resorts/beach-palace", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/beach-palace.jpg" },
            ]
        },
        {
            "Titulo": "Playa Del Carmen", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/playa-del-carmen.jpg", "url": "/en/destination/playa-del-carmen",
            "menu": [
                { "Titulo": "Cozumel Palace", "Url": "/en/our-resorts/cozumel-palace", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/cozumel-palace.jpg" }
            ]
        },
        {
            "Titulo": "Isla Mujeres", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/isla-mujeres.jpg", "url": "/en/destination/isla-mujeres",
            "menu": [
                { "Titulo": "Isla Mujeres Palace", "Url": "/en/our-resorts/isla-mujeres-palace", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/isla-mujeres-palace.jpg" }
            ]
        },
        {
            "Titulo": "Cozumel", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/cozumel.jpg", "url": "/en/destination/cozumel",
            "menu": [
                { "Titulo": "Sun Palace", "Url": "/en/our-resorts/sun-palace", "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/sun-palace.jpg" },
            ]
        }
    ],
    "topMenu": [
        //{"Titulo":"Login","Url":"/","Key":7},
        { "Titulo": "Gallery", "Url": "/en/gallery", "Key": 8 },
        { "Titulo": "Blog", "Url": "/en/blog", "Key": 9 },
        { "Titulo": "FAQs", "Url": "/en/faqs", "Key": 10 },
        { "Titulo": "Contact Us", "Url": "/en/contact-preview", "Key": 11 },///en/contact-us
        { "Titulo": "Subscribe", "Url": "/", "Key": 12, "Subs": 1 },
        {
            "Titulo": "Our Resorts Websites", "Url": "/en/our-resorts", "Key": 13,
            "Submenu": [
                { "Titulo": "Palace Resorts", "Url": "https://www.palaceresorts.com" },
                { "Titulo": "Moon Palace", "Url": "https://www.moonpalacecancun.com/" },
                { "Titulo": "Le Blanc Spa Resort", "Url": "https://www.leblancsparesorts.com/" }
            ]
        },
        {
            "Titulo": "Phone", "Url": "/", "Key": 14,
            "Submenu": [
                { "Titulo": "US & Canada Reservations:", "Titulo2": "1 (877) 725-4933", "Url": "tel:1 (877) 725-4933" },
                { "Titulo": "UK Reservations:", "Titulo2": "0-808-258-0083", "Url": "tel:0-808-258-0083" },
                { "Titulo": "Mexico Reservations:", "Titulo2": "01-800-841-664", "Url": "tel:01-800-841-664" }
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
            "Titulo": "Our Resorts", "Url": "/en/destination/cancun", "Key": 1, "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/submenu-our-resorts.jpg",
            "Submenu": [
                {
                    "Titulo": "Cancun",
                    "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/cancun.jpg",
                    "url": "/en/destination/cancun",
                    "menu": [
                        {
                            "Titulo": "Beach Palace",
                            "Url": "/en/our-resorts/beach-palace",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/beach-palace.jpg"
                        },
                        {
                            "Titulo": "Sun Palace",
                            "Url": "/en/our-resorts/sun-palace",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/sun-palace.jpg"
                        },
                        {
                            "Titulo": "Moon Palace Cancun",
                            "Url": "/en/our-resorts/moon-palace-cancun",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/moon-palace-cancun.jpg"
                        },
                        {
                            "Titulo": "Le Blanc Spa Resort Cancun",
                            "Url": "/en/our-resorts/le-blanc-cancun",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/le-blanc-cancun.jpg"
                        },
                        {
                            "Titulo": "The Grand At Moon Palace Cancun",
                            "Url": "/en/our-resorts/the-grand-at-moon-palace-cancun",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/the-grand-at-moon-palace-cancun.jpg"
                        }
                    ]
                },
                {
                    "Titulo": "Cozumel",
                    "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/cozumel.jpg",
                    "url": "/en/destination/cozumel",
                    "menu": [
                        {
                            "Titulo": "Cozumel Palace",
                            "Url": "/en/our-resorts/cozumel-palace",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/cozumel-palace.jpg"
                        }
                    ]
                },
                {
                    "Titulo": "Los Cabos",
                    "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/los-cabos.jpg",
                    "url": "/en/destination/los-cabos",
                    "menu": [
                        {
                            "Titulo": "Le Blanc Spa Resort Los Cabos",
                            "Url": "/en/our-resorts/le-blanc-los-cabos",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/le-blanc-los-cabos.jpg"
                        }
                    ]
                },
                {
                    "Titulo": "Isla Mujeres",
                    "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/isla-mujeres.jpg",
                    "url": "/en/destination/isla-mujeres",
                    "menu": [
                        {
                            "Titulo": "Isla Mujeres Palace",
                            "Url": "/en/our-resorts/isla-mujeres-palace",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/isla-mujeres-palace.jpg"
                        }
                    ]
                },
                {
                    "Titulo": "Jamaica",
                    "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/jamaica.jpg",
                    "url": "/en/destination/jamaica",
                    "menu": [
                        {
                            "Titulo": "Moon Palace Jamaica",
                            "Url": "/en/our-resorts/moon-palace-jamaica",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/moon-palace-jamaica.jpg"
                        }
                    ]
                },
                {
                    "Titulo": "Playa Del Carmen",
                    "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/playa-del-carmen.jpg",
                    "url": "/en/destination/playa-del-carmen",
                    "menu": [
                        {
                            "Titulo": "Playacar Palace",
                            "Url": "/en/our-resorts/playacar-palace",
                            "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/playacar-palace.jpg"
                        }
                    ]
                }
            ]
        },
        {
            "Titulo": "Destination Weddings", "Url": "/en/destinationweddings", "Key": 2, "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/submenu-destination-weddings.jpg",
            "Submenu": [
                { "Titulo": "Why a Destination Wedding?", "Url": "/en/destinationweddings/whydestinationweddings" },
                { "Titulo": "Which Palace Resorts Fits You?", "Url": "/en/destinationweddings/palaceresortzquiz" },
                { "Titulo": "Personalize Your Day", "Url": "/en/destinationweddings/personaliyourday" },
                { "Titulo": "Helpful Wedding Resources", "Url": "/en/destinationweddings/helpfulinspiringinfo" }
            ]
        },
        { "Titulo": "Complimentary Benefits", "Url": "/en/complimentary-benefits", "Key": 3 },
        { "Titulo": "Offers", "Url": "/en/offers", "Key": 4 },
        {
            "Titulo": "Planning", "Url": "/en/planning", "Key": 5, "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/submenu-plannning.jpg",
            "Submenu": [
                { "Titulo": "Step by Step", "Url": "/en/planning/step-by-step" },
                { "Titulo": "Wedding Timeline", "Url": "/en/planning/i-do-to-do's" },
                { "Titulo": "Helpful Planning Information", "Url": "/en/planning/get-in-the-know" },
                { "Titulo": "Download Brochure ", "Url": "/en/planning/read-all-about-it" }
            ]
        },
        {
            "Titulo": "Religious & Cultural Offerings", "Url": "/en/religious-and-cultural-offerings", "Key": 6, "Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/submenu-religiones.jpg",
            "Submenu": [
                { "Titulo": "Nondenomitial Weddings", "Url": "/en/religious-and-cultural-offerings/nondenominational" },
                { "Titulo": "Symbolic Weddings", "Url": "/en/religious-and-cultural-offerings/symbolic" },
                { "Titulo": "Catholics Weddings", "Url": "/en/religious-and-cultural-offerings/chatolic" },
                { "Titulo": "South Asian Weddings", "Url": "/en/religious-and-cultural-offerings/indian" },
                { "Titulo": "Jewish & Interfith Weddings", "Url": "/en/religious-and-cultural-offerings/jewish" },                
                { "Titulo": "Mayan Weddings", "Url": "/en/religious-and-cultural-offerings/mayan" },

                
            ]
        }
    ]
}

export default menus;