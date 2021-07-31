import React from "react";
import { Iconwedd } from "../index";

const CheckboxButton = (props) => {

    // icon displays
    let Circle = (is_checked) => {
        return (is_checked ? (
                    <Iconwedd icon={"round-checkbox-selected"} color={"pink icon-check un-checked"} />
                ) : (
                    <Iconwedd icon={"radio"} color={"pink icon-check checked"} />
                )
        );
    };
    let Square = (is_checked) => {
        return (is_checked ? (
                    <Iconwedd icon={"checkbox-selected"} color={"pink icon-check un-checked"} />
                ) : (
                    <Iconwedd icon={"checkbox"} color={"pink icon-check checked"} />
                )
        );
    };
    let Filledcircle = (is_checked) => {
        return (
            is_checked ? (
                    <Iconwedd icon={"radio-selected"} color={"pink icon-check un-checked"} />
                ) : (
                    <Iconwedd icon={"radio"} color={"pink icon-check checked"} />
                )
        );
    };
    let heartFull = (is_checked) => {
        return is_checked ? (
                    <Iconwedd icon={"heart-full"} color={"pink icon-check un-checked"} />
                ) : (
                    <Iconwedd icon={"heart-empty"} color={"pink icon-check checked"} />
                )
        ;
    };

    
    let clsName = props.has_image
        ? props.card
            ? "_rc_square_card"
            : props.is_square
            ? "_rc_square"
            : "_rc_circle"
        : "_input_no_image";
    
    //let clsName = props.has_image ? (props.is_square ? "_rc_square" : "_rc_circle") : "_input_no_image";

    return (
        <label component={"media-object-section"} className={"" + (props.has_image ? (props.is_square ? "" : "padding3"): "_d_input_no_image")}>
            <div className={`${clsName}`}>
                <div key={`contains_${props.id}`} className="checkbox">
                <input style={{ "height":"100%"}}
                    ref={props.onRef}
                    type="checkbox"
                    key={props.id}
                    id={props.id}
                    name={props.id}
                    value={props.value}
                    onChange={() => {
                        props._onClick(props.value, props.id, props.onRef);
                    }}
                    required={props.required?true:false}
                />
                    {/** Se desactiva temporalmente */}
                    {/* <label htmlFor={props.id}>
                        <span className="checks">
                            {props.styleForm == "circle"
                                ? Circle(props.is_checked)
                                : props.styleForm == "square"
                                ? Square(props.is_checked)
                                : props.styleForm == "filledcircle"
                                ? Filledcircle(props.is_checked)
                                : props.styleForm == "heart"
                                ? heartFull(props.is_checked)
                                :""}
                        </span>
                    </label> */}
                </div>
                {(props.has_image)?( <div></div> ):(
                    <p className="paragraph"> {props.text_to_display} </p>
                )}
            </div>
            <div component="thumbnail" className="thumbnail">
                <div className={"" + (props.has_image ? (props.is_square ? "_component_degradado" : ""): "")}></div>
                {props.has_image && <img src={props.image_src} />}
            </div>
            {(props.has_image)?(
                <span 
                    className={props.is_square ? "_text_botton pos-rel_bot-15 paragraph" : "_text_botton paragraph"} 
                    style={(props.has_image ? (!props.is_square ? {} : {"width" : "90%"}): {})}> 
                    {props.text_to_display}
                </span>
            ):( <div></div> )}
        </label>
    );
    
}
CheckboxButton.defaultProps = {
    // ! required
    value: "",
    image_src: "src/client/docs/img/weddings/desk/image_not_found.png",
    is_checked: false,
    _onClick: (value, id, ref) => {
        /* TODO */
    },
    id: "",
    // * optionals
    text_to_display: "",
    container_width: "10rem",
    container_height: "10rem",
    is_square: true,
    has_image: true,
    styleForm: "filledcircle", // [ filledcircle | circle | square | heart ]
    card: false
};

export default CheckboxButton;
