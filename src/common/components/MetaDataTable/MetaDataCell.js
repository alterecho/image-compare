import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import Theme from "../../../Theme";
import { useContext } from "react";

const MetaDataCell = ({ metaData, onSelectMetaData }) => {
  const theme = useContext(Theme.context)
  const styles = makeStyleSheet(theme)

  return (
    <TouchableOpacity style={styles.container} onPress={() => onSelectMetaData(metaData)}>
      <Text style={styles.title}>{metaData.title}</Text>
      <Text style={styles.value}>{metaData.value}</Text>
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
      title: {
        color: theme.primaryColor,
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