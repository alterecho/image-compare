import React, { useState } from "react";
import { View } from "react-native";
import styles from "../../styles";
import { MetaDataTableView } from "./CompareMetaDataScreen+Components";

const CompareMetaDataScreen = ({ route }) => {
  const metaDataArray = route.params.selectedImageMetaDataArray
  console.log(`CompareMetaDataScreen: ${metaDataArray} (${JSON.stringify(route)})`);
  return (
    <View style={styles.container}>
      <MetaDataTableView style={{ flex: 0.25 }} metaDataArray={metaDataArray} />
      <MetaDataTableView style={{ flex: 0.75 }} metaDataArray={metaDataArray} />
    </View>
  )
}

export default CompareMetaDataScreen;