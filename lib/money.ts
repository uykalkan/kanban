export default function money(amount : number, symbol = ' TL') {
    if (!amount && amount !== 0) {
        return '';
    }

    return parseFloat(String(amount)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.').replace(/\.(\d+)$/,',$1') + symbol;
}
