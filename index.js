const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

console.log('Olá mundo! Bem vindo ao meu conversor de moedas 💰💸');

async function conversor() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const moedaBase = readlineSync.question('Qual a moeda base? ') || 'dolar';
    const moedaFinal = readlineSync.question('Qual a moeda final? ') || 'real';

    const busca = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}&oq=${moedaBase}+para+&aqs=chrome.0.0i131i433j69i57j0i433j0l4j0i457j0l2.2304j1j2&sourceid=chrome&ie=UTF-8`;

    await page.goto(busca);

     const valores = await page.evaluate(() => {
        return {
        valorMoedaBase: document.querySelector('.ZEB7Fb').value,
        valorMoedaCorrespondente: document.querySelector('.a61j6').value
        };
    });

    console.log(`Para ${valores.valorMoedaBase} ${moedaBase} temos: ${valores.valorMoedaCorrespondente} em ${moedaFinal}`)

    await browser.close();
}

conversor();