import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, AsyncStorage, ActivityIndicator, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '~/services/api';
import Header from '~/components/Header';
import styles from './styles';
import RepositoryItem from './RepositoryItem';

const TabIcons = ({ tintColor }) => <Icon name="list-alt" size={20} color={tintColor} />;

TabIcons.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default class Repositories extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcons,
  }

  state = {
    data: [],
    loading: true,
    refreshing: false,
  }


  async componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true });
    const username = await AsyncStorage.getItem('@Githuber:username');
    const { data } = await api.get(`/users/${username}/repos`);
    this.setState({ data, loading: false, refreshing: false });
  }

  renderListItem = ({ item }) => <RepositoryItem repository={item} />

  renderList = () => {
    const { data, refreshing } = this.state;
    return (
      <FlatList

        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
      />
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Repositórios" />
        { loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}
