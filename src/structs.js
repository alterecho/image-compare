export function ImageInfo(uri, metaDataArray) {
    return Object.freeze({ uri, metaDataArray })
}

export function MetaDataItem(title, value) {
    return Object.freeze({ title, value })
}

export function Size(width, height) {
    return Object.freeze({ width, height})
}