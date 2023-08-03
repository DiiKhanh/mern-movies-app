import { LoadingButton } from '@mui/lab';
import { Box, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Container from '../components/common/Container';
import uiConfigs from '../configs/ui.configs';
import { useState } from 'react';
import userApi from '../apis/modules/user.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/userSlice';
import { setAuthModalOpen } from '../redux/features/authModalSlice';

const PasswordUpdate = () => {
  const [onRequest, setOnRequest] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = Yup.object({
    password: Yup.string()
      .min(8, 'password minimum 8 characters')
      .required('password is required'),
    newPassword: Yup.string()
      .min(8, 'newPassword minimum 8 characters')
      .required('newPassword is required'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'confirmNewPassword not match')
      .min(8, 'confirmNewPassword minimum 8 characters')
      .required('confirmNewPassword is required')
  });

  const updatePasswordForm = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    resolver: yupResolver(schema)
  });

  const handleSubmit = async (values) => onUpdate(values);

  const onUpdate = async (values) => {
    if (onRequest) return;
    setOnRequest(true);

    const { response, err } = await userApi.passwordUpdate(values);

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      updatePasswordForm.reset();
      navigate('/');
      dispatch(setUser(null));
      dispatch(setAuthModalOpen(true));
      toast.success('Update password success! Please re-login');
    }
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header='update password'>
        <Box component='form' maxWidth='400px' onSubmit={updatePasswordForm.handleSubmit(handleSubmit)}>
          <Stack spacing={2}>
            <TextField
              {
                ...updatePasswordForm.register('password')
              }
              type='password'
              placeholder='password'
              name='password'
              fullWidth
              color='success'
              error={updatePasswordForm?.formState?.touchedFields && updatePasswordForm?.formState?.errors?.password?.message !== undefined}
              helperText={updatePasswordForm?.formState?.touchedFields && updatePasswordForm?.formState?.errors?.password?.message}
            />
            <TextField
              {
                ...updatePasswordForm.register('newPassword')
              }
              type='password'
              placeholder='new password'
              name='newPassword'
              fullWidth
              color='success'
              error={updatePasswordForm?.formState?.touchedFields && updatePasswordForm?.formState?.errors?.newPassword?.message !== undefined}
              helperText={updatePasswordForm?.formState?.touchedFields && updatePasswordForm?.formState?.errors?.newPassword?.message}
            />
            <TextField
              {
                ...updatePasswordForm.register('confirmNewPassword')
              }
              type='password'
              placeholder='confirm new password'
              name='confirmNewPassword'
              fullWidth
              color='success'
              error={updatePasswordForm?.formState?.touchedFields && updatePasswordForm?.formState?.errors?.confirmNewPassword?.message !== undefined}
              helperText={updatePasswordForm?.formState?.touchedFields && updatePasswordForm?.formState?.errors?.confirmNewPassword?.message}
            />

            <LoadingButton
              type='submit'
              variant='contained'
              fullWidth
              sx={{ marginTop: 4 }}
              loading={onRequest}
            >
              update password
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default PasswordUpdate;