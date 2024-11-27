import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MetaDataTableView } from "../../common/components/MetaDataTable/MetaDataTableView";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import Theme from "../../Theme";
import * as Utils from "../../common/utilities/Utils";

const MetaDataScreen = ({ route }) => {
    const { theme, toggleTheme } = useContext(Theme.context)
    const [ selectedItems, setSelectedItems ] = useState([])
    const styles = makeStyleSheet(theme)
    const metaData = route.params.imageInfo.metaData
    const metaDataCellModelArray = Utils.makeMetaDataCellModelArrayFromMetaData(metaData, selectedItems)

    const handleSelectMetaDataItem = (metaDataItem) => {
        setSelectedItems([metaDataItem])
    }

    return (
        <SafeAreaProvider style={styles.screen}>
            <SafeAreaView style={ {flex: 1} }>
                <MetaDataTableView style={{ flex: 1 }} metaDataCellModelArray={metaDataCellModelArray} onSelectMetaData={handleSelectMetaDataItem}/>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const makeStyleSheet = (theme) => {
    return StyleSheet.create({
        screen: {
            flex: 1,
            backgroundColor: theme.secondaryColor,
            flexDirection: 'column'
        }
    })
}

export default MetaDataScreen;
