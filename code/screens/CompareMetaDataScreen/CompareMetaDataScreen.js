import React, { useState } from "react";
import { View } from "react-native";
import MetaDataTableView from "../../common/components/MetaDataTable/MetaDataTableView";

const CompareMetaDataScreen = ({ route }) => {
  const metaDataArray1 = route.params.metaDataArray1
  const metaDataArray2 = route.params.metaDataArray2
  console.log(`CompareMetaDataScreen: ${JSON.stringify(metaDataArray1)}`);
  console.log(`CompareMetaDataScreen: ${JSON.stringify(metaDataArray2)}`);
  return (
    <View style={ { flex: 1, flexDirection: 'column' } }>
      <MetaDataTableView style={{ flex: 0.25 }} metaDataArray={metaDataArray1} />
      <MetaDataTableView style={{ flex: 0.75 }} metaDataArray={metaDataArray2} />
    </View>
  );
}

export default CompareMetaDataScreen;