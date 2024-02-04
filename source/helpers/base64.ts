export function encode(value: string) {
    return Buffer.from(value).toString('hex');
}

export function decode(value: string) {
    return Buffer.from(value, 'hex').toString('ascii');
}
