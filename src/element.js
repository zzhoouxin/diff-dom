//虚拟DOM元素类。
class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}

// 创建虚拟DOM，返回虚拟节点(object)
function createElement(type, props, children) {
    return new Element(type, props, children);
}

// render方法可以将虚拟DOM转化成真实DOM
function render(domObj) {
    // 根据type类型来创建对应的元素
    let el = document.createElement(domObj.type);

    // 再去遍历props属性对象，然后给创建的元素el设置属性
    for (let key in domObj.props) {
        // 设置属性的方法
        setAttr(el, key, domObj.props[key]);
    }
    // 遍历子节点
    // 如果是虚拟DOM，就继续递归渲染
    // 不是就代表是文本节点，直接创建
    domObj.children.forEach(child => {
        child = (child instanceof Element) ? render(child) : document.createTextNode(child);
        // 添加到对应元素内
        el.appendChild(child);
    });

    return el;
}


//设置属性
function setAttr(dom, key, value) {
    switch (key) {
        case 'value':
            // dom是一个input或者textarea就直接设置其value即可
            if (dom.tagName.toLowerCase() === 'input' ||
                dom.tagName.toLowerCase() === 'textarea') {
                dom.value = value;
            } else {
                dom.setAttribute(key, value);
            }
            break;
        case 'style':
            //如果是样式直接设置样式
            dom.style.cssText = value;
            break;
        default:
            dom.setAttribute(key, value);
            break;
    }
}

// 将元素插入到页面内
function renderDom(el, target) {
    target.appendChild(el);
}
export {
    Element,
    createElement,
    render,
    setAttr,
    renderDom
};




