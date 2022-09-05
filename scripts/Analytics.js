let AnalyticsInfo = {
    hardwareConcurrency: window.navigator.hardwareConcurrency,
    language: window.navigator.language.toLowerCase(),
    touchscreen: window.navigator.maxTouchPoints > 0,
    userAgent: window.navigator.userAgent,
    webdriver: window.navigator.webdriver,
}

const postData = async (url = '', data = {})=>{
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};
postData('/api/analytics', AnalyticsInfo);