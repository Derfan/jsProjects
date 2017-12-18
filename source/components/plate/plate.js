import vkModule from '../vkApi';
import template from './plate.hbs';
import './plate.less';

const plate = document.querySelector('.plate-container');

const plateModule = {
    closeBtn: undefined,
    movingBtns: undefined,
    leftList: undefined,
    rightList: undefined,
    async init() {
        if (localStorage.getItem('friendList') || localStorage.getItem('friendFilter'))  {
            this.checkLocalStorage();
        } else {
            plate.innerHTML = template();
            await vkModule.init();
            this.movingBtns = document.querySelectorAll('.move-button');
            this.leftList = document.querySelector('#leftList');
            this.rightList = document.querySelector('#rightList');

            for (let link of this.movingBtns) {
                link.addEventListener('click', this.setEvent.bind(this));
            }

            this.closeBtn = document.querySelector('#closeWindow');
            this.closeBtn.addEventListener('click', this.close);
        }
    },
    setEvent(e) {
        let icon = e.target;
        let friend = icon.parentNode.parentNode;

        if (friend.parentNode.id.includes('leftList')) {
            this.leftList.removeChild(friend);
            this.rightList.appendChild(friend);
            icon.innerText = 'delete';
        }
        else {
            this.rightList.removeChild(friend);
            this.leftList.appendChild(friend);
            icon.innerText = 'add';
        }
    },
    checkLocalStorage() {
        friendList.innerHTML = template(
            JSON.parse(localStorage.getItem('friendList'))
        );
        friendFilter.innerHTML = template(
            JSON.parse(localStorage.getItem('friendFilter'))
        );
    },
    close(e) {
        e.preventDefault();

        plate.innerHTML = '';
    }
}

export default plateModule;