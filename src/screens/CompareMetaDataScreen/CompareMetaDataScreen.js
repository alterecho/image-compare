import React, { useState, useRef, useContext } from "react";
import { StyleSheet, View } from "react-native";
import MetaDataTableView from "../../common/components/MetaDataTable/MetaDataTableView";
import { ContainerID } from "../Constants";
import Theme from "../../Theme";
import * as Utils from "../../common/utilities/Utils";
import { useHeaderHeight } from "@react-navigation/elements"

const CompareMetaDataScreen = ({ route }) => {
  const tableView1Ref = useRef(null)
  const tableView2Ref = useRef(null)
  const headerHeight = useHeaderHeight()
  const { theme, toggleTheme } = useContext(Theme.context);
  const styles = makeStyleSheet(theme, headerHeight)

  const exif1 = require('../../../tests/data/metadata-sample1.json').exif
  const exif2 = require('../../../tests/data/metadata-sample2.json').exif

  const [selectedItems, setSelectedItems] = useState([])

  const metaData1 = route.params.metaData1
  const metaData2 = route.params.metaData2

  // const metaData1 = Utils.makeMetaDataFromExifData(exif1)
  // const metaData2 = Utils.makeMetaDataFromExifData(exif2)

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
      <View style={styles.screen}>
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
      </View>
  );
}

const makeStyleSheet = (theme, headerHeight) => {
  return StyleSheet.create(
    {
      screen: {
        flex: 1,
        paddingTop: headerHeight,
        flexDirection: 'column',
        backgroundColor: theme.secondaryColor
      }
    }
  );
}

export default CompareMetaDataScreen;