import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, metrics } from '~/styles';


const styles = StyleSheet.create({
  container: {
    height: 54 + getStatusBarHeight(),
    paddingTop: getStatusBarHeight(),
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: metrics.basePadding,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darker,
  },
  icon: {
    color: colors.darker,
  },
});


export default styles;
