require("babel-core/register");
require("babel-polyfill");
import template from '../components/list/list.hbs';

const errorContainer = document.querySelector('#error');

VK.init({
    apiId: 6302084
});

function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    });
}

function callAPI(method, params) {
    params.v = '5.69';

    return new Promise((resolve, reject) => {
        VK.api(method, params, (data) => {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.response);
            }
        });
    })
}

export default async () => {
    try {
        const userInfo = document.querySelector('#userInfo');
        const results = document.querySelector('#listContainer');
        const plate = document.querySelector('.plate-wrapper');

        errorContainer.innerText =  '';

        await auth();
        const [me] = await callAPI('users.get', { name_case: 'gen' });
        userInfo.textContent = `Друзья на странице ${me.first_name} ${me.last_name}`;

        const friends = await callAPI('friends.get', { fields: 'photo_100' });
        const html = template(friends);

        results.innerHTML = html;
        plate.classList.add('show');
    } catch (error) {
        errorContainer.innerText = `${error}, попробуйте позже`;
    }
}