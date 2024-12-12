import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import Theme from "../../../Theme";
import { useContext } from "react";

export const DifferenceType = {
  text: "text",
  greaterThan: "greaterThan",
  lesserThan: "lesserThan"
};
export function DifferenceModel({ value, type }) {
  return Object.freeze({ value, type });
}

export function Model({ metaDataItem, isSelected, difference = null, type }) {
  return Object.freeze({ metaDataItem, isSelected, difference, type })
}

const MetaDataCell = ({ model, onPress }) => {
  const { theme, toggleTheme } = useContext(Theme.context)
  const styles = makeStyleSheet(theme)
  return (
    <TouchableOpacity
      style={[styles.container, model.isSelected ? styles.selected : { backgroundColor: 'transparent' }]}
      onPress={onPress}>
      <Text style={styles.title}>{model.metaDataItem.title}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{model.metaDataItem.value}</Text>
        {
          (model.difference.value != null) &&
          (
            <Text style={[
              styles.difference,
              model.difference.type === DifferenceType.greaterThan && styles.difference.greaterThan,
              model.difference.type === DifferenceType.lesserThan && styles.difference.lesserThan
            ]}>
              ({model.difference.value})
            </Text>
          )
        }

      </View>
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
      valueContainer: {
        flex: 0.55,
        flexDirection: 'row',
        paddingLeft: 8,
        textAlign: 'left'
      },
      value: {
        color: theme.primaryColor,
        textAlign: 'left',
      },
      difference: {
        color: theme.primaryColor,
        paddingLeft: 8,
        textAlign: 'left',
        greaterThan: {
          color: '#00ff00'
        },
        lesserThan: {
          color: '#ff0000'
        }
      }


    }
  );
}

export default MetaDataCell;