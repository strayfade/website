const axios = require('axios');
const fs = require('fs').promises
const path = require('path')
const { log, logColors } = require('./Log')

const fetchStatusCode = async (url) => {
    try {
        let response = {}
        try {
            response = await axios.get(url);
        }
        catch {
            response.status = 500
        }
        return response.status;
    } catch (error) {
        throw new Error(`Failed to fetch the URL: ${error.message}`);
    }
}

const runTests = async (port) => {
    let urls = [
        "/prod.css", 
        "/prod.js", 
        "/"
    ]

    const allIds = await fs.readdir(path.join(__dirname, "posts"));
    for (const id of allIds) {
        urls.push(`/${id.replace(".md", "")}`)
    }

    let allPassed = true;
    for (let i = 0; i < urls.length; i++) {
        const startTime = Date.now();
        const statusCode = await fetchStatusCode(`http://localhost:${port}${urls[i]}`)
        if (statusCode != 200)
            allPassed = false
        const endTime = Date.now();
        log(`[LogTests] ${urls[i]} returned status ${statusCode} (${endTime - startTime}ms)`, statusCode == 200 ? logColors.Success : logColors.Error)
    }
    if (allPassed)
        log(`[LogTests] All tests passed!`, logColors.SuccessVisible)
    else
        log(`[LogTests] One or more tests failed!`, logColors.ErrorVisible)
    log(`Local address: http://127.0.0.1:${port}`)

}

module.exports = { runTests }