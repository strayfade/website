const ConvertToEncrypted = (String) => {
    let Charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    //Charset += `▓▒░`
    //Charset += `____________________________`
    Charset += `............................`
    let Output = `<span style="border: 1px dashed var(--foreground); color: var(--background); padding: 1px;">${String[0]}</span>`
    for (let i = 1; i < String.length; i++)
        Output += Charset[Math.floor(Math.random() * Charset.length)]
    return Output
}
module.exports = { ConvertToEncrypted }