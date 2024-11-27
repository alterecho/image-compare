import { MetaDataItem } from "../../structs";
import { Model as MetaDataCellModel } from "../../common/components/MetaDataTable/MetaDataCell";

export const getRandomColor = () => {
  let color = {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  }

  return `rgb(${color.r}, ${color.g}, ${color.b})`;
};

export const makeBorderStyle = (color = 'green', width = 1) => {
  const style = {
    borderColor: color,
    borderWidth: width
  }
  return style
}

export const makeMetaDataFromExifData = (exifData) => {
  return Object
  .keys(exifData)
  .map(key => MetaDataItem(key, exifData[key]))
}

export const makeMetaDataCellModelArrayFromMetaData = (metaData, selectedItems) => {
  const mp = metaData.map((metaDataItem) => {
    let isSelected = selectedItems.some(item => item.title === metaDataItem.title)
    return MetaDataCellModel(metaDataItem, isSelected)
  });
  return mp
}

export const makeMetaDataCellModelArrayFromExifData = (exifData) => {
  const metaData = makeMetaDataFromExif(exifData)
  const metaDataCellModelArray = makeMetaDataCellModelArrayFromExif(metaData)
  return metaDataCellModelArray
}