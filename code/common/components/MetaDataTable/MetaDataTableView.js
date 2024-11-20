import { View, FlatList } from "react-native"
import MetaDataCell from "./MetaDataCell";

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

export default MetaDataTableView;