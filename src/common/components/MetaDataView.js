import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MetaDataTableView } from "../../common/components/MetaDataTable/MetaDataTableView";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import Theme from "../../Theme";
import { useHeaderHeight } from '@react-navigation/elements';
import * as Utils from "../../common/utilities/Utils";
import { StatusBar } from "expo-status-bar";

const MetaDataView = ({ route }) => {
    const { theme, toggleTheme } = useContext(Theme.context)
    const [ selectedItems, setSelectedItems ] = useState([])
    const headerHeight = useHeaderHeight();
    const styles = makeStyleSheet(theme, headerHeight)
    const metaData = route.params.imageInfo.metaData
    const metaDataCellModelArray = Utils.makeMetaDataCellModelArrayFromMetaData(metaData, selectedItems)

    const handleSelectMetaDataItem = (metaDataItem) => {
        // no handling
    }

    return (
        <View style={ [ styles.container ]}>
        <MetaDataTableView style={{ flex: 1 }} metaDataCellModelArray={metaDataCellModelArray} onSelectMetaData={handleSelectMetaDataItem}/>
        </View>
)
}

const makeStyleSheet = (theme, headerHeight) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: headerHeight,
            backgroundColor: theme.secondaryColor,
            flexDirection: 'column'
        }
    })
}

export default MetaDataView;
