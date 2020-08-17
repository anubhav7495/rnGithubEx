import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useQuery} from '@apollo/client';
import {
  Container,
  Content,
  Button,
  Icon,
  Text,
  ListItem,
  List,
  Body,
  Spinner,
  Card,
  CardItem,
  H2,
  Right,
  Left,
} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../types';
import {GET_REPO} from '../operations/queries/getRepo';
import {addToWatchList} from '../operations/mutations/addToWatchList';
import * as repoTypes from '../operations/queries/__generated__/repo';

type DetailsProps = StackScreenProps<HomeStackParamList, 'Details'>;

const DetailsScreen: React.FC<DetailsProps> = ({navigation, route}) => {
  const {name, owner} = route.params;
  const {data, loading, error} = useQuery<
    repoTypes.repo,
    repoTypes.repoVariables
  >(GET_REPO, {variables: {name, owner}});

  const onWatchPress = async () => {
    const {id, name, nameWithOwner, owner, description} = data?.repository;
    try {
      await addToWatchList({
        __typename: 'Repository',
        id,
        name,
        nameWithOwner,
        owner,
        description,
      });
    } catch (e) {
      // Do something here
    }
  };

  const onNewIssuePress = () => {
    navigation.navigate('CreateIssue', {
      name,
      owner,
      repositoryId: data?.repository?.id,
    });
  };

  let body = null;

  if (!data) {
    body = <Text>Not Found</Text>;
  }

  if (data) {
    const {description, issues, pullRequests, isWatching} = data.repository;
    body = (
      <>
        <Card>
          <CardItem>
            <Body>
              <Text style={styles.owner}>{owner}</Text>
              <H2 style={styles.name}>{name}</H2>
              <Text style={styles.description}>{description}</Text>
              <View style={styles.ctaView}>
                <Button small iconLeft onPress={onNewIssuePress}>
                  <Icon name="pluscircleo" type="AntDesign" />
                  <Text>New Issue</Text>
                </Button>
                <Button
                  small
                  iconLeft
                  onPress={onWatchPress}
                  bordered={isWatching}
                  disabled={isWatching}>
                  <Icon name="eye-outline" />
                  <Text>{isWatching ? 'Watching' : 'Watch'}</Text>
                </Button>
              </View>
            </Body>
          </CardItem>
        </Card>
        <List>
          <ListItem noIndent icon>
            <Left>
              <Icon name="git-pull-request-outline" />
            </Left>
            <Body>
              <Text>Pull Requests</Text>
            </Body>
            <Right>
              <Text>{pullRequests.totalCount}</Text>
            </Right>
          </ListItem>
          <ListItem itemDivider>
            <Text>Open Issues</Text>
          </ListItem>
          {issues?.edges?.map((issue => {
            return (
              <ListItem noIndent key={issue.node.id}>
                <Body>
                  <Text note>#{issue.node.number}</Text>
                  <Text>{issue.node.title}</Text>
                </Body>
              </ListItem>
            );
          }))}
        </List>
      </>
    );
  }

  if (loading) {
    body = <Spinner color="#000" />;
  }

  return (
    <Container>
      <Content>{body}</Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  owner: {
    marginBottom: 4,
    color: '#666',
  },
  name: {
    marginBottom: 4,
  },
  description: {
    marginBottom: 16,
  },
  ctaView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default DetailsScreen;
