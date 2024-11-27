import { SafeAreaView } from "react-native-safe-area-context";
import { MetaDataTableView } from "../../common/components/MetaDataTable/MetaDataTableView";
import { useContext } from "react";
import Theme from "../../Theme";

const MetaDataScreen = ({ route }) => {
    const { theme, toggleTheme } = useContext(Theme.context)
    const styles = makeStyleSheet(theme)

    const metaDataArray = route.params.metaDataArray
    return (
        <SafeAreaProvider theme={styles.screen}>
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

const makeStyleSheet = (theme) => {
    StyleSheet.create({
        screen: {
            flex: 1
        }
    })
}

export default MetaDataScreen;
