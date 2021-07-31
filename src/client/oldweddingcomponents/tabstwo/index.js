import React, { Component } from 'react';
import { Input, Iconwedd } from '../../oldweddingcomponents';

class Tabstwo extends Component {
    state = {}
    move = 0
    size = 0
    scrollPoint = 0
    fontSize = 0
    sizemenu = 0
    sizeMove = 0
    constructor() {
        super();
        this.activeTabsHead = this.activeTabsHead.bind(this);
        this.moveScroll = this.moveScroll.bind(this);
        this.tabsHead = React.createRef();
        this.points = React.createRef();
    }

    componentDidMount() {
        document.querySelector("html").style = ""
        let arrTabs = this.tabsHead.current.children
        for (let index = 0; index < arrTabs.length; index++) {
            const element = arrTabs[index];
            element.style = "left:-00%"
        }
        this.fontSize = parseFloat(window.getComputedStyle(document.body).fontSize.substring(-2, 2))
        this.scrollPoint = this.tabsHead.current.getBoundingClientRect().top - ((this.sizemenu) * this.fontSize) + scrollY
        this.scrollPoint = this.scrollPoint < 0 ? -(this.scrollPoint) : this.scrollPoint

        this.props.onSelectTab(this.activeTabsHead);
    }


    activeTabsHead(index) {
        try {
            let itemHeadtab = this.tabsHead.current.children
            for (let i = 0; i < itemHeadtab.length; i++) {
                itemHeadtab[i].classList.remove("active")
                itemHeadtab[i].classList.remove("tabtitlealt")
            }
            itemHeadtab[index].classList.add("active")
            itemHeadtab[index].classList.add("tabtitlealt")
            if (this.props.isOurResort == null) {
                document.querySelector("html").style = "scroll-behavior: smooth;"
                this.sizemenu = ((window.innerWidth > 1024 ? 102.5 : 45 / 16 * this.fontSize))
                let startOn = document.getElementById("replace-size")
                let scroPointer = (scrollY + startOn.getBoundingClientRect().top) - this.sizemenu
                scrollTo(0, scroPointer);
                document.querySelector("html").style = ""
            }
        }
        catch (exception) {
            console.error(exception)
        }
        //--------------------------
    }

    moveScroll() {
        let arrTabs = this.tabsHead.current.children
        let sizefull = this.tabsHead.current.scrollLeft
        for (let index = 0; index < arrTabs.length; index++) {
            const element = arrTabs[index];
            sizefull += element.offsetWidth
        }

        const element = arrTabs[this.move];
        if (this.sizeMove == 0) {
            this.sizeMove = element.offsetWidth
        }
        this.tabsHead.current.scrollBy((parseInt(this.sizeMove)*this.move), 0)

    }
    less() {
        this.move=-1
            this.moveScroll()
    }
    more() {
        this.move=1
            this.moveScroll()
    }
    render() {
        let countType = 0;
        const children = this.props.children || [];

        const headTabs = children.map((element, index) => {
            if (element != null) {
                if (element.type == "a") {
                    countType++
                }
            }
            this.size = countType
            return element == null ? "" : element.type != "a" ?
                <div>{element}
                </div> :
                <li key={index}
                    onClick={this.activeTabsHead.bind(this, index)}
                    className={(children.length < 4 ? "tabs-" +
                        children.length : "tab-max-width") + " " + (index == 0 ? "tabtitlealt active tab-title" : "tab-title")}>
                    {element}
                    <div className="tabs-arrow"></div>
                </li>
        })
        document.querySelector("html").style = ""
        setTimeout(() => {
            if (localStorage.isBackTabs != null) {
                localStorage.removeItem("isBackTabs")
                window.scrollTo(0, parseFloat(localStorage.localScrolY));
                localStorage.removeItem("localScrolY")
            }
        })
        return (
            <section component="tabstwo" id="tabstwo-wedd" ref={!this.props.referencia ? null : this.props.referencia} className={this.props.class}>
                <ul className={"head-tabs " + (countType > 3 ? "overflow-tab" : "")} ref={this.tabsHead}
                >
                    {headTabs}
                </ul>
                {countType > 4 ?
                    <div className="controlArrow" ref={this.points} >
                        <div className="left" onClick={() => { this.less() }}>
                            <Iconwedd icon={"chevron-carousel-left"} color={"pink"} />
                        </div>
                        <div className="right" onClick={() => { this.more() }}>
                            <Iconwedd icon={"chevron-carousel-right"} color={"pink"} />
                        </div>
                    </div> : ""
                }
            </section>
        )
    }
}

Tabstwo.defaultProps = {
    onSelectTab: (item) => { },
};

export default Tabstwo;