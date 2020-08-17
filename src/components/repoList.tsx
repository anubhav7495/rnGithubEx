import React from 'react';
import {repoList_search_edges_node_Repository as repository} from '../screens/__generated__/repoList';
import {List, ListItem, Body, Text, Spinner, Icon} from 'native-base';
import {View, StyleSheet} from 'react-native';

interface RepoListProps {
  repos: repository[];
  isLoading: boolean;
  onClick: (name: string, owner: string) => void;
  emptyText?: string;
}

const RepoList: React.FC<RepoListProps> = ({
  repos,
  isLoading,
  onClick,
  emptyText,
}) => {
  if (isLoading) {
    return <Spinner color="#000" />;
  }

  if (!repos?.length) {
    return (
      <View style={styles.emptyView}>
        <Icon name="repo" type="Octicons" />
        <Text>{emptyText || 'No results'}</Text>
      </View>
    );
  }

  return (
    <List>
      {repos?.map((repo) => (
        <ListItem
          noIndent
          key={repo.id}
          onPress={() => onClick(repo.name, repo.owner.login)}>
          <Body>
            <Text>{repo.nameWithOwner}</Text>
            <Text note>{repo.description}</Text>
          </Body>
        </ListItem>
      ))}
    </List>
  );
};

const styles = StyleSheet.create({
  emptyView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default RepoList;
