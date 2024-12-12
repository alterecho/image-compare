import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Theme from "../../Theme";
import { useHeaderHeight } from '@react-navigation/elements';
import MetaDataCell from "./MetaDataTable/MetaDataCell";
import { makeMetaDataCellModelArrayFromMetaData } from "../utilities/Utils";

const MetaDataView = forwardRef(({ style, metaData, comparisonMetaData,  onSelectMetaDataItemHandler }, ref) => {

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
        console.log("mdv useeffect");
        // console.log("mdv useeffect metaData:\n", metaData, "\ncomparisonMetaData\n" , comparisonMetaData);
        const cellModelArray = makeMetaDataCellModelArrayFromMetaData({ metaData, comparisonMetaData });
        console.log("cellModelArray", cellModelArray);
        setCellModelArray(cellModelArray);
    }, [])

    useImperativeHandle(ref, () => ({
        selectIndices: (indices) => {
            
            const updatedModelArray = makeCellModelArrayByUpdatingSelectedIndices([...cellModelArray], indices);
            setCellModelArray(updatedModelArray)
        },
        scrollToIndex: (index) => {
            console.log("mdv scroll to index", index, "cellModelArray.length ", cellModelArray.length);
            if (index > cellModelArray.length - 1) {
                return
            }
            try {
                flatListRef.current.scrollToIndex({ index: index, animated: true });
            } catch (error) {
                console.log(error);
            }
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
