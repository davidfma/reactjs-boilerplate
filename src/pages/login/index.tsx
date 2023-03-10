import {
  Main,
  Box,
  Avatar,
  TextInput,
  CheckBox,
  Anchor,
  Button,
  Form,
  FormField,
} from 'grommet';

import { UserAdmin, Mail, Lock } from 'grommet-icons';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux';
import { setAccessToken } from '../../redux/auth';
import { loginRequest, baseRequest } from '../../utils/requests';

type LoginProps = { email: string; password: string };
const loginInitialValue: LoginProps = {
  email: '',
  password: '',
};

export function Login() {
  const [formValue, setFormValue] = useState<LoginProps>(loginInitialValue);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // dispatch(
    //   setAccessToken({
    //     accessToken:
    //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MywiZW1haWwiOiJkYXZpZEB2aWxhLmNvbSJ9LCJpYXQiOjE2NzYwOTA2NTUsImV4cCI6MTY3NjA5MDY4NX0.x4WEuYgdBgCFYhtGQBsqP5-InFvZ-1l1c9_3N2e3Wxk',
    //   })
    // );
  }, [dispatch]);

  const handleSubmit = async (value: LoginProps) => {
    const response = await loginRequest(value);

    console.log(response);
  };

  const handleSubmit2 = async () => {
    try{
      const response =  await baseRequest.get('/users');

      console.log(response);
    }catch(er){

    }

  };
  return (
    <Main pad="medium" background="brand" align="center" justify="center">
      <Box
        width="400px"
        pad="40px"
        background="rgba(0, 0, 0, 0.20)"
        round
        align="center"
        justify="center"
      >
        <Avatar background="light-4" size="xlarge" margin={{ bottom: 'small' }}>
          <UserAdmin size="large" />
        </Avatar>
        <Form
          value={formValue}
          onChange={({ email, password }) =>
            setFormValue({ email: email.toLowerCase(), password })
          }
          onReset={() => setFormValue(loginInitialValue)}
          onSubmit={({ value }) => handleSubmit(value)}
        >
          <FormField
            name="email"
            htmlFor="input-email"
            margin={{ bottom: 'medium' }}
          >
            <TextInput
              id="input-email"
              icon={<Mail size="medium" />}
              type="email"
              name="email"
              placeholder="Email"
            />
          </FormField>
          <FormField
            name="password"
            htmlFor="input-password"
            margin={{ bottom: 'medium' }}
          >
            <TextInput
              id="input-password"
              name="password"
              icon={<Lock size="medium" />}
              type="password"
              placeholder="Password"
            />
          </FormField>

          <Box
            direction="row"
            align="center"
            justify="between"
            margin={{ bottom: 'medium' }}
          >
            <CheckBox width="small" height="small" label="Lembrar login?" />

            <Anchor size="small" label="Recuperar senha" />
          </Box>

          <Box direction="row" align="center" justify="center">
            <Button type="submit" primary label="Logar" />
          </Box>
          <Box direction="row" align="center" justify="center">
            <Button
              type="button"
              primary
              label="teste"
              onClick={() => handleSubmit2()}
            />
          </Box>
        </Form>
      </Box>
    </Main>
  );
}
