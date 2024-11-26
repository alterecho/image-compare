import { SafeAreaView } from "react-native";
import { MetaDataTableView } from "../../common/components/MetaDataTable/MetaDataTableView";

const MetaDataScreen = ({ route }) => {
    const metaDataArray = route.params.metaDataArray
    return (
        <SafeAreaView
            style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'green'
            }}>
            <MetaDataTableView style={{ flex: 1 }} metaDataArray={metaDataArray} />
        </SafeAreaView>
    )
}

export default MetaDataScreen;
