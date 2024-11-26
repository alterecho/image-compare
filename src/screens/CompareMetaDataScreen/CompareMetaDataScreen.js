import React, { useState, useRef, useContext } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import MetaDataTableView from "../../common/components/MetaDataTable/MetaDataTableView";
import { ContainerID } from "../Constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Theme from "../../Theme";
import { MetaDataItem } from "../../structs";

const CompareMetaDataScreen = ({ route }) => {
  // const metaDataArray1 = route.params.metaDataArray1
  // const metaDataArray2 = route.params.metaDataArray2
  const tableView1Ref = useRef(null)
  const tableView2Ref = useRef(null)

  const { theme, toggleTheme } = useContext(Theme.context);
  const styles = makeStyleSheet(theme)

  const exif1 = require('../../../tests/data/metadata-sample1.json').exif
  const exif2 = require('../../../tests/data/metadata-sample2.json').exif


  const makeMetaDataItem = (exif) => {
    return Object.keys(exif).map((key) => {
      return ({
        title: key, value: exif[key]
      })
    })
  }
  const metaDataArray1 = makeMetaDataItem(exif1)
  const metaDataArray2 = makeMetaDataItem(exif2)

  const handleSelectMetaDataCell = (containerID, selectedItem) => {
    let metaDataToQuery = undefined;
    tableViewToScrollManually = undefined;
    switch (containerID) {
      case ContainerID[0]:
        metaDataToQuery = metaDataArray2
        tableViewToScrollManually = tableView2Ref.current
        break;
      default:
        metaDataToQuery = metaDataArray1
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
    <SafeAreaView style={styles.container}>
      <MetaDataTableView ref={tableView1Ref} style={{ flex: 0.25 }} metaDataArray={metaDataArray1} onSelectMetaData={(item) => { handleSelectMetaDataCell(ContainerID[0], item) }} />
      <MetaDataTableView ref={tableView2Ref} style={{ flex: 0.75 }} metaDataArray={metaDataArray2} onSelectMetaData={(item) => { handleSelectMetaDataCell(ContainerID[1], item) }} />
    </SafeAreaView>
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