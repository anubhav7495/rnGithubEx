import React from 'react';
import {StyleSheet} from 'react-native';
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
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../types';
import {SEARCH_REPOS} from '../operations/queries/searchRepos';
import * as repoListTypes from '../operations/queries/__generated__/repoList';
import RepoList from '../components/repoList';

type HomeProps = StackScreenProps<HomeStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeProps> = ({navigation}) => {
  const [searchRepos, {loading, data}] = useLazyQuery<
    repoListTypes.repoList,
    repoListTypes.repoListVariables
  >(SEARCH_REPOS);

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
            placeholder="Search Repository"
            onSubmitEditing={(ev) => {
              searchRepos({variables: {query: ev.nativeEvent.text}});
            }}
          />
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
      <Content contentContainerStyle={styles.content}>
        <RepoList
          repos={data?.search?.edges?.map((repo) => repo?.node)}
          onClick={onRepoPress}
          isLoading={loading}
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
