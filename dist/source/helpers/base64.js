export function encode(value) {
    return Buffer.from(value).toString('hex');
}
export function decode(value) {
    return Buffer.from(value, 'hex').toString('ascii');
}
