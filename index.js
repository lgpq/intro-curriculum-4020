'use strict';

function getA() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(11); }, 1000);
  });
}

function getB() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(13); }, 1000);
  });
}

function getC() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(17); }, 1000);
  });
}

// TODO ここに getA, getB, getC で得られる結果をかけあわせた結果 2431 を標準出力するコードを記述する
// ただし Promise チェイン(then関数の結果に対するthen関数の呼び出し)を一度は用いて実装をすること

getA().then(a => { console.log('1= ' + a); });
getB().then(b => { console.log('2= ' + b); });
getC().then(c => { console.log('3= ' + c); });

getA()
  .then(a => {
    return getB().then(b => {
      return console.log('4= ' + a * b);
    });
  });

getA()
  .then(a => {
    return getB().then(b => {
      return a * b;
    });
  })
  .then(result => {
    getC().then(c => {
      console.log('5= ' + result * c);
    });
  });

getA().then(async a => {
  const b = await getB();
  const c = await getC();
  console.log('6= ' + a * b * c);
});

Promise.all([getA(), getB(), getC()]).then(results => {
  console.log('7= ' + results[0] * results[1] * results[2]);
});

Promise.all([getA(), getB(), getC()]).then(results => {
  let product = 1;
  for (let i = 0; i < results.length; i++) {
    product *= results[i];
  }
  console.log('8= ' + product);
});

Promise.all([getA(), getB(), getC()]).then(results => {
  const product = results.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
  console.log('9= ' + product);
});

Promise.all([getA(), getB(), getC()]).then(results => {
  const p = results.reduce((x, y) => x * y, 1);
  console.log('10= ' + p);
});

function gets() {
  getA().then(async a => {
    const b = await getB();
    const c = await getC();
    console.log('11= ' + a * b * c);
  });
}

gets();

getA().then(a => {return getB().then(b => {return a * b});}).then(result => {getC().then(c => {console.log('12= ' + result * c)})});