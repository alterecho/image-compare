import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Theme from "../../Theme";
import { useHeaderHeight } from '@react-navigation/elements';
import MetaDataCell from "./MetaDataTable/MetaDataCell";
import * as Utils from "../utilities/Utils";

const MetaDataView = forwardRef(({ style, metaData, onSelectMetaDataItemHandler }, ref) => {
    const { theme, toggleTheme } = useContext(Theme.context)
    const [selectedItems, setSelectedItems] = useState([])
    const headerHeight = useHeaderHeight();
    const styles = makeStyleSheet(theme, headerHeight)
    const metaDataCellModelArray = metaData == null ? [] : Utils.makeMetaDataCellModelArrayFromMetaData(
        metaData, selectedItems
    );

    const flatListRef = useRef(null);

    useImperativeHandle(ref, () => ({
        selectIndex: (selectedIndex) => {
            if (selectedIndex >= metaDataCellModelArray.length) {
                return
            }
            
            const selectedMetaDataItem = metaDataCellModelArray[selectedIndex]?.metaDataItem
            setSelectedItems(selectedMetaDataItem ? [selectedMetaDataItem] : [])

            try {
                flatListRef?.current?.scrollToIndex({index: selectedIndex, animated: true});
            } catch (error) {
                console.log(error);
            }
            
        }
    }))

    const handleOnSelectMetaDataItem = (metaDataItem) => {
        setSelectedItems([metaDataItem])
        onSelectMetaDataItemHandler(metaDataItem)
    }
    return (
        <View style={[style, styles.container]}>
            <FlatList
                ref={flatListRef}
                data={metaDataCellModelArray}
                keyExtractor={(dataItem) => dataItem.metaDataItem.title}
                renderItem={
                    ({ item: model }) => {
                        return <MetaDataCell
                            model={model}
                            onSelectMetaDataItemHandler={handleOnSelectMetaDataItem}

                        />
                    }
                }
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
