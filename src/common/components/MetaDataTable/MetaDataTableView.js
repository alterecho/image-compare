import { View, FlatList } from "react-native"
import { forwardRef } from "react";
import MetaDataCell from "./MetaDataCell";

export const MetaDataTableView = forwardRef(({ metaDataArray, onSelectMetaData }, ref) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={ref}
        data={metaDataArray}
        keyExtractor={(dataItem) => dataItem.title}
        renderItem={({ item }) => <MetaDataCell metaData={item} onSelectMetaData={onSelectMetaData} />}
      />
    </View >
  )
});

export default MetaDataTableView;