import { MetaDataItem } from "../../structs";
import { DifferenceModel, DifferenceType, Model as MetaDataCellModel } from "../../common/components/MetaDataTable/MetaDataCell";

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

export const makeMetaDataCellModelArrayFromMetaData = ({ metaData, comparisonMetaData = null }) => {
  const cellModelArray = metaData.map((metaDataItem) => {

    let comparisonMetaDataItem = comparisonMetaData?.find(
      (item) => item.title === metaDataItem.title
    );
    let differenceValue = null;
    let differenceType = null;
    console.log(metaDataItem, comparisonMetaDataItem, "typeof ", typeof metaDataItem.value, typeof comparisonMetaDataItem?.value);
    if (typeof metaDataItem.value === 'number' && typeof comparisonMetaDataItem?.value === 'number') {
      differenceValue = metaDataItem.value - comparisonMetaDataItem.value;
      let differenceSymbol = "";
      if (differenceValue > 0) {
        differenceSymbol = "+"
        differenceType = DifferenceType.greaterThan;
      } else if (differenceValue < 0) {
        differenceSymbol = "-"
        differenceType = DifferenceType.lesserThan;
      } 
      differenceValue = differenceSymbol + differenceValue;
    } else {
      differenceValue = comparisonMetaDataItem?.value;
      differenceType = DifferenceType.text;
    }
    console.log("differenceType, differenceValue", differenceType,
      differenceValue);
    return MetaDataCellModel({
      metaDataItem,
      isSelected: false,
      difference: DifferenceModel({
        value: differenceValue,
        type: differenceType
      })
    });
  });
  return cellModelArray
}

export const makeMetaDataCellModelArrayFromExifData = (exifData) => {
  const metaData = makeMetaDataFromExif(exifData)
  const metaDataCellModelArray = makeMetaDataCellModelArrayFromExif(metaData)
  return metaDataCellModelArray
}