import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Theme from "../../Theme";
import { useHeaderHeight } from '@react-navigation/elements';
import MetaDataCell from "./MetaDataTable/MetaDataCell";
import { makeMetaDataCellModelArrayFromMetaData } from "../utilities/Utils";

const MetaDataView = forwardRef(({ style, metaData, onSelectMetaDataItemHandler }, ref) => {

    const { theme, toggleTheme } = useContext(Theme.context)
    const headerHeight = useHeaderHeight();
    const styles = makeStyleSheet(theme, headerHeight)
    const [cellModelArray, setCellModelArray] = useState([])
    const flatListRef = useRef(null);

    const makeCellModelArrayByUpdatingSelectedIndices = (cellModelArray, selectedIndices) => {
        return cellModelArray.map(
            (model, index) => {
                return {...model, isSelected: selectedIndices.includes(index)};
            }
        );
    }

    useEffect(() => {
        const cellModelArray = makeMetaDataCellModelArrayFromMetaData(metaData);
        setCellModelArray(cellModelArray);
    }, [])

    useImperativeHandle(ref, () => ({
        selectIndices: (indices) => {
            
            const updatedModelArray = makeCellModelArrayByUpdatingSelectedIndices([...cellModelArray], indices);
            console.log("mdv selectIndices ", indices, "\n", updatedModelArray.map((item) => item.isSelected));
            setCellModelArray(updatedModelArray)
        },
        scrollToIndex: (index) => {
            // to implement
        }

    }))

    const handleOnSelectMetaDataItem = (index) => {
        onSelectMetaDataItemHandler(index)
    }

    const renderItem = ({ item: model, index }) => {
        return <MetaDataCell
            model={model}
            onPress={() => handleOnSelectMetaDataItem(index)}

        />
    };

    return (
        <View style={[style, styles.container]}>
            <FlatList
                ref={flatListRef}
                data={cellModelArray}
                keyExtractor={(dataItem) => dataItem.metaDataItem.title}
                // getItemLayout={}
                renderItem={renderItem}
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
