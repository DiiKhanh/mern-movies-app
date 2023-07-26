import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, TextField, Button, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const SigninForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();


  const schema = Yup.object({
    username: Yup.string()
      .min(8, 'username minimum 8 characters')
      .required('username is required'),
    password: Yup.string()
      .min(8, 'password minimum 8 characters')
      .required('password is required')
  });
  const signinForm = useForm({
    defaultValues: {
      username: '',
      password: ''
    },
    resolver: yupResolver(schema)
  });
  const handleSubmit = (data) => {
    console.log(data);
  };
  // console.log(signinForm);
  return (
    <Box component='form' onSubmit={signinForm.handleSubmit(handleSubmit)}>
      <Stack spacing={3}>
        <TextField
          {
            ...signinForm.register('username')
          }
          type="text"
          placeholder="username"
          name="username"
          fullWidth
          color="success"
          error={signinForm?.formState?.touchedFields && signinForm?.formState?.errors?.username?.message !== undefined}
          helperText={signinForm?.formState?.touchedFields && signinForm?.formState?.errors?.username?.message}
        />
        <TextField
          {
            ...signinForm.register('password')
          }
          type="password"
          placeholder="password"
          name="password"
          fullWidth
          color="success"
          error={signinForm?.formState?.touchedFields && signinForm?.formState?.errors?.password?.message !== undefined}
          helperText={signinForm?.formState?.touchedFields && signinForm?.formState?.errors?.password?.message}
        />

      </Stack>
      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        sign in
      </LoadingButton>

      <Button
        fullWidth
        sx={{ marginTop: 1 }}
        onClick={() => switchAuthState()}
      >
        sign up
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined" >{errorMessage}</Alert>
        </Box>
      )}
    </Box>
  );
};

export default SigninForm;