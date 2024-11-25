export function ImageInfo(uri, metaDataArray) {
    return Object.freeze({ uri, metaDataArray })
}

export function Size(width, height) {
    return Object.freeze({ width, height})
}