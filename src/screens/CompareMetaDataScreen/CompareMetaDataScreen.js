import React, { useState, useRef } from "react";
import { View } from "react-native";
import MetaDataTableView from "../../common/components/MetaDataTable/MetaDataTableView";
import { ContainerID } from "../Constants";
import { SafeAreaView } from "react-native-safe-area-context";

const CompareMetaDataScreen = ({ route }) => {
  // const metaDataArray1 = route.params.metaDataArray1
  // const metaDataArray2 = route.params.metaDataArray2
  const tableView1Ref = useRef(null)
  const tableView2Ref = useRef(null)

  console.log(`CompareMetaDataScreen: ${JSON.stringify(metaDataArray1)}`);
  console.log(`CompareMetaDataScreen: ${JSON.stringify(metaDataArray2)}`);

  const metaDataArray1 = require('../../../tests/data/metadata-sample1.json')
  const metaDataArray2 = require('../../../tests/data/metadata-sample1.json')

  const handleSelectMetaDataCell = (containerID, selectedItem) => {
    console.log(`containerID: ${containerID} selectedItem: ${selectedItem}`)
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

    console.log("tableViewToScrollManually: ", tableViewToScrollManually, tableView1Ref.current, tableView2Ref.current)
    if (index !== -1 && metaDataToQuery) {
      tableViewToScrollManually.scrollToIndex({ index, animated: true });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
      <MetaDataTableView ref={tableView1Ref} style={{ flex: 0.25 }} metaDataArray={metaDataArray1} onSelectMetaData={(item) => { handleSelectMetaDataCell(ContainerID[0], item)}} />
      <MetaDataTableView ref={tableView2Ref} style={{ flex: 0.75 }} metaDataArray={metaDataArray2} onSelectMetaData={(item) => { handleSelectMetaDataCell(ContainerID[1], item)}} />
    </SafeAreaView>
  );
}

export default CompareMetaDataScreen;