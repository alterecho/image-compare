import { View, FlatList, StyleSheet } from "react-native"
import { forwardRef, useContext } from "react";
import MetaDataCell from "./MetaDataCell";
import Theme from "../../../Theme";

export const MetaDataTableView = forwardRef(({ metaDataArray, onSelectMetaData }, ref) => {
  const { theme, toggleTheme } = useContext(Theme.context);
  const styles = makeStyleSheet(theme);

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        data={metaDataArray}
        keyExtractor={(dataItem) => dataItem.title}
        renderItem={({ item }) => <MetaDataCell metaData={item} onSelectMetaData={onSelectMetaData} />}
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