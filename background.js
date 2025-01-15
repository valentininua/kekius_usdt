chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create("fetchGateData", { periodInMinutes: 0.1 }); //updates the price every minute
  });
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "fetchGateData") {
      fetchKEKIUSUSDT();
    }
  });

  async function fetchKEKIUSUSDT() {
    const url = "https://api.gateio.ws/api/v4/spot/tickers?currency_pair=KEKIUS_USDT";
    try {
      const response = await fetch(url);
      const data = await response.json();
      const price = data[0]?.last || "Не найдено";
      console.log(`Курс KEKIUS/USDT: $${parseFloat(price).toFixed(6)}`);
      // Устанавливаем текст на значок
      chrome.action.setBadgeText({ text: parseFloat(price).toFixed(2) });
      chrome.action.setBadgeBackgroundColor({ color: "#4CAF50" }); // Зеленый фон


      if (price <= 0.06) {
        chrome.action.setBadgeText({ text: parseFloat(price).toFixed(2) });
        chrome.action.setBadgeBackgroundColor({ color: "#bf3030" }); // крассный фон
        //chrome.tabs.create({ url: "popup.html" }); // Открываем вкладку с попапом
      }
    } catch (error) {
      console.error("Ошибка получения данных:", error);
    }
  }
  