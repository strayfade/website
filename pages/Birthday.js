const path = require('path')
const fs = require('fs').promises

const HTML = require('../components/HTML').HTML
const Head = require('../components/Head').Head
const Body = require('../components/Body').Body
const Footer = require('../components/Footer').Footer

const { GenDecryptText } = require("../components/EncryptedTextUtil")

const Birthday = async (Request, BuildData) => {
    return `
        ${await HTML(Request)}
        ${await Head(Request, 'GIFTS', '', BuildData)}
        ${await Body(
        Request,
        `
            <div style="position: absolute; left: 0; width: 100vw; max-height: 100vh; overflow-y: auto; overflow-x: hidden; top: 50%; transform: translateY(-50%); max-width: 100vw;">

                <style>
                    .gift-text {
                        font-size: 18px;
                        width: 100%;
                        text-align: center;
                    }
                    .gift {
                        text-align: center; 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        gap: 8px; 
                        padding: 5px 0px; 
                        margin: 0px;
                        max-width: 100vw; 
                        word-wrap: anywhere;
                        transition-duration: 0.3s;
                        transform: scale(100%);
                    }
                    .gift-heading {
                        font-size: 22px;
                        text-align: center;
                        margin-top: 30px;
                        margin-bottom: 0px;
                        transform: scaleX(150%);
                        text-transform: lowercase;
                    }

                    .gift:hover {
                        padding: 20px 0px;
                        transform: scale(120%);
                    }
                    .material-symbols-outlined {
                        font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24
                    }
                </style>
                ${(() => {
            const GiftList = [
                ["Electronics"],
                ['iPhone 14 Pro OEM Display Replacement', 'https://selfservicerepair.com/en-US/iphone-14-pro/display'],
                ['NEIKO 01408A Digital Caliper', 'https://www.amazon.com/Neiko-01408A-Electronic-Digital-Caliper/dp/B000NEA0P8'],
                ['Dremel 8220 Battery', 'https://www.amazon.com/s?k=Dremel+8220+Battery'],
                //['SMD Resistor Binder (0-10M Ohm)', 'https://www.amazon.com/s?k=Dremel+8220+Battery'],
                ['19-inch 20U Server Rack', 'https://www.amazon.com/s?k=19%22+20U+Server+Rack'],
                ["Robotics"],
                ['SO-ARM101 robotic arm development kit (Package 3)', 'https://shop.wowrobo.com/products/so-arm101-diy-kit-assembled-version-1?variant=46588641607897'],
                ["Car cosmetics"],
                ['VViViD+ Gloss Black Vinyl Wrap (3ft x 5ft)', 'https://www.amazon.com/VViViD-Replacement-Technology-Stretchable-Protective/dp/B08KYJYSPX'],
                ['KDM Accessories Rear Diffuser for 21-24 Kia K5 GT/GT-line', 'https://kdmaccessories.com/products/kia-k5-diffuser-2021-2024'],
                ['KDM Accessories Duckbill Style Spoiler (21-24 Kia K5)', 'https://kdmaccessories.com/products/kia-k5-duckbill-style-spoiler-2021-2024?variant=44480493650084&country=US&currency=USD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic'],
                ['KDM Accessories Signature Air Freshener', 'https://kdmaccessories.com/products/air-fresheners-by-kdm-sleek-design-quickly-swappable?variant=51031375151268'],
                ["Car performance"],
                ['Burger Motorsports JB4 for Kia 1.6T Smartstream 4-cylinder V3', 'https://burgertuning.com/products/jb4-for-kia-hyundai-1-6l'],
                ['F1R F103 19x9 +35 Wheels', 'https://www.fitmentindustries.com/buy-wheel-offset/F1031995114GB35/f1r-f103-19x9-35'],
                ['Summit Ultramax HP Tires', 'https://www.fitmentindustries.com/buy-wheel-offset2/SMT10294/summit-ultramax-hp-245-40r19-tires?year=2023&make=Kia&model=K5&drive=FWD&trim=GT-Line'],
                ['Burger Motorsports BMS Intake for 2020+ Kia K5 1.6L Turbo (Red)', 'https://burgertuning.com/products/bms-intake-for-2021-kia-k5-1-6l-turbo?variant=41920828670126'],
                ['Borla 2021-2024 Kia K5 Cat-Back Exhaust System', 'https://www.borla.com/products/kia-k5-gt-line-cat-back-exhaust-system-140968'],
                ['NGT Performance K5 AWD 1.6T midpipe', 'https://ngtperformance.com/products/k5-awd-1-6t-midpipe'],
                ['Garmin Mini 2 Dashcam', 'https://www.amazon.com/s?k=Garmin+Dash+Cam+Mini+2'],
                ['Escort MAX 360 MKII Radar Detector', 'https://www.amazon.com/Escort-Detector-Bluetooth-Directional-Exceptional/dp/B0BX4K6RMQ'],
                ['car paddle shifter retrofit project'],
                ['Kia Heated Steering Wheel Extension Wire (56190-L2700)', 'https://www.discountkiaparts.com/oem-parts/kia-extension-wire-56190l2700'],
                ['Kia Steering Wheel Back Cover', 'https://www.kiapartsnow.com/genuine/kia-cover-assy-steering~56120l2300wk.html'],
                ['Kia Steering Wheel Passenger Side Paddle Switch', 'https://www.kiapartsnow.com/genuine/kia-switch-assy-paddle-s~96780l2000.html'],
                ['Kia Steering Wheel Driver Side Paddle Switch', 'https://www.kiapartsnow.com/genuine/kia-switch-assy-paddle-s~96770l2000.html'],
                ['Kia K5 Paddle Switch Extenders', 'https://www.amazon.com/Sanrily-Shifter-Extensions-Steering-shifters/dp/B08TLSN2GS?th=1']
            ]
            let output = ""
            for (i of GiftList) {
                if (i.length == 1) {
                    output += `
                    <p class="gift-heading">
                        ${GenDecryptText("span", i[0], "gift-text")}
                    </p>`
                }
                else {
                output += `
                <p class="gift">
                    <a href="${i[1]}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: var(--foreground); height: max-content; display: inline-block; padding: 0px 3px;">
                        ${GenDecryptText("span", i[0], "gift-text")}
                    </a>
                    <span class="material-symbols-outlined">
                        open_in_new
                    </span>
                </p>`
                }
            }
            return output
        })()

        }
            </div>
            `
        , BuildData)}
    `
}
module.exports = { Birthday }
