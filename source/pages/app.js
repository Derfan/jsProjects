import createList from "../components/list/list";
import getList from "../components/vkApi";
import 'normalize.css';
import './app.less';

let authBtn = document.querySelector('#authorization');
let closeWindow = document.querySelector('#closeWindow');

authBtn.addEventListener('click', getList);

closeWindow.addEventListener('click', (e) => {
    const plate = document.querySelector('.plate-wrapper');
    e.preventDefault();

    plate.classList.remove('show');
});