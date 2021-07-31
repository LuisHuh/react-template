import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Iconwedd } from '../index';
class Input extends Component {

    constructor() {
        super();


        /**Evento para el sec***/
        this.select = React.createRef()
        this.showoption = this.showoption.bind(this);
        this.viewselected = this.viewselected.bind(this);
        this.losfocus = this.losfocus.bind(this);
        this.optionclick = this.optionclick.bind(this);
        this.clickClose = this.clickClose.bind(this);
        this.searchselec = this.searchselec.bind(this);
        this.loadDataSelec = this.loadDataSelec.bind(this);
        this.selectDefault = this.selectDefault.bind(this);
        this.phoneMapper = this.phoneMapper.bind(this);

        this.state = {
            length: 0
        }
    }

    //variable para selec
    isopen = true
    showoption() {
        if (this.select.current != null) {
            let option = this.select.current.querySelectorAll(".options")
            let arrow = this.select.current.querySelectorAll(".view-selec-arrow")
            if (this.isopen) {
                option[0].classList.add("open")
                arrow[0].classList.add("open")
                this.isopen = false
            } else {
                option[0].classList.remove("open")
                arrow[0].classList.remove("open")
                this.isopen = true
            }
        }
    }
    clickCount = 0
    clickClose(e) {
        if (this.clickCount >= 1) {
            //this.losfocus()
            this.select.current.querySelector("input").blur()
        }
        else {
            this.optionclick()
            this.clickCount++
        }
    }
    optionclick() {
        let select = this.select.current.querySelector(".options")
        this.isopen = select.classList[1] != null ? false : true
        if (this.isopen == false) {
            this.isopen = true
        }

        this.showoption()
    }
    searchselec(empty) {
        let search = empty.target == null ? "" : this.select.current.querySelectorAll("input")[0].value
        let optionvalue = this.select.current.querySelectorAll(".options > p")
        let isEmpty = 0
        if (this.props.withSearch) {
            optionvalue.forEach(element => {
                isEmpty++
                //            console.log(element.textContent.toLowerCase(),search.toLowerCase().trim(),element.textContent.toLowerCase().indexOf(search.toLowerCase().trim()))
                if (element.textContent.toLowerCase().indexOf(search.toLowerCase().trim()) > -1) {
                    element.style = "display:view"
                } else {
                    element.style = "display:none"
                    isEmpty--
                }
            });
        }
    }
    losfocus() {
        this.clickCount = 0
        this.isopen = false
        setTimeout(() => {
            this.showoption()
        }, 300)
    }
    viewselected(e) {
        this.searchselec("empty")
        let select = this.select.current.querySelectorAll("select")
        let viewselect = this.select.current.querySelectorAll(".view-selec")
        let values = this.select.current.querySelectorAll("p")
        for (let a = 0; a < values.length; a++) {
            values[a].classList.remove("selec-option")
        }
        e.target.classList.add("selec-option")
        let getValue = e.target.getAttribute("value") == null ? e.target.textContent : e.target.getAttribute("value")
        viewselect[0].value = e.target.textContent
        select[0].value = getValue
        if (this.props.onchange != null) {
            this.props.onchange(select, e.target);
        }
    }
    loadDataSelec(ts, is) {
        let data = []
        let key = 0
        let index = 0
        this.props.data.forEach(element => {
            index++
            key += 1
            let isArray = Object.prototype.toString.call(this.props.data[0]) === "[object Array]"
            let empty = this.props.indexEmpty == (key - 1)
            if (is == 1) {
                if (this.props.required != null && key == 1) {
                    data.push(<p d="true" style={{ display: "none" }} key={key + "-0"} onClick={this.viewselected.bind(this, key)}></p>)
                }
                data.push(<p d="true" value={isArray ? element[1] : null} onTouchStart={this.props.getData != null ? this.props.getData : null}

                    onClick={(e) => { this.viewselected(e); this.isopen = false; this.showoption() }}

                    key={key}>{isArray ? element[0] : element}</p>)

            } else {
                if (this.props.required != null && key == 1) {
                    data.push(<option key={key + "-0"}></option>)
                }
                data.push(<option value={isArray ? element[1] : null} key={key}>{isArray ? element[0] : element}</option>)
                if (this.props.data.length == index) {
                    data.push(<option value="" key={999}></option>)
                }
            }
        });
        if (this.props.selectDefault != null) {
            this.selectDefault(this.props.selectDefault)
        }
        return data
    }
    selectDefault(index) {

        setTimeout(() => {
            try {
                let viewselect = this.select.current.querySelectorAll(".view-selec")
                let values = this.select.current.querySelectorAll("p")
                let select = this.select.current.querySelectorAll("select")
                for (let a = 0; a < values.length; a++) {
                    values[a].classList.remove("selec-option")
                }
                if (values[index] != null) {
                    values[index].classList.add("selec-option")
                    viewselect[0].value = values[index].textContent
                    select[0].selectedIndex = index
                }

            } catch (exception) {
                console.error(exception)
            }
        }, 10)
    }


