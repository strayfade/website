
const ColorsForeground = Object.freeze({
    Black: 30,
    Red: 31,
    Green: 32,
    Yellow: 33,
    Blue: 34,
    Magenta: 35,
    Cyan: 36,
    White: 37,
    Gray: 90
});
const ColorsBackground = Object.freeze({
    Black: 40,
    Red: 41,
    Green: 42,
    Yellow: 43,
    Blue: 44,
    Magenta: 45,
    Cyan: 46,
    White: 47,
    Gray: 100
});

const logColors = Object.freeze({
    Default: {
        fg: null,
        bg: null
    },
    Warning: {
        fg: ColorsForeground.Yellow,
        bg: null
    },
    WarningVisible: {
        fg: ColorsForeground.Black,
        bg: ColorsBackground.Yellow
    },
    Error: {
        fg: ColorsForeground.Red,
        bg: null
    },
    ErrorVisible: {
        fg: ColorsForeground.White,
        bg: ColorsBackground.Red
    },
    Success: {
        fg: ColorsForeground.Green,
        bg: null
    },
    SuccessVisible: {
        fg: ColorsForeground.Black,
        bg: ColorsBackground.Green
    }
});

const LogPrivate = (String, Colors = logColors.Default) => {
    const cC = (Code) => {
        return `\x1b[${Code}m`
    }
    const shouldBold = Colors == logColors.successVisible || Colors == logColors.warningVisible || Colors == logColors.errorVisible
    console.log(`${Colors.fg ? cC(Colors.fg) : ""}${Colors.bg ? cC(Colors.bg) : ""}${shouldBold ? cC(1) : ""}${String.toString()}${cC(0)}`)
}

const log = (String, Colors = logColors.Default) => {
    const GenerateTimestamp = () => {
        const P = (Input, Length = 2) => {
            let Output = Input.toString();
            while (Output.length < Length) 
                Output = "0" + Output
            return Output;
        }
        let N = new Date(Date.now());
        return `${P(N.getMonth() + 1)}/${P(N.getDate())}/${P(N.getFullYear(), 4)} ${P(N.getHours() > 12 ? N.getHours() - 12 : N.getHours())}:${P(N.getMinutes())}:${P(N.getSeconds())}.${P(N.getMilliseconds(), 4)} ${N.getHours() >= 12 ? "PM" : "AM"}`
    }
    LogPrivate(`[${GenerateTimestamp()}] ${String}`, Colors)
}

module.exports = { ColorsForeground, ColorsBackground, logColors, log };