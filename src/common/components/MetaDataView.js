import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MetaDataTableView } from "./MetaDataTable/MetaDataTableView";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import Theme from "../../Theme";
import { useHeaderHeight } from '@react-navigation/elements';
import * as Utils from "../utilities/Utils";

const MetaDataView = ({ style, metaData }) => {
    const { theme, toggleTheme } = useContext(Theme.context)
    const [selectedItems, setSelectedItems] = useState([])
    const headerHeight = useHeaderHeight();
    const styles = makeStyleSheet(theme, headerHeight)
    const metaDataCellModelArray = Utils.makeMetaDataCellModelArrayFromMetaData(metaData, selectedItems)

    const handleSelectMetaDataItem = (metaDataItem) => {
        // no handling
    }

    return (
        <View style={[style, styles.container]}>
            <MetaDataTableView
                style={{ flex: 1 }}
                metaDataCellModelArray={metaDataCellModelArray}
                onSelectMetaData={handleSelectMetaDataItem}
            />
        </View>
    )
}

const makeStyleSheet = (theme, headerHeight) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: headerHeight,
            backgroundColor: theme.secondaryColor,
            opacity: 0.9,
            flexDirection: 'column'
        }
    })
}

export default MetaDataView;
