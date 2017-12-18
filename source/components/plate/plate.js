import vkModule from '../vkApi';
import template from './plate.hbs';
import './plate.less';

const plate = document.querySelector('.plate-container');

const plateModule = {
    closeBtn: undefined,
    async init() {
        plate.innerHTML = template();
        await vkModule.init();
        this.closeBtn = document.querySelector('#closeWindow');

        this.closeBtn.addEventListener('click', this.close);
    },
    close(e) {
        e.preventDefault();

        plate.innerHTML = '';

        console.log(this);
    }
}

export default plateModule;