import vkModule from '../vkApi';
import dnd from '../dnd';
import template from './plate.hbs';
import itemTemplate from '../list/list.hbs';
import './plate.less';

const plateModule = {
    plate: document.querySelector('.plate-container'),
    closeBtn: undefined,
    saveBtn: undefined,
    movingBtns: undefined,
    leftList: undefined,
    rightList: undefined,
    inputLeft: undefined,
    inputRight: undefined,
    userInfo: undefined,
    userElem: undefined,
    friends: undefined,
    async init() {
        this.plate.innerHTML = template();
        this.userElem = document.querySelector('#userInfo');
        this.leftList = document.querySelector('#leftList');
        this.rightList = document.querySelector('#rightList');

        this.inputLeft = document.querySelector('#inputLeft');
        this.inputRight = document.querySelector('#inputRight');

        this.saveBtn = document.querySelector('#saveFriend');
        this.closeBtn = document.querySelector('#closeWindow');

        if (localStorage.getItem('leftList') || localStorage.getItem('rightList'))  {
            await this.renderFromLocal();
            this.setParams();
        } else {
            await vkModule.init();
            this.setParams();
        }
    },
    setParams() {
        this.friends = document.querySelectorAll('.friend');
        this.userInfo = document.querySelector('#userInfo').innerText;
        this.movingBtns = document.querySelectorAll('.move-button');
        
        for (let friend of this.friends) {
            friend.addEventListener('click', this.move);
            friend.addEventListener('dragstart', dnd.dragStart);
            friend.addEventListener('dragover', dnd.dragOver);
            friend.addEventListener('dragenter', dnd.dragEnter);
            friend.addEventListener('drop', dnd.dragDrop);
        }

        this.inputLeft.addEventListener('keyup', this.filter.bind(this));
        this.inputRight.addEventListener('keyup', this.filter.bind(this));

        this.saveBtn.addEventListener('click', this.save.bind(this));
        this.closeBtn.addEventListener('click', this.close.bind(this));
    },
    createFriendObject(friend) {
        const friendObject = new Object();
        const arrayOfNames = friend.querySelector('span').textContent.split(' ');
        const photo = friend.querySelector('img').src;

        friendObject.id = friend.id;
        friendObject.first_name = arrayOfNames[0];
        if (arrayOfNames.length > 1) {
            friendObject.last_name = arrayOfNames[1];
        }
        friendObject.photo_100 = photo;

        return friendObject;
    },
    renderFromLocal() {
        this.userElem.innerText = localStorage.getItem('user');
        this.leftList.innerHTML = itemTemplate(JSON.parse(localStorage.getItem('leftList')));
        this.rightList.innerHTML = itemTemplate(JSON.parse(localStorage.getItem('rightList')));
    }, 
    isMatching(full, chunk) {
        return full.toLowerCase().includes(chunk.toLowerCase());
    },
    filter(e) {
        const friends = (e.target.id === 'inputLeft') ? this.leftList : this.rightList;

        [].forEach.call(friends.children, i => {
            i.hidden = (this.isMatching(i.textContent.trim(), e.target.value)) ? false : true;
        })
    },
    move() {
        if (this.parentNode.id.includes('leftList')) {
            plateModule.leftList.removeChild(this);
            plateModule.rightList.appendChild(this);
        }
        else {
            plateModule.rightList.removeChild(this);
            plateModule.leftList.appendChild(this);
        }
    },
    save() {
        const user = this.userInfo;
        const friendsList = new Object();
        const friendsFilter = new Object();

        friendsList.items = [];
        friendsFilter.items = [];

        [].forEach.call(this.leftList.children, friend => friendsList.items.push(this.createFriendObject(friend)));
        [].forEach.call(this.rightList.children, friend => friendsFilter.items.push(this.createFriendObject(friend)));

        localStorage.setItem('user', user);
        localStorage.setItem('leftList', JSON.stringify(friendsList));
        localStorage.setItem('rightList', JSON.stringify(friendsFilter));
    },
    close(e) {
        e.preventDefault();

        this.plate.innerHTML = '';
    }
}

export default plateModule;