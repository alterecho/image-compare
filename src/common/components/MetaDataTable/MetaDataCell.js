import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import Theme from "../../../Theme";
import { useContext } from "react";

export function Model(metaDataItem, isSelected) {
  return Object.freeze({metaDataItem, isSelected})
}

const MetaDataCell = ({ model, onSelectMetaDataItemHandler }) => {
  const { theme, toggleTheme } = useContext(Theme.context)
  const styles = makeStyleSheet(theme)
  return (
    <TouchableOpacity 
    style={[styles.container, model.isSelected ? styles.selected : {backgroundColor: 'transparent'}]} 
    onPress={() => onSelectMetaDataItemHandler(model.metaDataItem)}>
      <Text style={styles.title}>{model.metaDataItem.title}</Text>
      <Text style={styles.value}>{model.metaDataItem.value}</Text>
    </TouchableOpacity >
  )
}

const makeStyleSheet = (theme) => {
  return StyleSheet.create(
    {
      container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'clear'
      },
      selected: {
        backgroundColor: 'green'
      },
      title: {
        color: theme.primaryDisabledColor,
        flex: 0.45,
        textAlign: 'right',
        paddingRight: 8,
        backgroundColor: 'clear'
      },
      value: {
        color: theme.primaryColor,
        flex: 0.55,
        textAlign: 'left',
        paddingLeft: 8
      }
    }
  );
}

export default MetaDataCell;