import * as fs from 'node:fs';
import * as dotenv from 'dotenv';
import * as jmespath from 'jmespath';
import * as xlsx from 'node-xlsx';

// const floristToken = process.env.FLORIST_TOKEN;
const floristToken = '0527ed28f0493367d8e4448231a8e209';
const floristRequestLimit = 60;
const floristRequestPages = 5;
const stopWords = [
  'БЕЧЕВКА',
  'БУМАГА ЖАТАЯ',
  'БУМАГА ТИШЬЮ',
  'БУМАГА УПАКОВОЧНАЯ',
  'КАРТОННАЯ КОРОБКА (РОЗОВАЯ)',
  'КАШПО ДЕРЕВЯННОЕ, ЕЛЬ',
  'КАШПО ДЕРЕВЯННОЕ, ЗВЕЗДА',
  'КАШПО ДЕРЕВЯННОЕ, САНИ',
  'КАШПО ИЗ КОРЫ, СТАНДАРТ',
  'КОРЗИНА XXL',
  'КОРЗИНА СВЕТЛАЯ БОЛЬШАЯ',
  'КОРЗИНА СВЕТЛАЯ МАЛАЯ',
  'КОРЗИНА СВЕТЛАЯ СРЕДНЯЯ',
  'КОРЗИНА ТЕМНАЯ БОЛЬШАЯ',
  'КОРЗИНА ТЕМНАЯ МАЛАЯ',
  'КОРОБКА "СЕРДЦЕ" СТАНДАРТНАЯ',
  'КОРОБКА С ПРИНТОМ (ДЕЛЮКС)',
  'КОРОБКА ШЛЯПНАЯ БОЛЬШАЯ',
  'КОРОБКА ШЛЯПНАЯ МАЛАЯ',
  'КОРОБКА ШЛЯПНАЯ СРЕДНЯЯ',
  'ЛЕНТА',
  'ЛЕНТА ЗОЛОТАЯ',
  'ЛЕНТА СЕРЕБРЯНАЯ',
  'НОБИЛИС',
  'ОАЗИС',
  'ПИСТАШ',
  'ПЛЕНКА ЦВЕТНАЯ',
  'ФЕТР',
  'ЭВКАЛИПТ',
  'ЯЩИК ДЕРЕВЯННЫЙ'
];

async function floristSingleRequest(offset) {
  let url = `https://www.florist.ru/api/bouquet/list?_token=${floristToken}&nocache=0&showPrices=1&showGroups=0&showComposition=1&showHidden=0&showNotVisible=0&city=10&limit=${floristRequestLimit}&offset=${offset}&includePS=0&canDeliverFloristBouquets=1&includeMeta=1&url=/moscow&doctype=catalog&locale=RU`;

  let response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  let responseJson = await response.json();

  // Debug
  // console.log(`DATAFETCHER | Single request result length: ` + responseJson.data.length);

  return responseJson;
}

// Returns array of false
async function floristMultipleRequests() {
  var dataArray = [];
  let previous = [];

  for (let i = 0; i < (floristRequestLimit * floristRequestPages);) {
    let result = await floristSingleRequest(i);

    if (result.data.length == 0) {
      // Debug
      // console.log(`DATAFETCHER | Multiple request got empty result`);
      break;
    }

    // Debug
    // console.log(dataArray.length);
    // console.log(previous.length);
    // console.log(result.data.length);
    dataArray = previous.concat(result.data);
    previous = dataArray;
    // console.log(`Сейчас в массиве: ${dataArray.length}`);

    i += floristRequestLimit;
  }

  if (dataArray.length == 0) {
    // console.log('DATAFETCHER | floristMultipleRequests() returned empty array');
    return false;
  }

  // console.log(`Итого в массиве: ${dataArray.length}`);
  return dataArray;
}

// returns boolean result
export async function writeDatatoFile() {
  let response = await floristMultipleRequests();

  // console.log(typeof response);

  if (!response) {
    throw new Error('Error in DataFetcher: floristMultipleRequests() returned false');
  }

  let responseJsonUnprocessed = {items: response};
  let responseJsonProcessed = processFloristResponse(responseJsonUnprocessed);
  let compositionsJson = getCompositionsFromProcessedResponse(responseJsonProcessed);

  fs.writeFileSync('data.json', JSON.stringify(responseJsonProcessed));
  fs.writeFileSync('compositions.json', JSON.stringify(compositionsJson));
  fs.writeFileSync('lastupdated', Date.now().toString());
  fs.writeFileSync('bouquetsQty', responseJsonProcessed.items.length.toString());
  return true;
}

// returns object
function getCompositionsFromProcessedResponse(processedString) {
  let resultArray = [];
  let tmpObj = {};
  let resultObj = {
    compositions: []
  };

  processedString.items.forEach(bouquet => {
    bouquet[2].forEach(variant => {
      variant[2].forEach(flower => {
        resultArray.push([flower[2], flower[0]]);
      });
    });
  });

  resultArray.sort((a, b) => {
    const nameA = a[1].toUpperCase();
    const nameB = b[1].toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });

  resultArray.forEach(flowerArr => {
    tmpObj[flowerArr[1]] = flowerArr[0];
  });

  for (let flower in tmpObj) {
    resultObj.compositions.push([tmpObj[flower], flower]);
  }

  return resultObj;
}

// returns object
function processFloristResponse(response) {
  // console.log('RESPONSE');
  // console.log(typeof response);
  // console.log(response);
  response = JSON.stringify(response);
  // console.log(typeof response);
  response = {
    items: jmespath.search(JSON.parse(response), `items[?salon_name == 'Флорариум'].[name,id,prices.*.[name,price.RUB,composition[*].[name,count,id],preview]]`)
      .sort()
  };

  response = sortFlowers(response);
  return response;
}

function sortFlowers(data) {
  data.items.forEach(bouquet => {
    bouquet[2].forEach(variant => {
      variant[2].sort((a, b) => {
        const nameA = a[0].toUpperCase();
        const nameB = b[0].toUpperCase();

        console.log(`Comparing ${nameA} with ${nameB}`);
        
        let stopsResult = 0;

        if (stopWords.includes(nameA)) {
          stopsResult++;
        }

        if (stopWords.includes(nameB)) {
          stopsResult--;
        }

        if (stopsResult !== 0) {
          return stopsResult;
        } 

        if (nameA < nameB) {
          return -1;
        }
        
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });
    });
  });
  return data;
}

export function getCachedData() {
  return JSON.parse(fs.readFileSync('data.json'));
}

export function getLastUpdated() {
  return new Date(Number(fs.readFileSync('lastupdated'))).toLocaleString('ru-RU', { timeZone: '+03:00' });
}

export function getCompositions() {
  return JSON.parse(fs.readFileSync('compositions.json'));
}

export function getBouquetsQty() {
  return fs.readFileSync('bouquetsQty').toString();
}

export function getBouquetsWithFlower(withFlower) {
  let initialObj = getCachedData();

  // console.log(withFlower);
  initialObj.items = initialObj.items.filter(bouquet => {
    for (let variant of bouquet[2]) {
      for (let flower of variant[2]) {
        if (flower[2] == withFlower) {
          initialObj.flowerName = flower[0];
          return true;
        }
      }
    }
    return false;
  });

  return initialObj;
}

export function getNewDataAndCreateXLSX() {
  const data = [
    [1, 2, 3],
    [true, false, null, 'sheetjs'],
    ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
    ['baz', null, 'qux'],
  ];
  return xlsx.build([{name: 'mySheetName', data: data}]);
}
