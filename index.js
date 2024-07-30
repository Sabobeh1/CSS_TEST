
//================================= form with table using array of objects===================//
let arr = [1,2,3,4,5,6]
let shakir = arr.map(function(number){
    return `<h3>${number}</h3>`;
}).join('')
let sh = document.querySelector('body')
console.log(shakir)
sh.innerHTML=shakir;

