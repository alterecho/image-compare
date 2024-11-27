import { SafeAreaView } from "react-native-safe-area-context";
import { MetaDataTableView } from "../../common/components/MetaDataTable/MetaDataTableView";

const MetaDataScreen = ({ route }) => {
    const metaDataArray = route.params.metaDataArray
    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: 'green'
                }}>
                <MetaDataTableView style={{ flex: 1 }} metaDataArray={metaDataArray} />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default MetaDataScreen;
