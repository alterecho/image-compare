import React, { useState, useRef, useContext } from "react";
import { StyleSheet } from "react-native";
import MetaDataTableView from "../../common/components/MetaDataTable/MetaDataTableView";
import { ContainerID } from "../Constants";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Theme from "../../Theme";
import * as Utils from "../../common/utilities/Utils";

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

  const metaData1 = Utils.makeMetaDataFromExifData(exif1)
  const metaData2 = Utils.makeMetaDataFromExifData(exif2)

  const metaDataCellModelArray1 = Utils.makeMetaDataCellModelArrayFromMetaData(metaData1, selectedItems)
  const metaDataCellModelArray2 = Utils.makeMetaDataCellModelArrayFromMetaData(metaData2, selectedItems)

  const handleSelectMetaDataCell = (containerID, selectedItem) => {
    setSelectedItems([selectedItem])
    let metaDataToQuery = undefined;
    let tableViewToScrollManually = undefined;
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