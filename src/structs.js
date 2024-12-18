export function ImageInfo(uri, metaData) {
    return Object.freeze({ uri, metaData })
}

export function MetaDataItem(title, value) {
    return Object.freeze({ title, value })
}

export function Size(width, height) {
    return Object.freeze({ width, height})
}

export function Transform(x = 0, y = 0, scale = 0, rotation = 0) {
    return { x, y, scale, rotation };
}