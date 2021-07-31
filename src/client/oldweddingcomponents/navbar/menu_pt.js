const menus = {
            "menuMobile":[
                {"Titulo":"Login","Url":"/","Key":7},
                {"Titulo":"Destination Weddings","Url":"/en/destinationweddings","Key":2},
                {"Titulo":"Complementary Benefits","Url":"/en/complementary-benefits","Key":3},
                {"Titulo":"Offers","Url":"/en/offers","Key":4},
                {"Titulo":"Planning","Url":"/en/planning","Key":5},
                {"Titulo":"Religious & Cultural Offerings","Url":"/en/religious-and-cultural-offerings","Key":6},
                {"Titulo":"Gallery","Url":"/en/gallery","Key":8},
                {"Titulo":"Blog","Url":"/en/blog","Key":9},
                {"Titulo":"FAQs","Url":"/en/faqs","Key":10},
                {"Titulo":"Contact Us","Url":"/en/contact-us","Key":11},
                {"Titulo":"Our Resorts Websites","Url":"/en/our-websites","Key":12}
            ],
            "menuResorts":[
                {
                    "Titulo":"Jamaica","Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/jamaica.jpg","url":"/en/destination/jamaica",
                    "menu":[
                        {"Titulo":"Moon Palace Jamaica","Url":"/en/our-resorts/moon-palace-jamaica","Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/moon-palace-jamaica.jpg"},
                        {"Titulo":"The Grand At Moon Palace Cancun","Url":"/en/our-resorts/the-grand-at-moon-palace-cancun","Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/the-grand-at-moon-palace-cancun.jpg"},
                        {"Titulo":"Moon Palace Cancun","Url":"/en/our-resorts/moon-palace-cancun","Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/moon-palace-cancun.jpg"},
                    ]
                },
                {
                    "Titulo":"Los Cabos","Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/los-cabos.jpg","url":"/en/destination/los-cabos",
                    "menu":[
                        {"Titulo":"Le Blanc Spa Resort Cancun","Url":"/en/our-resorts/le-blanc-cancun","Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/le-blanc-cancun.jpg"},
                        {"Titulo":"Le Blanc Spa Resort Los Cabos","Url":"/en/our-resorts/le-blanc-los-cabos","Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/le-blanc-los-cabos.jpg"},
                    ]
                },
                {
                    "Titulo":"Cancun","Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/cancun.jpg","url":"/en/destination/cancun",
                    "menu":[
                        {"Titulo":"Playacar Palace","Url":"/en/our-resorts/playacar-palace","Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/playacar-palace.jpg"},
                        {"Titulo":"Beach Palace","Url":"/en/our-resorts/beach-palace","Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/beach-palace.jpg"},
                    ]
                },
                {
                    "Titulo":"Playa Del Carmen","Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/playa-del-carmen.jpg","url":"/en/destination/playa-del-carmen",
                    "menu":[
                        {"Titulo":"Cozumel Palace","Url":"/en/our-resorts/cozumel-palace","Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/cozumel-palace.jpg"}
                    ]
                },
                {
                    "Titulo":"Isla Mujeres","Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/isla-mujeres.jpg","url":"/en/destination/isla-mujeres",
                    "menu":[
                        {"Titulo":"Isla Mujeres Palace","Url":"/en/our-resorts/isla-mujeres-palace","Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/isla-mujeres-palace.jpg"}
                    ]
                },
                {
                    "Titulo":"Cozumel","Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/cozumel.jpg","url":"/en/destination/cozumel",
                    "menu":[
                        {"Titulo":"Sun Palace","Url":"/en/our-resorts/sun-palace","Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/sun-palace.jpg"},
                    ]
                }
            ],
            "topMenu":[
                {"Titulo":"LoginPT","Url":"/","Key":7},
                {"Titulo":"GalleryPT","Url":"/en/gallery","Key":8},
                {"Titulo":"Blog","Url":"/en/blog","Key":9},
                {"Titulo":"FAQs","Url":"/en/faqs","Key":10},
                {"Titulo":"Contact Us","Url":"/en/contact-us","Key":11},
                {"Titulo":"Subscribe","Url":"/","Key":12},
                {"Titulo":"Our Resorts Websites","Url":"/en/our-resorts","Key":12,
                    "Submenu":[
                        {"Titulo":"Palace Resorts","Url":"/"},
                        {"Titulo":"Moon Palace","Url":"/"},
                        {"Titulo":"Le Blanc Spa Resort","Url":"/"}
                    ]},
                {"Titulo":"Phone","Url":"/","Key":13,
                    "Submenu":[
                        {"Titulo":"US & Canada Reservations:","Titulo2":"1 (877) 725-4933","Url":"/"},
                        {"Titulo":"UK Reservations:","Titulo2":" 0-808-258-0083","Url":"/"},
                        {"Titulo":"Mexico Reservations:","Titulo2":" 1 (877) 725-4933","Url":"/"}
                    ]},
                {"Titulo":"Lang","Url":"/","Key":14,
                    "Submenu":[
                        {"Titulo":"en","Url":"/en"},
                        {"Titulo":"es","Url":"/es"},
                        {"Titulo":"pt","Url":"/pt"}
                    ]
                }
            ],
            "mainMenu":[
                {"Titulo":"Our Resorts","Url":"/en/destination/cancun","Key":1,
                    "Submenu":[
                        {
                            "Titulo":"Cancun",
                            "Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/cancun.jpg",
                            "url":"/en/destination/cancun",
                            "menu":[
                                {   
                                    "Titulo":"Beach Palace",
                                    "Url":"/en/our-resorts/beach-palace",
                                    "Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/beach-palace.jpg"
                                },
                                {
                                    "Titulo":"Sun Palace",
                                    "Url":"/en/our-resorts/sun-palace",
                                    "Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/sun-palace.jpg"},
                                {
                                    "Titulo":"Moon Palace Cancun",
                                    "Url":"/en/our-resorts/moon-palace-cancun",
                                    "Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/moon-palace-cancun.jpg"},
                                {
                                    "Titulo":"Le Blanc Spa Resort Cancun",
                                    "Url":"/en/our-resorts/le-blanc-cancun",
                                    "Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/le-blanc-cancun.jpg"},
                                {
                                    "Titulo":"The Grand At Moon Palace Cancun",
                                    "Url":"/en/our-resorts/the-grand-at-moon-palace-cancun",
                                    "Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/the-grand-at-moon-palace-cancun.jpg"
                                }
                            ]
                        },
                        {
                            "Titulo":"Cozumel",
                            "Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/cozumel.jpg",
                            "url":"/en/destination/cozumel",
                            "menu":[
                                {
                                    "Titulo":"Cozumel Palace",
                                    "Url":"/en/our-resorts/cozumel-palace",
                                    "Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/cozumel-palace.jpg"
                                }
                            ]
                        },
                        {
                            "Titulo":"Los Cabos",
                            "Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/los-cabos.jpg",
                            "url":"/en/destination/los-cabos",
                            "menu":[
                                {
                                    "Titulo":"Le Blanc Spa Resort Los Cabos",
                                    "Url":"/en/our-resorts/le-blanc-los-cabos",
                                    "Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/le-blanc-los-cabos.jpg"
                                }
                            ]
                        },
                        {
                            "Titulo":"Isla Mujeres",
                            "Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/isla-mujeres.jpg",
                            "url":"/en/destination/isla-mujeres",
                            "menu":[
                                {
                                    "Titulo":"Isla Mujeres Palace",
                                    "Url":"/en/our-resorts/isla-mujeres-palace",
                                    "Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/isla-mujeres-palace.jpg"
                                }
                            ]
                        },
                        {
                            "Titulo":"Jamaica",
                            "Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/jamaica.jpg",
                            "url":"/en/destination/jamaica",
                            "menu":[
                                {
                                    "Titulo":"Moon Palace Jamaica",
                                    "Url":"/en/our-resorts/moon-palace-jamaica",
                                    "Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/moon-palace-jamaica.jpg"
                                }
                            ]
                        },
                        {
                            "Titulo":"Playa Del Carmen",
                            "Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/playa-del-carmen.jpg",
                            "url":"/en/destination/playa-del-carmen",
                            "menu":[
                                {
                                    "Titulo":"Playacar Palace",
                                    "Url":"/en/our-resorts/playacar-palace",
                                    "Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/playacar-palace.jpg"
                                }
                            ]
                        }
                    ]
                },
                {"Titulo":"Destination Weddings","Url":"/en/destinationweddings","Key":2,"Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/submenu-destination-weddings.jpg",
                    "Submenu":[
                        {"Titulo":"Why a Destination Wedding","Url":"/en/destinationweddings/whydestinationweddings"},
                        {"Titulo":"Palace Resorts Quiz","Url":"/en/destinationweddings/palaceresortzquiz"},
                        {"Titulo":"Personalize your day","Url":"/en/destinationweddings/personaliyourday"},
                        {"Titulo":"Helpful Inspiring Information","Url":"/en/destinationweddings/helpfulinspiringinfo"}
                    ]},
                {"Titulo":"Complementary Benefits","Url":"/en/complementary-benefits","Key":3},
                {"Titulo":"Offers","Url":"/en/offers","Key":4},
                {"Titulo":"Planning","Url":"/en/planning","Key":5,"Img":"https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/submenu-plannning.jpg",
                "Submenu":[
                    {"Titulo":"Step by Step","Url":"/en/planning/step-by-step"},
                    {"Titulo":"“I Do” To-Do’s","Url":"/en/planning/i-do-to-do's"},
                    {"Titulo":"Get in the know","Url":"/en/planning/get-in-the-know"},
                    {"Titulo":"Read all about it","Url":"/en/planning/read-all-about-it"}
                ]},
                {"Titulo":"Religious & Cultural Offerings","Url":"/en/religious-and-cultural-offerings","Key":6,"Img": "https://e-commercepr.s3.amazonaws.com/Calidad/imagenes/menu/submenu-religiones.jpg",
                "Submenu":[
                    {"Titulo":"Indian Weddings","Url":"/en/religious-and-cultural-offerings/indian"},
                    {"Titulo":"Catholics Weddings","Url":"/en/religious-and-cultural-offerings/chatolic"},
                    {"Titulo":"Non-Denomitial Weddings","Url":"/en/religious-and-cultural-offerings/nondenominational"},
                    {"Titulo":"Mayan Ceremonies","Url":"/en/religious-and-cultural-offerings/mayan"},
                    {"Titulo":"Jewish & Interfith Weddings","Url":"/en/religious-and-cultural-offerings/jewish"},
                    {"Titulo":"Symbolic Weddings","Url":"/en/religious-and-cultural-offerings/symbolic"}
                ]}
            ]}

export default menus;