import React, { useState } from "react";
import { View } from "react-native";
import { MetaDataTableView } from "../../common/components/MetaDataTable/MetaDataCell";

const CompareMetaDataScreen = ({ route }) => {
  const metaDataArray = route.params.metaDataArray
  console.log(`CompareMetaDataScreen: ${metaDataArray} (${JSON.stringify(route)})`);
  return (
    <View style={ { flex: 1, flexDirection: 'column' } }>
      <MetaDataTableView style={{ flex: 0.25 }} metaDataArray={metaDataArray} />
      <MetaDataTableView style={{ flex: 0.75 }} metaDataArray={metaDataArray} />
    </View>
  )
}

export default CompareMetaDataScreen;