    phoneMapper(e) {
        if (this.state.length > e.target.value.length) {
            if (e.target.value.length == 4 || e.target.value.length == 8) {
                e.target.value = e.target.value.slice(0, -1);
            }
        } else {
            if (e.target.value.length == 3 || e.target.value.length == 7) {
                e.target.value += "-"
            } else if (e.target.value.length == 4 || e.target.value.length == 8) {
                e.target.value = e.target.value.replace(/(.)$/, "-$1");
            }
        }
        this.setState({
            length: e.target.value.length
        })

    }
    focusSelectInout() {
        setTimeout(() => { this.select.current.querySelector("input").focus() }, 100)
    }
    componentDidMount() {
        if (this.select != null) {
            if (this.select.current != null) {
                this.select.current.querySelector(".view-selec-arrow").querySelector(".area-icon").querySelector(".area-icon").setAttribute("d", true)
            }
        }
    }
    render() {

        let data = this.props
        let target_type = data.target == null ? "_self" : data.target
        let typeInput = data.type == null ? "radio" : data.type
        let checked = data.checked != null ? data.checked : false
        let color = data.color == null ? "pink" : data.color
        let colorIcon = color == "pink" ? "white" : "pink"
        let style = data.style == null ? "pink" : data.style


        //es par que funcion en Iphon
        if (typeInput == "select") {
            if (navigator.platform == 'iPad' || navigator.platform == 'iPhone') {
                document.querySelector("body").addEventListener("touchstart", ((e) => {
                    if (e.target.getAttribute("d") == null) {
                        //this.losfocus()
                        this.select.current.querySelector("input").blur()
                        this.isopen = false
                        this.showoption()
                    }
                }))
            }
            else {
                window.addEventListener("click", (e) => {
                    if (e.target.getAttribute("d") == null) {
                        this.isopen = false
                        this.showoption()
                    }
                });
            }
        }
        return (
            <div component="inputwedd" className={"inputwedd" + data.id + " " + data.claseExtra == null ? "" : data.claseExtra}>
                {
                    typeInput == "radio" || typeInput == "checkbox" ?
                        <div className={data.styleForm == null ? "radio-block" : ""}>
                            {data.styleForm == null ?
                                <div className="radio-content">
                                    <input
                                        value={data.value != null ? data.value : ""}
                                        required={data.required != null ? data.required : false}
                                        id={data.id != null ? data.id : ""}
                                        ref={data.refInput != null ? data.refInput : ""}
                                        type={typeInput}
                                        name={data.name != null ? data.name : ""}
                                        onChange={data.changeHandler != null ? data.changeHandler : null}
                                        defaultChecked={checked} />

                                    <label htmlFor={data.id} className="text-radio"><span className="input-radio"></span>
                                        {data.title == null ? "" : data.title}
                                        {data.children != null ? data.children : ""}
                                    </label>
                                </div>
                                :
                                <div key={data.keyValue} className="checkbox">
                                    <input value={data.value != null ? data.value : ""}
                                        type={typeInput} defaultChecked={checked}
                                        className={data.className != null ? data.className : ""}
                                        name={data.name != null ? data.name : ""}
                                        id={data.id != null ? data.id : ""}
                                        ref={data.refInput != null ? data.refInput : ""}
                                        onChange={data.changeHandler != null ? data.changeHandler : null}
                                        required={data.required != null ? data.required : false}
                                        onClick={data.click}
                                    />
                                    <label htmlFor={data.id} className="check-box">
                                        {data.styleForm == "circle" ?
                                            <span className="checks">
                                                <Iconwedd icon={"radio"} color={"pink icon-check checked"} />
                                                <Iconwedd icon={"round-checkbox-selected"} color={"pink icon-check un-checked"} />{/*radio-selected*/}
                                            </span>
                                            : data.styleForm == "square" ?
                                                <span className="checks">
                                                    <Iconwedd icon={"checkbox"} color={"pink icon-check checked"} />
                                                    <Iconwedd icon={"checkbox-selected"} color={"pink icon-check un-checked"} />
                                                </span>
                                                : data.styleForm == "filledcircle" ?
                                                    <span className="checks">
                                                        <Iconwedd icon={"radio"} color={"pink icon-check checked"} />
                                                        <Iconwedd icon={"radio-selected"} color={"pink icon-check un-checked"} />
                                                    </span>
                                                    : data.styleForm == "heart" ?
                                                        <span className="checks">
                                                            <Iconwedd icon={"heart-empty"} color={"pink icon-check checked"} />
                                                            <Iconwedd icon={"heart-full"} color={"pink icon-check un-checked"} />
                                                        </span>
                                                        :
                                                        ""}
                                        <span className="real-label">{data.children != null ? data.children : ""}
                                            {data.title == null ? "" :  (data.title)}</span>
                                    </label>
                                </div>
                            }
                        </div>
                        : typeInput == "text" || typeInput == "email" || typeInput == "password" || typeInput == "search" ?
                            <div className="input-text-block">
                                {data.text != null ? <label className={"labelInput " + (data.text == "jump" ? "empty-label" : "")}>{data.text == "jump" ? <br/> : data.text}</label> : ""}
                                <input type={typeInput}
                                    required={data.required != null ? data.required : false}
                                    id={data.id != null ? data.id : ""}
                                    ref={data.refInput != null ? data.refInput : ""}
                                    name={data.name != null ? data.name : ""}
                                    onClick={data.click != null ? data.click : null}
                                    onChange={data.changeHandler != null ? data.changeHandler : null}
                                    onKeyPress={data.handleKeyPress != null ? data.handleKeyPress : null}
                                    defaultValue={data.value != null ? data.value : ""}
                                    placeholder={data.placeholder != null ? data.placeholder : ""}
                                    className={data.claseExtra != null ? data.claseExtra : ""}
                                    autoComplete="new"
                                    autoFocus={data.autofoco == null ? false : true}
                                />
                                {data.children != null ? data.children : ""}
                            </div>
                            : typeInput == "tel" ?
                                <div className="input-text-block">
                                    <label className="labelInput">{data.text == "jump" ? <br/>: data.text}</label>
                                    <input type={typeInput}
                                        required={data.required != null ? data.required : false}
                                        id={data.id != null ? data.id : ""}
                                        ref={data.refInput != null ? data.refInput : ""}
                                        name={data.name != null ? data.name : ""}
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                        autoComplete="new"
                                        defaultValue={data.value != null ? data.value : ""}
                                        onChange={data.changeHandler != null ? data.changeHandler : null}
                                        onKeyUpCapture={this.phoneMapper.bind()}
                                        placeholder={data.placeholder != null ? data.placeholder : ""} />
                                    {data.children != null ? data.children : ""}
                                </div>
                                : typeInput == "textarea" ?
                                    <div className="input-text-block">
                                        <label className="labelInput">{data.text == "jump" ? <br/> : data.text}</label>
                                        <textarea
                                            type={typeInput}
                                            required={data.required != null ? data.required : false}
                                            id={data.id != null ? data.id : ""}
                                            ref={data.refInput != null ? data.refInput : ""}
                                            name={data.name != null ? data.name : ""}
                                            placeholder={data.placeholder != null ? data.placeholder : ""} >
                                        </textarea>
                                        {data.children != null ? data.children : ""}
                                    </div>
                                    : typeInput == "button" || typeInput == "reset" || typeInput == "submit" ? data.to == null ?
                                        <span>
                                            {data.widthIcon != null ? <Iconwedd icon={data.widthIcon} color={colorIcon + " width-icon"} /> : ""}
                                            <input
                                                style={{ display: style }}
                                                className={"btn type" + (data.typBtn != null ? data.typBtn : "") + " " + color + " " + (data.widthIcon != null ? "width-icon" : "")}
                                                type={typeInput}
                                                id={data.id != null ? data.id : ""}
                                                ref={data.refInput != null ? data.refInput : ""}
                                                name={data.name != null ? data.name : ""}
                                                value={data.value != null ? data.value : ""}
                                                onClick={data.handleClick != null ? data.handleClick : null}
                                                disabled={data.disabled != null ? data.disabled : false}
                                            />
                                            {data.widthIconLeft != null ? <Iconwedd icon={data.widthIconLeft} color={colorIcon + " width-icon"} /> : ""}
                                        </span>
                                        :
                                        <Link to={data.to} className={"btn " + color} style={{ display: style }}>
                                            {data.widthIcon != null ? <Iconwedd icon={data.widthIcon} color={colorIcon + " width-icon"} /> : ""}
                                            {data.value != null ? data.value : ""}
                                            {data.widthIconLeft != null ? <Iconwedd icon={data.widthIconLeft} color={colorIcon + " width-icon"} /> : ""}
                                        </Link>
                                        : typeInput == "href" ?
                                            <a type={"href"} href={data.to} target='_blank' className={"btn type" + (data.typBtn != null ? data.typBtn : "") + " " + color + " " + (data.widthIcon != null ? "width-icon" : "")} >
                                                {data.value}
                                            </a>
                                            : typeInput == "select" ?
                                                <div className="select-weddings" ref={this.select}>
                                                    {data.text != null ? <label className="labelInput">{data.text == "jump" ? <br/> : data.text}</label> : ""}
                                                    <div className="content-select">
                                                        <button type="button" className="caption-select" d="true"
                                                            onClick={(e) => {
                                                                this.showoption()
                                                            }
                                                            }
                                                        >
                                                            <select type={"select"}
                                                                id={data.id != null ? data.id : ""}
                                                                ref={data.refInput != null ? data.refInput : ""}
                                                                name={data.name != null ? data.name : ""}
                                                                required={data.required != null ? data.required : false}
                                                                onChange={data.changeHandler != null ? data.changeHandler : null}
                                                            >
                                                                {this.loadDataSelec(this, 0)}
                                                            </select>
                                                            {/*{this.clickClose.bind()*/}
                                                            <div className="view-selec-arrow " d="true"
                                                            >
                                                                <Iconwedd icon={"chevron-none"} color={"pink"} />
                                                            </div>
                                                            <input name="search"

                                                                d="true"
                                                                readOnly={data.withSearch != null ? false : "readOnly"}
                                                                autoComplete="new"
                                                                onChange={data.changeHandler != null ? data.changeHandler : null}
                                                                style={{ backgroundColor: data.withSearch != null ? "" : "white" }}
                                                                placeholder={data.placeholder != null ? data.placeholder : ""}
                                                                type="search" className="view-selec"
                                                                onKeyUpCapture={this.searchselec.bind(null)}></input>
                                                        </button>
                                                        <div className={"options "} op={(data.name != null ? data.name : "")} onClick={this.props.onchange}>
                                                            {this.loadDataSelec(this, 1)}
                                                        </div>
                                                    </div>
                                                </div>
                                                : typeInput == "view-more" ?
                                                    <div>
                                                        <a type={"href"} className={"linkalt " + color} href={data.to} target={target_type} id={data.id != null ? data.id : ""} name={data.name != null ? data.name : ""}>{data.value}</a>
                                                        <Iconwedd icon={"chevron-right"} color={"pink left"} />
                                                    </div>
                                                    : typeInput == "checkImagen" || typeInput == "radioImagen" ?
                                                        <div className={data.styleForm == null ? "radio-block" : ""}>
                                                            {data.styleForm == null ?
                                                                ""
                                                                :
                                                                <div key={data.keyValue} className="checkbox">
                                                                    <input value={data.value != null ? data.value : ""} type={typeInput == "checkImagen" ? "checkbox" : ""} defaultChecked={checked} className={data.className != null ? data.className : ""} name={data.name != null ? data.name : ""} id={data.id != null ? data.id : ""} ref={data.refInput != null ? data.refInput : ""} onChange={data.changeHandler != null ? data.changeHandler : null} required={data.required != null ? data.required : false} />
                                                                    <label htmlFor={data.id} className="check-box">
                                                                        {
                                                                            data.styleForm == "circle" ?
                                                                                <span className="checksImage">
                                                                                    <Iconwedd icon={"radio"} color={"pink icon-check checked"} />
                                                                                    <Iconwedd icon={"round-checkbox-selected"} color={"pink icon-check un-checked"} />
                                                                                </span>
                                                                                : data.styleForm == "square" ?
                                                                                    <span className="checksImage">
                                                                                        <Iconwedd icon={"checkbox"} color={"pink icon-check checked"} />
                                                                                        <Iconwedd icon={"checkbox-selected"} color={"pink icon-check un-checked"} />
                                                                                    </span>
                                                                                    : data.styleForm == "filledcircle" ?
                                                                                        <span className="checksImage">
                                                                                            <Iconwedd icon={"radio"} color={"pink icon-check checked"} />
                                                                                            <Iconwedd icon={"radio-selected"} color={"pink icon-check un-checked"} />
                                                                                        </span>
                                                                                        : data.styleForm == "heart" ?
                                                                                            <span className="checksImage">
                                                                                                <Iconwedd icon={"heart-empty"} color={"pink icon-check checked"} />
                                                                                                <Iconwedd icon={"heart-full"} color={"pink icon-check un-checked"} />
                                                                                            </span>
                                                                                            : ""
                                                                        }
                                                                        <img alt={data.alt} src={data.img} />
                                                                        <span className="title" style={{ position: "absolute", left: "0", bottom: "1rem", color: "white", textAlign: "center", width: "100%", fontSize: "1rem" }}>{data.title}</span>
                                                                    </label>
                                                                </div>
                                                            }
                                                        </div>
                                                        : typeInput == "alertMsg" ?
                                                            <div className={typeInput}>
                                                                <label style={{ display: data.display }}>{data.text}</label>
                                                            </div>
                                                            : ""
                }
            </div>
        )
    }
}

export default Input;