const BackButton = async (Request) => {
    return `
        <a class="back-button" href="/">
            <p class="back-icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z"/>
                </svg>
            </p>
            <p class="back-text">
                back
            </p>
        </a>
    `
}
module.exports = { BackButton }
