import { View, Text } from "react-native";

const MetaDataCell = ({ metaData }) => {
  return (
    <View>
      <Text>{metaData.title}</Text>
      <Text>{metaData.value}</Text>
    </View >
  )
}

export default MetaDataCell;