import vkModule from '../vkApi';
import template from './plate.hbs';
import itemTemplate from '../list/list.hbs';
import './plate.less';

const plate = document.querySelector('.plate-container');

const plateModule = {
    closeBtn: undefined,
    saveBtn: undefined,
    movingBtns: undefined,
    leftList: undefined,
    rightList: undefined,
    userInfo: undefined,
    userElem: undefined,
    async init() {
        plate.innerHTML = template();
        this.userElem = document.querySelector('#userInfo');
        this.leftList = document.querySelector('#leftList');
        this.rightList = document.querySelector('#rightList');
        this.saveBtn = document.querySelector('#saveFriend');
        this.closeBtn = document.querySelector('#closeWindow');

        if (localStorage.getItem('leftList') || localStorage.getItem('rightList'))  {
            this.checkLocalStorage();
            this.setParams();
        } else {
            await vkModule.init();
            this.setParams();
        }
    },
    setParams() {
        this.userInfo = document.querySelector('#userInfo').innerText;
        this.movingBtns = document.querySelectorAll('.move-button');

        for (let link of this.movingBtns) {
            link.addEventListener('click', this.setEvent.bind(this));
        }
        this.saveBtn.addEventListener('click', this.save.bind(plateModule));
        this.closeBtn.addEventListener('click', this.close);
    },
    setEvent(e) {
        e.preventDefault();

        let friend = e.target.parentNode;

        if (friend.parentNode.id.includes('leftList')) {
            this.leftList.removeChild(friend);
            this.rightList.appendChild(friend);
        }
        else {
            this.rightList.removeChild(friend);
            this.leftList.appendChild(friend);
        }
    },
    createFriendObject(friend) {
        const friendObject = new Object();
        const arrayOfNames = friend.querySelector('span').textContent.split(' ');
        const photo = friend.querySelector('img').src;

        friendObject.first_name = arrayOfNames[0];
        if (arrayOfNames.length > 1) {
            friendObject.last_name = arrayOfNames[1];
        }
        friendObject.photo_100 = photo;

        return friendObject;
    },
    checkLocalStorage() {
        this.userElem.innerText = localStorage.getItem('user');
        this.leftList.innerHTML = itemTemplate(
            JSON.parse(localStorage.getItem('leftList'))
        );
        this.rightList.innerHTML = itemTemplate(
            JSON.parse(localStorage.getItem('rightList'))
        );
    },
    save() {
        const friendsList = new Object();
        const friendsFilter = new Object();
        const user = this.userInfo;

        friendsList.items = [];
        friendsFilter.items = [];

        [].forEach.call(this.leftList.children, (friend) => {
            friendsList.items.push(this.createFriendObject(friend));
        });

        [].forEach.call(this.rightList.children, (friend) => {
            friendsFilter.items.push(this.createFriendObject(friend));
        })

        localStorage.setItem('user', user);
        localStorage.setItem('leftList', JSON.stringify(friendsList));
        localStorage.setItem('rightList', JSON.stringify(friendsFilter));
    },
    close(e) {
        e.preventDefault();

        plate.innerHTML = '';
    }
}

export default plateModule;