import * as fs from 'node:fs';
import * as jmespath from 'jmespath';
import { json } from '@sveltejs/kit';
const token = '0527ed28f0493367d8e4448231a8e209';
const limit = 60;
const pages = 5;

async function getDataOnce(offset) {
  let url = `https://www.florist.ru/api/bouquet/list?_token=${token}&nocache=0&showPrices=1&showGroups=0&showComposition=1&showHidden=0&showNotVisible=0&city=10&limit=${limit}&offset=${offset}&includePS=0&canDeliverFloristBouquets=1&includeMeta=1&url=/moscow&doctype=catalog&locale=RU`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(typeof json);
    return json;
  } catch (error) {
    console.error(error.message);
    return false;
  }
}

async function getAllData() {
  var dataArray = [];
  let previous = [];
  let i = 0;
  while (i < (limit * pages)) {
    let result = await getDataOnce(i);

    if (result && result.data.length > 0) {
      console.log(dataArray.length);
      console.log(previous.length);
      console.log(result.data.length);
      dataArray = previous.concat(result.data);
      previous = dataArray;
      console.log(`Итого в массиве: ${dataArray.length}`);
    } else {
      console.log('break');
      break;
    }

    i += limit;
  }

  if (dataArray.length == 0) {
    console.log('empty array');
    return false;
  } else {
    console.log(`Итого в массиве 2: ${dataArray.length}`);
    return dataArray;
  }
}

// returns boolean result
export async function writeDatatoFile() {
  let result = await getAllData();

  if (result) {
    console.log(result.length);
    fs.writeFile('data.json', JSON.stringify({items: result}), err => {
      if (err) {
        console.error(err);
        return false;
      } else {
        fs.writeFileSync('lastupdated', Date.now().toString());
        return true;
      }
    });
  }
}

export function getLastUpdated() {
  return new Date(Number(fs.readFileSync('lastupdated'))).toLocaleString('ru-RU', { timeZone: '+03:00' });
}

export function getArrayOfItems() {
  return jmespath.search(JSON.parse(fs.readFileSync('data.json')), 'items[?salon_name == \'Флорариум\'].name | sort(@)');
}
