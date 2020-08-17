import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {LoginStackParamList} from '../types';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Icon,
  Toast,
  Spinner,
} from 'native-base';
import {signup} from '../operations/mutations/auth';

type SignupProps = StackScreenProps<LoginStackParamList, 'Signup'>;

const SignupScreen: React.FC<SignupProps> = () => {
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const [confirmPassword, onChangeConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await signup(username, password);
    } catch (e) {
      Toast.show({text: e, type: 'danger', position: 'top'});
    }
    setLoading(false);
  };

  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        <Form style={styles.form}>
          <Icon name="logo-github" style={styles.icon} />
          <Item rounded style={styles.formItem}>
            <Input
              placeholder="Username"
              onChangeText={(text) => onChangeUsername(text)}
            />
          </Item>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder="Password"
              onChangeText={(text) => onChangePassword(text)}
              secureTextEntry
            />
          </Item>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder="Confirm Password"
              onChangeText={(text) => onChangeConfirmPassword(text)}
              secureTextEntry
            />
          </Item>
          <Button
            style={styles.signinBtn}
            dark
            onPress={handleSubmit}
            disabled={
              username.length < 3 ||
              password.length <= 6 ||
              password !== confirmPassword
            }>
            {loading ? <Spinner color="#fff" /> : <Text>Sign Up</Text>}
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  formItem: {
    marginBottom: 12,
  },
  signinBtn: {
    marginTop: 16,
    marginBottom: 16,
    alignSelf: 'center',
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  signupBtn: {
    alignSelf: 'center',
  },
});

export default SignupScreen;
