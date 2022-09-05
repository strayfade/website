fetch('/api/production', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        language: window.navigator.language.toLowerCase(),
        userAgent: window.navigator.userAgent
    }),
});