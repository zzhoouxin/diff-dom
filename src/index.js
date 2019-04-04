import {createElement,render,renderDom} from './element.js';
import diff from './diff';
import patch from './patch';

let virtualDom = createElement('ul',{class:'list'},

        [createElement('li', {class: 'item'}, ['周杰伦']),
        createElement('li', {class: 'item'}, ['林俊杰']),
        createElement('li', {class: 'item'}, ['周西村'])
    ]);


let el = render(virtualDom);
renderDom(el, document.getElementById('root'));
// 创建另一个新的虚拟DOM
let virtualDom2 = createElement('ul', {class: 'list-group'}, [
    createElement('li', {class: 'item'}, ['周杰伦']),
    createElement('li', {class: 'item active'}, ['七里香']),
    createElement('li', {class: 'item active'}, ['一千年以后']),
    // createElement('li', {class: 'item'}, ['需要人陪'])    
]);


// let virtualDom3 = false;

// diff一下两个不同的虚拟DOM
let patches = diff(virtualDom, virtualDom2);
// 将变化打补丁，更新到el
setTimeout(()=>{
    patch(el, patches); 
},3000)
// patch(el, patches);
