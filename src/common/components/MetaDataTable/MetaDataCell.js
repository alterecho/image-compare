import { View, Text, TouchableOpacity } from "react-native";

const MetaDataCell = ({ metaData, onSelectMetaData }) => {
  return (
    <TouchableOpacity onPress={() => onSelectMetaData(metaData)}>
      <Text>{metaData.title}</Text>
      <Text>{metaData.value}</Text>
    </TouchableOpacity >
  )
}

export default MetaDataCell;