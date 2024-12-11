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

export const makeBorderStyle = (color = 'red', width = 1) => {
  const style = {
    borderColor: color,
    borderWidth: width
  }
  return style
}

export const makeMetaDataFromExifData = (exifData) => {
  if (exifData == null) {
    return null
  }
  return Object
  .keys(exifData)
  .map(key => MetaDataItem(key, exifData[key]))
}

export const makeMetaDataCellModelArrayFromMetaData = (metaData) => {
  const cellModelArray = metaData.map((metaDataItem) => {
    return MetaDataCellModel({metaDataItem, isSelected: false})
  });
  return cellModelArray
}

export const makeMetaDataCellModelArrayFromExifData = (exifData) => {
  const metaData = makeMetaDataFromExif(exifData)
  const metaDataCellModelArray = makeMetaDataCellModelArrayFromExif(metaData)
  return metaDataCellModelArray
}