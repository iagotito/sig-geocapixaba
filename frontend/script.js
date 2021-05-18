const URL_WMS = 'http://localhost:8080/geoserver/geocapixaba/wms';

var mousePos = document.getElementById('mouse-position');

var limitesMunicipais = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: URL_WMS,
        params: {
            LAYERS: 'geocapixaba:limites_municipais',
            STYLES: ''
        }
    }),
    visible: true
});

var estacoesTratamentoEsgoto = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: URL_WMS,
        params: {
            LAYERS: 'geocapixaba:estacoes_tratamento_esgoto',
            STYLES: ''
        }
    }),
    visible: true
});

var abastecimentoUrbanoAgua = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: URL_WMS,
        params: {
            LAYERS: 'geocapixaba:abastecimento_urbano_agua',
            STYLES: ''
        }
    }),
    visible: true
});

var mesorregioes = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: URL_WMS,
        params: {
            LAYERS: 'geocapixaba:mesorregioes',
            STYLES: ''
        }
    }),
    visible: true
});

var redeDeGas = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: URL_WMS,
        params: {
            LAYERS: 'geocapixaba:rede_de_gas',
            STYLES: ''
        }
    }),
    visible: true
});

var redeRodoviaria = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: URL_WMS,
        params: {
            LAYERS: 'geocapixaba:rede_rodoviaria',
            STYLES: ''
        }
    }),
    visible: true
});

var sedesMunicipais = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: URL_WMS,
        params: {
            LAYERS: 'geocapixaba:sedes_municipais',
            STYLES: ''
        }
    }),
    visible: true
});

var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(7),
    projection: 'EPSG_4326',
    callName: 'custom-mouse-position',
    target: mousePos,
    undefinedHTML: '&nbsp'
});

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
        source: new ol.source.OSM()
        }),
        limitesMunicipais,
        abastecimentoUrbanoAgua,
        estacoesTratamentoEsgoto,
        mesorregioes,
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
