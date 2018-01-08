require('./style/index.css');

let templateFn = require('./template/comment-template.hbs');
let yandexMap = document.getElementById('map');
let reviewWindow = document.querySelector('.review');
let location = reviewWindow.querySelector('.location__text');
let reviewList = reviewWindow.querySelector('.review__list');
let reviewForm = reviewWindow.querySelector('.form');
let nameField = reviewForm.querySelector('.form__input[name=name]');
let placeField = reviewForm.querySelector('.form__input[name=place]');
let messageField = reviewForm.querySelector('.form__area');
let closeButton = document.querySelector('.x-mark');
let settings = {
    center: [55.76, 37.64],
    zoom: 12,
    controls: ['zoomControl']
};

function getData(map, clusterer) {

    let data = JSON.parse(localStorage.getItem('comments'));

    if (!data) {
        return {};
    }

    Object.keys(data).forEach((coords) => {
        data[coords].forEach((comment) => {
            addPlacemark(coords.split(','), map, clusterer, comment);
        });
    });

    return data;
}
function getReviewPosition(e) {
    let top = e.get('domEvent').originalEvent.pageY,
        left = e.get('domEvent').originalEvent.pageX;

    return [top, left];
}
function openReview(array, coords) {
    if (reviewWindow.style.opacity == 1) {
        closeReview();

        return;
    }

    reviewList.innerHTML = '';

    let geocoder = ymaps.geocode(coords, {
        results: 1
    });

    geocoder.then((result) => {
        let locationText = result.geoObjects.get(0).properties.get('text');

        location.innerText = locationText;
        reviewWindow.dataset.coords = coords;

        if ((innerHeight - array[0]) < reviewWindow.offsetHeight) {
            reviewWindow.style.top = 0 + 'px';
        } else {
            reviewWindow.style.top = array[0] + 'px';
        }

        if ((innerWidth - array[1]) < reviewWindow.offsetWidth) {
            reviewWindow.style.left = array[1] - reviewWindow.offsetWidth + 'px';
        } else {
            reviewWindow.style.left = array[1] + 'px';
        }

        reviewWindow.style.opacity = 1;
    });

    if (allComments.hasOwnProperty(coords)) {

        reviewList.innerHTML = templateFn({
            comments: allComments[coords]
        });
    }
}
function closeReview(e) {
    if (e) {
        e.preventDefault();
    }

    reviewWindow.style.left = '-9999px';
    reviewWindow.style.opacity = 0;
}
function addPlacemark(coords, map, clusterer, content) {

    let place = new ymaps.Placemark(coords, {
        coords: coords,
        place: content.place,
        comment: content.comment,
        date: content.date
    });

    map.geoObjects.add(place);
    clusterer.add(place);
}

let allComments = {};

ymaps.ready(function() {
    let myMap = new ymaps.Map('map', settings);

    myMap.behaviors.disable('dblClickZoom');

    let customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        '<h2 class=ballon__header>{{ properties.place|raw }}</h2>' +
        '<div class=ballon__body>' +
        '   <a href="#" data-coords={{properties.coords}} class="baloon__link">{{ properties.comment|raw }}</a> ' +
        '   <br/> {{properties.comment|raw}}</div>' +
        '<div class=ballon__footer>{{ properties.date|raw }}</div>'
    );
    let clusterer = new ymaps.Clusterer({
        groupByCoordinates: false,
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false,
        gridSize: 80,
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonItemContentLayout: customItemContentLayout,
        clusterBalloonPanelMaxMapArea: 0,
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 130,
        clusterBalloonPagerSize: 5
    });

    myMap.geoObjects.add(clusterer);

    allComments = getData(myMap, clusterer);

    myMap.events.add('click', function(e) {
        let coords = e.get('coords');

        openReview(getReviewPosition(e), coords);

    });

    clusterer.events.add('click', function (e) {
        let object = e.get('target');

        if (object.options.getName() === 'geoObject') {
            let coords = object.geometry.getCoordinates();

            openReview(getReviewPosition(e), coords);

        }
    });

    closeButton.addEventListener('click', closeReview);
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (isEmpty(reviewForm)) {
            return;
        }

        let comment = {};
        let coords = reviewWindow.dataset.coords;
        let name = nameField.value.trim();
        let place = placeField.value.trim();
        let message = messageField.value.trim();
        let data = new Date();
        let dataMessage =`${data.getFullYear()}.${formatDate(data.getMonth()+1)}.${formatDate(data.getDate())}`+
            ` ${formatDate(data.getHours())}:${formatDate(data.getMinutes())}:${formatDate(data.getSeconds())}`;

        comment.name = name;
        comment.place = place;
        comment.date = dataMessage;
        comment.comment = message;

        reviewList.innerHTML += templateFn({
            comments: [comment]
        });

        addPlacemark(coords.split(','), myMap, clusterer, comment);

        if (!allComments.hasOwnProperty(coords)) {
            allComments[coords] = [comment];
        } else {
            allComments[coords].push(comment);
        }

        localStorage.setItem('comments', JSON.stringify(allComments));

        nameField.value = '';
        placeField.value = '';
        messageField.value = '';

    });
    yandexMap.addEventListener('click', function(e) {
        let link = e.target;

        if (link.classList.contains('baloon__link')) {
            let coords = link.dataset.coords.split(','),
                top = e.pageY,
                left = e.pageX;

            openReview([top, left], coords);
        }
    });
});

function formatDate(date) {
    return date < 10 ? '0' + date : date;
}

function isEmpty(form) {
    let inputs = form.querySelectorAll('input');
    let textArea = form.querySelectorAll('textarea');
    let empty = false;

    [...inputs, ...textArea].forEach((item) => {
        if (!item.value) {
            item.style.borderColor = 'red';
            empty = 'true';
        } else {
            item.style = '';
        }
    });

    return empty;

}