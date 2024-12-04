import { View, FlatList, StyleSheet } from "react-native"
import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import MetaDataCell from "./MetaDataCell";
import Theme from "../../../Theme";

export const MetaDataTableView = forwardRef(({ metaDataCellModelArray, onSelectMetaDataItemHandler }, ref) => {
  const { theme, toggleTheme } = useContext(Theme.context);
  const styles = makeStyleSheet(theme);
  const tableRef = useRef(null)
  useImperativeHandle(ref, () => ({
    selectIndex: (index) => {
      console.log("cell selectIndex tableRef", index, tableRef)
      tableRef.current.scrollToIndex({ index, animated: true })
    }
  }))

  return (
    <View style={styles.container}>
      <FlatList
        ref={tableRef}
        data={metaDataCellModelArray}
        keyExtractor={(dataItem) => dataItem.metaDataItem.title}
        renderItem={
          ({ item: model }) => {
          return <MetaDataCell
            model={model}
            onSelectMetaDataItemHandler={onSelectMetaDataItemHandler}
          
          />
        }
        }
      />
    </View >
  )
});

const makeStyleSheet = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'clear'
    }
  });
}

export default MetaDataTableView;