const ConvertToEncrypted = (String) => {
    let Charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    Charset += `............................`
    let Output = `<span style="border: 1px dashed var(--foreground); color: var(--background); padding: 1px;">${String[0]}</span>`
    for (let i = 1; i < String.length; i++)
        Output += Charset[Math.floor(Math.random() * Charset.length)]
    return Output
}
const GenDecryptText = ((TagName, Text, Classes = "") => {
    const GenId = (() => {
        const Charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
        let Output = ""
        for (let i = 0; i < 10; i++) {
            Output += Charset[Math.floor(Math.random() * Charset.length)]
        }
        return Output
    })()
    return `
    <${TagName} class="decrypt-text ${Classes}" id="${GenId}" decrypted="${Text}" style="display: none;">
        ${ConvertToEncrypted(Text)}
        <script>
            document.getElementById("${GenId}").style.display = "inherit"
        </script>
    </${TagName}>
    <noscript>
        <${TagName} class="${Classes}">
            ${Text}
        </${TagName}>
    </noscript>`
})
module.exports = { ConvertToEncrypted, GenDecryptText }