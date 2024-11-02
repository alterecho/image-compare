import { View, FlatList } from "react-native"

const MetaDataCell = ({ metaData }) => {
  return (
    <View>
      <Text>{metaData.title}</Text>
      <Text>{metaData.value}</Text>
    </View >
  )
}

export const MetaDataTableView = ({ metaDataArray }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={metaDataArray}
        keyExtractor={(dataItem) => dataItem.title}
        renderItem={({ item }) => <MetaDataCell metaData={item} />}
      />
    </View >
  )
}