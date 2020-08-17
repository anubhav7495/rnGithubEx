import React, {useCallback, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {
  Container,
  Content,
  Header,
  Button,
  Icon,
  Text,
  Input,
  Item,
} from 'native-base';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {useFocusEffect} from '@react-navigation/native';
import {TabParamList} from '../types';
import {GET_WATCH_LIST} from '../operations/queries/getWatchList';
import {ASC, DESC} from '../constants';
import RepoList from '../components/repoList';
import { StyleSheet } from 'react-native';

type HomeProps = BottomTabScreenProps<TabParamList, 'WatchList'>;

const HomeScreen: React.FC<HomeProps> = ({navigation}) => {
  const [getWatchList, {data, loading}] = useLazyQuery(GET_WATCH_LIST);
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState(ASC);

  useFocusEffect(
    useCallback(() => {
      getWatchList();
    }, [getWatchList]),
  );

  const handleQueryChange = (text: string) => {
    setQuery(text);
  };

  const handleOrderChange = () => {
    const newOrder = order === ASC ? DESC : ASC;
    setOrder(newOrder);
  };

  const sortWatchList = (_, __) => {
    return order === ASC ? 1 : -1;
  };

  const filterWatchList = (repo) => {
    return (
      !(query.length > 3) ||
      repo.nameWithOwner.toLowerCase().includes(query.toLowerCase())
    );
  };

  const onRepoPress = (name: string, owner: string) =>{
    navigation.navigate('Details', {
      name: name,
      owner: owner,
    });
  };

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="search" />
          <Input
            placeholder="Search Watchlist"
            onChangeText={handleQueryChange}
          />
          <Button transparent>
            <Icon
              name={order === ASC ? 'sort-asc' : 'sort-desc'}
              type="FontAwesome"
              onPress={handleOrderChange}
            />
          </Button>
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
      <Content contentContainerStyle={styles.content}>
        <RepoList
          repos={data?.watchList?.filter(filterWatchList)?.sort(sortWatchList)}
          isLoading={loading}
          onClick={onRepoPress}
          emptyText="Watchlist is empty"
        />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
});

export default HomeScreen;
