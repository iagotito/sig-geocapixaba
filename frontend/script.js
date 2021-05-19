const URL_WMS = 'http://localhost:8080/geoserver/geocapixaba/wms';
const WGS84_LATLONG = 'EPSG:4326';
const WGS84_UTM = 'EPSG:3857';

let $mousePos = document.getElementById('mouse-position');
let $container = document.getElementById('popup');
let $content = document.getElementById('popup-content');
let $closer = document.getElementById('popup-closer');

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
    visible: false
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

let sedesPorMeso = new ol.layer.Image({visible: false});

let layers = {
    mesorregioes: mesorregioes,
    limitesMunicipais: limitesMunicipais,
    abastecimentoUrbanoAgua: abastecimentoUrbanoAgua, 
    redeRodoviaria: redeRodoviaria,
    redeDeGas: redeDeGas,
    sedesMunicipais: sedesMunicipais,
    estacoesTratamentoEsgoto: estacoesTratamentoEsgoto,
    sedesPorMeso: sedesPorMeso
};

let mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(7),
    projection: WGS84_LATLONG,
    callName: 'custom-mouse-position',
    target: $mousePos,
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
        sedesMunicipais,
        sedesPorMeso
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
    Object.values(layers).forEach((l) => {
        if (l.values_.visible === true) {
            urlInfo = l.getSource().getFeatureInfoUrl (
                coordinate, viewResolution, WGS84_UTM, {'INFO_FORMAT': 'text/html'}
            );
            queryArray.push(urlInfo);
        }
    });

    $content.innerHTML = '';
    queryArray.forEach((url) => {
        fetch(url)
        .then(res => {
            return res.text();
        })
        .then(text => {
            handleResult(text, coordinate);
        })
        .catch((err) => {
            console.log(err);
        });
    });
});

function activeLayer(layerName, visible) {
    layer = layers[layerName];
    layer.setVisible(visible);
}

function handleResult(result,coordinate) {
	 let html = subStringBody(result);
	 $content.innerHTML += result;
	 overlay.setPosition(coordinate);
}

function subStringBody(html) {
	let i = html.indexOf("<body>");
	let f = html.indexOf("</body>");
	if(i >= 0 && f >= 0) {
		i += 6;
		return html.substring(i, f);
	}
}

let overlay = new ol.Overlay(({
    element: $container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
}));

$closer.onclick = function() {
    overlay.setPosition(undefined);
    $closer.blur();
    return false;
};

map.addOverlay(overlay);

let $mesoSelect = document.getElementById('meso_select');
function getSedesFromMeso() {
    let mesoName = $mesoSelect.value;
    map.removeLayer(sedesPorMeso);
    if (mesoName === '') {return;}
    sedesPorMeso = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            url: URL_WMS,
            params: {
                LAYERS: 'geocapixaba:sedes_por_mesorregiao',
                STYLES: '',
                VIEWPARAMS: `mesorregiao_nm:${mesoName}`
            }
        }),
        visible: true
    });
    map.addLayer(sedesPorMeso);
}
