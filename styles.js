import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#6200EE',
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  mainContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default styles;