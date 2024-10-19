// Function output cache
let rtFuncCache = []

// Function responsible for caching single outputs of a function (by reference)
const cacheFunc = async (funcPtr, params) => {

    // Check if entry already exists for function
    let entryFoundIdx = -1
    for (const [idx, value] of rtFuncCache.entries()) {

        // Check if entry exists
        if (!value) continue;

        // Check if entry matches
        if (JSON.stringify(value.params) === JSON.stringify(params))
            entryFoundIdx = idx
    }

    // Entry has been found, return it
    if (entryFoundIdx >= 0) {
        return rtFuncCache[entryFoundIdx].out
    }

    // Entry was not found
    let funcOut = await funcPtr(params)
    rtFuncCache.push({
        params: params,
        out: funcOut
    })
    console.log(params)
    return funcOut
}

// Function responsible for clearing the cache of a single function (by reference)
const cacheFuncClear = async (funcPtr = 0) => {
    for (const [idx, value] of rtFuncCache.entries()) {

        // Check if entry exists
        if (!value) continue;

        // Check if function is not the search function
        if (value.ptr != funcPtr) continue;

        // Remove entry from cache
        rtFuncCache.splice(idx, 1)
    }
}

module.exports = { cacheFunc, cacheFuncClear }