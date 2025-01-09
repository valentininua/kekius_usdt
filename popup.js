async function fetchKEKIUSUSDT() {
  const url = "https://api.gateio.ws/api/v4/spot/tickers?currency_pair=KEKIUS_USDT";
  const urlCoin = "https://valentin.in.ua/coin.json";
  const noCacheParam = `?nocache=${new Date().getTime()}`;
  try {
    const response = await fetch(url);
    const data = await response.json(); 
    const responseCoin = await fetch(urlCoin+noCacheParam);
    const dataCoin = await responseCoin.json();
    const myKekius = await parseFloat(dataCoin.KEKIUS_USDT); 

    //возвращает массив объектов, выбираем первый
    const price = data[0]?.last || "Не найдено";
    const high24h = data[0]?.high_24h || "Не найдено";
    const low24h = data[0]?.low_24h || "Не найдено";

    document.getElementById("rate").innerText = `${parseFloat(price).toFixed(6)}`;
    document.getElementById("high24h").innerText = `${parseFloat(high24h).toFixed(6)}`;
    document.getElementById("low24h").innerText = `${parseFloat(low24h).toFixed(6)}`;

    document.getElementById("myUsdt").innerText = parseFloat(price).toFixed(6) * myKekius;
    document.getElementById("coin").innerText = myKekius;
  } catch (error) {
    document.getElementById("rate").innerText = "Ошибка загрузки!";
    console.error("Ошибка получения курса:", error);
  }
}

// Обновляем курс при загрузке popup
fetchKEKIUSUSDT();

// Обновление каждые 10 секунд (опционально)
setInterval(fetchKEKIUSUSDT, 10000);
