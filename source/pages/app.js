import createList from "../components/list/list";
import plateModule from '../components/plate/plate';
import 'normalize.css';
import './app.less';

const authBtn = document.querySelector('#authorization');

authBtn.addEventListener('click', plateModule.init.bind(plateModule));