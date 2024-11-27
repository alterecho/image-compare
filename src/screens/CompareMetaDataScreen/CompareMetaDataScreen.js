import React, { useState, useRef, useContext } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import MetaDataTableView from "../../common/components/MetaDataTable/MetaDataTableView";
import { ContainerID } from "../Constants";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Theme from "../../Theme";
import { MetaDataItem } from "../../structs";
import { Model as MetaDataCellModel } from "../../common/components/MetaDataTable/MetaDataCell";

const CompareMetaDataScreen = ({ route }) => {
  // const metaDataArray1 = route.params.metaDataArray1
  // const metaDataArray2 = route.params.metaDataArray2
  const tableView1Ref = useRef(null)
  const tableView2Ref = useRef(null)

  const { theme, toggleTheme } = useContext(Theme.context);
  const styles = makeStyleSheet(theme)

  const exif1 = require('../../../tests/data/metadata-sample1.json').exif
  const exif2 = require('../../../tests/data/metadata-sample2.json').exif

  const [selectedItems, setSelectedItems] = useState([])

  const makeMetaData = (exif) => {
    return Object.keys(exif).map((key) => MetaDataItem(key, exif[key]))
  }

  const makeMetaDataCellModelArray = (metaData) => {

    const mp = metaData.map((metaDataItem) => {
      let isSelected = selectedItems.some(item => item.title === metaDataItem.title)
      return MetaDataCellModel(metaDataItem, isSelected)
    });
    return mp
  }

  const metaData1 = makeMetaData(exif1)
  const metaData2 = makeMetaData(exif2)


  const metaDataCellModelArray1 = makeMetaDataCellModelArray(metaData1)
  const metaDataCellModelArray2 = makeMetaDataCellModelArray(metaData2)

  const handleSelectMetaDataCell = (containerID, selectedItem) => {
    setSelectedItems([selectedItem])
    let metaDataToQuery = undefined;
    tableViewToScrollManually = undefined;
    switch (containerID) {
      case ContainerID[0]:
        metaDataToQuery = metaData2
        tableViewToScrollManually = tableView2Ref.current
        break;
      default:
        metaDataToQuery = metaData1
        tableViewToScrollManually = tableView1Ref.current
        break;
    }

    let index = metaDataToQuery.findIndex((item) => {
      return item.title == selectedItem.title
    })

    if (index !== -1 && metaDataToQuery) {
      tableViewToScrollManually.scrollToIndex({ index, animated: true });
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <MetaDataTableView
          ref={tableView1Ref}
          style={{ flex: 0.25 }}
          metaDataCellModelArray={metaDataCellModelArray1}
          onSelectMetaData={(item) => {
            handleSelectMetaDataCell(ContainerID[0], item)
          }} />
        <MetaDataTableView
          ref={tableView2Ref}
          style={{ flex: 0.75 }}
          metaDataCellModelArray={metaDataCellModelArray2}
          onSelectMetaData={(item) => {
            handleSelectMetaDataCell(ContainerID[1], item)
          }} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const makeStyleSheet = (theme) => {
  return StyleSheet.create(
    {
      container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.secondaryColor
      }
    }
  );
}

export default CompareMetaDataScreen;