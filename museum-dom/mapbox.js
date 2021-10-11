mapboxgl.accessToken = 'pk.eyJ1IjoicnViaWFxdXRlIiwiYSI6ImNrdWZndTJ1MjBtOGsycHFrZmFxanFvM2QifQ.ftLft-x0arMll3Pd_A7Ghw';
var map = new mapboxgl.Map({
container: 'map',
center: [2.3364, 48.86091],
zoom: 15.5,
style: 'mapbox://styles/mapbox/light-v10'
})

const marker1 = new mapboxgl.Marker({
color: "#000000",
scale:0.75,
draggable: false
}).setLngLat([2.3364, 48.86091])
.addTo(map);

const marker2 = new mapboxgl.Marker({
color: "#939393",
scale:0.75,
draggable: false
}).setLngLat([2.3333, 48.8602])
.addTo(map);

const marker3 = new mapboxgl.Marker({
color: "#939393",
scale:0.75,
draggable: false
}).setLngLat([2.3397, 48.8607])
.addTo(map);

const marker4 = new mapboxgl.Marker({
color: "#939393",
scale:0.75,
draggable: false
}).setLngLat([2.3330, 48.8619])
.addTo(map);

const marker5 = new mapboxgl.Marker({
    color: "#939393",
    scale:0.75,
    draggable: false
    }).setLngLat([2.3365, 48.8625])
    .addTo(map);
    const nav = new mapboxgl.NavigationControl({
        showZoom: true
        });
        map.addControl(nav, 'top-right');
