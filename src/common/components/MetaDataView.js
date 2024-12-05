import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MetaDataTableView } from "./MetaDataTable/MetaDataTableView";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Theme from "../../Theme";
import { useHeaderHeight } from '@react-navigation/elements';
import * as Utils from "../utilities/Utils";

const MetaDataView =  forwardRef(({ style, metaData, onSelectMetaDataItemHandler }, ref) => {
    const { theme, toggleTheme } = useContext(Theme.context)
    const [selectedItems, setSelectedItems] = useState([])
    const headerHeight = useHeaderHeight();
    const styles = makeStyleSheet(theme, headerHeight)
    const metaDataCellModelArray = metaData == null ? [] : Utils.makeMetaDataCellModelArrayFromMetaData(
        metaData, selectedItems
    );
     
    const tableViewRef = useRef(null);
    
    useImperativeHandle(ref, () => ({
        selectIndex: (selectedIndex) => {
            if (selectedIndex >= metaDataCellModelArray.length) {
                return
            }
            
            const selectedMetaDataItem = metaDataCellModelArray[selectedIndex]?.metaDataItem
            setSelectedItems(selectedMetaDataItem ? [selectedMetaDataItem] : [])
            tableViewRef?.current?.scrollToIndex(index); 
    }
    }))

    const handleOnSelectMetaDataItem = (metaDataItem) => {
        setSelectedItems([metaDataItem])
        onSelectMetaDataItemHandler(metaDataItem)
    }
    return (
        <View style={[style, styles.container]}>
            <MetaDataTableView
                ref={tableViewRef}
                style={{ flex: 1 }}
                metaDataCellModelArray={metaDataCellModelArray}
                onSelectMetaDataItemHandler={handleOnSelectMetaDataItem}
            />
        </View>
    )
});

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
