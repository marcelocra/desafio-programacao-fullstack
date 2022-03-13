// buffer = {                  {start, end, size}
//   type: num                 {    1,   1,    1}
//   date: Date()              {    2,  26,   25}
//   product: string           {   27,  56,   30}
//   price: num                {   57,  66,   10}
//   affiliateName: string     {   67,  86,   20}
// }

function parseSingleLineStr(singleTransactionStr) {
  return {
    type: parseInt(singleTransactionStr.slice(0, 1)),
    date: new Date(singleTransactionStr.slice(1, 26)),
    product: singleTransactionStr.slice(26, 56).trim(),
    price: parseFloat(singleTransactionStr.slice(56, 66))/100,
    affiliateName: singleTransactionStr.slice(66, 86)
  }
}

function parseMultiLineStr(multipleTransactionStr) {
  return multipleTransactionStr
    .split('\n')
    .map(singleTransactionStr => parseSingleLineStr(singleTransactionStr))
}

module.exports = {
  parseSingleLineStr,
  parseMultiLineStr
}