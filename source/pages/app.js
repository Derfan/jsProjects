import createMenu from "../components/menu/menu";
import 'normalize.css';
import './app.less';


let wrapper = document.querySelector('.wrapper');
let context = { 
    title: "HBS Menu", 
    className: "menu",
    menuItems: [
        {
            content: 'Main'
        },
        {
            content: 'About'
        },
        {
            content: 'Blog'
        }
    ]
};
let menu = createMenu(context);

wrapper.innerHTML = menu;