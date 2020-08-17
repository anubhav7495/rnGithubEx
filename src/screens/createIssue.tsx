import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../types';
import {
  Container,
  Content,
  Input,
  Form,
  Item,
  Textarea,
  Button,
  Text,
  Header,
  Title,
  Body,
  Spinner,
} from 'native-base';
import {useCreateIssue} from '../operations/mutations/createIssue';

type CreateIssueProps = StackScreenProps<HomeStackParamList, 'CreateIssue'>;

const CreateIssueScreen: React.FC<CreateIssueProps> = ({navigation, route}) => {
  const [title, onChangeTitle] = useState('');
  const [body, onChangeBody] = useState('');

  const {name, owner, repositoryId} = route.params;
  const {mutate, data, loading, error} = useCreateIssue();

  const handleSubmit = () => {
    mutate({variables: {repositoryId, title, body}});
  };

  useEffect(() => {
    if (!loading && !error && data) {
      navigation.navigate('Details', {
        name,
        owner,
      });
    }
  });

  return (
    <Container>
      <Header>
        <Body>
          <Title>Create an Issue</Title>
        </Body>
      </Header>
      <Content padder>
        <Form>
          <Item regular style={styles.formItem}>
            <Input
              placeholder="Title"
              onChangeText={(text) => onChangeTitle(text)}
            />
          </Item>
          <Textarea
            rowSpan={5}
            bordered
            underline={false}
            placeholder="Leave a comment"
            onChangeText={(text) => onChangeBody(text)}
            style={styles.formItem}
          />
          <Button success onPress={handleSubmit} block>
            {loading ? <Spinner color="#fff" /> : <Text>Submit new issue</Text>}
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  formItem: {
    marginBottom: 12,
  },
});

export default CreateIssueScreen;
