require("babel-core/register");
require("babel-polyfill");
import template from '../components/list/list.hbs';

const vkModule = {
    async init() {
        const errorContainer = document.querySelector('#error');
        const userInfo = document.querySelector('#userInfo');
        const results = document.querySelector('#listContainer');

        errorContainer.innerHTML = '';

        try {
            await this.authorization();

            const [me] = await this.callAPI('users.get', { name_case: 'gen' });
            userInfo.textContent = `Друзья на странице ${me.first_name} ${me.last_name}`;

            const friends = await this.callAPI('friends.get', { fields: 'photo_100' });
            const html = template(friends);

            results.innerHTML = html;
        } catch (error) {
            errorContainer.innerText = `${error}, попробуйте позже`;
        }
    },
    authorization() {
        return new Promise((resolve, reject) => {
            VK.init({
                apiId: 6303649
            });
            VK.Auth.login(data => {
                if (data.session) {
                    resolve();
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, 2);
        });
    },
    callAPI(method, params) {
        params.v = '5.69';

        return new Promise((resolve, reject) => {
            VK.api(method, params, (data) => {
                if (data.error) {
                    reject(data.error);
                } else {
                    this.allFriends = data.response;
                    resolve(data.response);
                }
            });
        })
    }
}

export default vkModule;