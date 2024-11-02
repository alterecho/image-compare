import React, { View, useState } from "react";
import styles from "../../styles";

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