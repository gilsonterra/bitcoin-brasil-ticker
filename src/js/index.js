function formatReal(n) {
    return "R$ " + parseFloat(n).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}

function datePtBr() {
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();    
    var hora = data.getHours();
    var minuto = data.getMinutes();
    var segundo = data.getSeconds();

    if (dia.toString().length == 1)
        dia = "0" + dia;

    if (mes.toString().length == 1)
        mes = "0" + mes;
    
    if(hora < 10)
        hora = "0" + hora;

    if(minuto < 10)
        minuto = "0" + minuto;

    if(segundo < 10)
        segundo = "0" + segundo;

    return dia + "/" + mes + "/" + ano + ' ' + hora + ':' + minuto + ':' + segundo;
}

function renderLoading(parentNode) {
    var template = document.getElementById('template-loading').content.cloneNode(true);
    parentNode.innerHTML = '';
    parentNode.appendChild(template);
}

function renderBoxTicker(parentNode, title, data) {
    var template = document.getElementById('template-box-ticker').content.cloneNode(true);
    template.querySelector('.title').innerHTML = title;
    template.querySelector('.date').innerHTML = datePtBr();
    template.querySelector('.last').innerHTML = formatReal(data.last);
    template.querySelector('.high').innerHTML = formatReal(data.high);
    template.querySelector('.low').innerHTML = formatReal(data.low);
    template.querySelector('.buy').innerHTML = formatReal(data.buy);
    template.querySelector('.sell').innerHTML = formatReal(data.sell);

    parentNode.innerHTML = '';
    parentNode.appendChild(template);
}

function request(url, box, title, prefixData) {
    //renderLoading(box);
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (json) {
        var data = prefixData != '' ? json[prefixData] : json;
        renderBoxTicker(box, title, data);
    })
}

function requestValues() {
    request(
        'https://www.mercadobitcoin.net/api/BTC/ticker/',
        document.querySelector('.mercadobitcoin'),
        'Mercado Bitcoin',
        'ticker'
    );
    request(
        'https://api.bitcointrade.com.br/v1/public/BTC/ticker',
        document.querySelector('.bitcointrade'),
        'Bitcoin Trade',
        'data'
    );
    request(
        'https://foxbit.com.br/ticker/ticker.php',
        document.querySelector('.foxbit'),
        'FoxBit',
        ''
    );
}

setInterval(function () {
    requestValues();
}, 15000);

requestValues();