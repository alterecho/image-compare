import { View, FlatList, StyleSheet } from "react-native"
import { forwardRef, useContext } from "react";
import MetaDataCell from "./MetaDataCell";
import Theme from "../../../Theme";

export const MetaDataTableView = forwardRef(({ metaDataCellModelArray, onSelectMetaData }, ref) => {
  const { theme, toggleTheme } = useContext(Theme.context);
  const styles = makeStyleSheet(theme);

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        data={metaDataCellModelArray}
        keyExtractor={(dataItem) => dataItem.metaDataItem.title}
        renderItem={({ item: model }) => <MetaDataCell model={model} onSelectMetaData={onSelectMetaData} />}
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