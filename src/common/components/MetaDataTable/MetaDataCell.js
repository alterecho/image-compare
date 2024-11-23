import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

const MetaDataCell = ({ metaData, onSelectMetaData }) => {
  return (
    <TouchableOpacity style={styles.cell} onPress={() => onSelectMetaData(metaData)}>
      <Text style={ styles.title }>{metaData.title}</Text>
      <Text style={ styles.value }>{metaData.value}</Text>
    </TouchableOpacity >
  )
}

const styles = StyleSheet.create(
  {
    cell: {
      flex: 1,
      flexDirection: 'row',
      alignItems:'center'
    },
    title: {
      flex: 0.45,
      textAlign: 'right',
      paddingRight: 8
    },
    value: {
      flex: 0.55,
      textAlign: 'left',
      paddingLeft: 8
    }

  }
)

export default MetaDataCell;