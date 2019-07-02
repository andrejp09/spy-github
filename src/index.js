import { AsyncStorage } from 'react-native';
import React, { Component } from 'react';
import CodePush from 'react-native-code-push';
import createNavigator from './routes';
import '~/config/ReactotronConfig';
import '~/config/DevToosConfig';


class App extends Component {
  state = {
    userChecked: false,
    userLogged: false,
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@Githuber:username');

    this.setState({ userChecked: true, userLogged: !!username });
  }

  render() {
    const { userChecked, userLogged } = this.state;
    if (!userChecked) {
      return null;
    }
    const Routes = createNavigator(userLogged);
    return <Routes />;
  }
}
export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
