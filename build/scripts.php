<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"></script>
<script>
    ymaps.ready(init);
    let myMap;

    function init() {
        if (document.body.clientWidth < 768) {
            myMap = new ymaps.Map("map", {
                center: [59.938631, 30.323055],
                zoom: 17
            });

            myMap.behaviors.disable('scrollZoom');

            let myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {}, {
                iconLayout: 'default#image',
                iconImageHref: 'img/map-pin.svg',
                iconImageSize: [72, 53],
                iconImageOffset: [-36, -53]
            });

            myMap.geoObjects.add(myPlacemark);
        } else if (document.body.clientWidth >= 768 && document.body.clientWidth < 1300) {
            myMap = new ymaps.Map("map", {
                center: [59.938631, 30.323055],
                zoom: 17
            });

            myMap.behaviors.disable('scrollZoom');

            let myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {}, {
                iconLayout: 'default#image',
                iconImageHref: 'img/map-pin.svg',
                iconImageSize: [72, 53],
                iconImageOffset: [-36, -53]
            });

            myMap.geoObjects.add(myPlacemark);
        } else if (document.body.clientWidth >= 1300) {
            myMap = new ymaps.Map("map", {
                center: [59.938963, 30.319293],
                zoom: 17
            });

            myMap.behaviors.disable('scrollZoom');

            let myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {}, {
                iconLayout: 'default#image',
                iconImageHref: 'img/map-pin.svg',
                iconImageSize: [124, 106],
                iconImageOffset: [-72, -106]
            });

            myMap.geoObjects.add(myPlacemark);
        }
    }

</script>
<script src="js/main.js"></script>