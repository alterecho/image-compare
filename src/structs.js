export function ImageInfo(uri, metaDataArray) {
    return Object.freeze({ uri, metaDataArray })
}

export function Point(x, y) {
    return Object.freeze({ x, y })
}