const URL_WMS = 'http://localhost:8080/geoserver/geocapixaba/wms';
const WGS84_LATLONG = 'EPSG:4326';
const WGS84_UTM = 'EPSG:3857';

let mousePos = document.getElementById('mouse-position');
document.getElementById('btn').addEventListener('click', function() {
    abastecimentoUrbanoAgua.values_.visible = !abastecimentoUrbanoAgua.values_.visible;
});

let limitesMunicipais = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: URL_WMS,
        params: {
            LAYERS: 'geocapixaba:limites_municipais',
            STYLES: ''
        }
    }),
    visible: false
});

let estacoesTratamentoEsgoto = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: URL_WMS,
        params: {
            LAYERS: 'geocapixaba:estacoes_tratamento_esgoto',
            STYLES: ''
        }
    }),
    visible: false
});

let abastecimentoUrbanoAgua = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: URL_WMS,
        params: {
            LAYERS: 'geocapixaba:abastecimento_urbano_agua',
            STYLES: ''
        }
    }),
    visible: false
});

let mesorregioes = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: URL_WMS,
        params: {
            LAYERS: 'geocapixaba:mesorregioes',
            STYLES: ''
        }
    }),
    visible: true
});

let redeDeGas = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: URL_WMS,
        params: {
            LAYERS: 'geocapixaba:rede_de_gas',
            STYLES: ''
        }
    }),
    visible: false
});

let redeRodoviaria = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: URL_WMS,
        params: {
            LAYERS: 'geocapixaba:rede_rodoviaria',
            STYLES: ''
        }
    }),
    visible: false
});

let sedesMunicipais = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: URL_WMS,
        params: {
            LAYERS: 'geocapixaba:sedes_municipais',
            STYLES: ''
        }
    }),
    visible: false
});

let layers = [limitesMunicipais, estacoesTratamentoEsgoto, abastecimentoUrbanoAgua, 
mesorregioes, redeDeGas, redeRodoviaria, sedesMunicipais];

let mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(7),
    projection: WGS84_LATLONG,
    callName: 'custom-mouse-position',
    target: mousePos,
    undefinedHTML: '&nbsp'
});

let map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
        source: new ol.source.OSM()
        }),
        mesorregioes,
        limitesMunicipais,
        estacoesTratamentoEsgoto,
        abastecimentoUrbanoAgua,
        redeDeGas,
        redeRodoviaria,
        sedesMunicipais
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([-40.483260, -19.691305]),
        zoom: 7.5
    }),
    controls: ol.control.defaults({
        attributionOptions: ({
            collapsible: false
        })
    }).extend([mousePositionControl])
});

map.on('singleclick', function(evt){
    let coordinate = evt.coordinate;
    let viewResolution = map.getView().getResolution();
    
    let urlInfo;
    let queryArray = [];
    layers.forEach((l) => {
        if (l.values_.visible === true) {
            urlInfo = l.getSource().getFeatureInfoUrl (
                coordinate, viewResolution, WGS84_UTM, {'INFO_FORMAT': 'text/html'}
            );
            queryArray.push(urlInfo);
        }
    });

    queryArray.forEach((url) => {
        fetch(url)
        .then(res => {
            return res.text();
        })
        .then(text => {
            console.log(text);
        })
        .catch((err) => {
            console.log(err);
        });
    });

});
