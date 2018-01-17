require('./main.less');

window.addEventListener('load', () => {
    const hello = document.createElement('h1');
    hello.textContent = 'Hello From App';
    hello.className = 'hello__title';

    root.appendChild(hello);
});