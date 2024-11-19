import { View } from "react-native";
import { MetaDataTableView } from "../../common/components/MetaDataTable/MetaDataTableView";

const MetaDataScreen = ({ route }) => {
    const metaDataArray = route.params.metaDataArray
    console.log(`MetaDataScreen: ${JSON.stringify(metaDataArray)}`);
    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor:'red' }}>
            <MetaDataTableView style={{ flex: 1 }} metaDataArray={metaDataArray} />
        </View>
    )
}

export default MetaDataScreen;
