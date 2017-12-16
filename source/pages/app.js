import createList from "../components/list/list";
import 'normalize.css';
import './app.less';

let container = document.querySelector('#listContainer');
let listItems = {
    friends: [
        {
            photo: "http://i.imgur.com/GMIH8dO.gif",
            name: "Artem",
            lastName: "Barabanov"
        },
        {
            photo: "http://www.animated-gifs.eu/category_cartoons/avatars-100x100-cartoons-spongebob/0038.gif",
            name: "Иришка",
            lastName: "Кочерыжка"
        },
    ]
};
let list = createList(listItems);

container.innerHTML = list;