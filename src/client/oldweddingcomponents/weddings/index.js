import React from "react";
import { Titlesection, CheckboxButton } from "../index";
import { TryCatch } from "@app/Error"

const GalleryChecks = (props) => {
    
    let _id = "";
   
    return (
        <section ref={props.onRef} className={"waterfall container"}>
            { props.item_list.map((item, key) => {
                const rawName = item.label.split(" ", 1);
                const name = rawName[0].toLowerCase().charAt(0).toUpperCase() + rawName[0].toLowerCase().slice(1);
                _id = `gallery_${key}_${item.id}`;
                const rawSubtitle = item.label.substring(item.label.split(" ", 1)[0].length + 1);
                const subtitle = (rawSubtitle.toLowerCase()).charAt(0).toUpperCase() + rawSubtitle.toLowerCase().slice(1);
                _id = `gallery_${key}_${item.id}`;
                    return (
                        <div key={_id} component={"media-object stack-for-small "} className={"block"} >
                            <CheckboxButton
                                id={_id}
                                value={item.value}
                                is_checked={props.values_checked.includes(item.value)}
                                image_src={item.image_src}
                                is_square={true}
                                has_image={true}
                                container_width={"100%"}
                                container_height={"100%"}
                                _onClick={(value, id) => {
                                    props.galleryClick(value, id, item, key);
                                }}
                                styleForm={props.styleForm}
                                card={props.card}
                                data={props.data}
                                onBack={props.onBack}
                                onAdd={props.onAdd}
                                onSelected={props.onSelected}
                            />
                            <div component={"media-object-section"} className="media-object-section" onClick={ () => { props.onClick(item) } }>
                                {/*<Titlesection subtitle={name+" "+subtitle+"" } />*/}

                                <h5 style={{ textAlign:'center' }}> { name+" "+subtitle+"" }</h5>
                                    
                            </div>
                        </div>
                    );
                })
            }
        </section>
    );
    
}

GalleryChecks.defaultProps = {
    values_checked: [],
    item_list: [],

    // * Optionals
    galleryClick: (value, id, item, key) => {},
    onClick: (value) => {},
    onRef: () => {},
    icon_check: "",
    icon_uncheck: "",
    styleForm: "heart", // [ filledcircle | circle | square | heart ]
    card: false
};

export default TryCatch(GalleryChecks);