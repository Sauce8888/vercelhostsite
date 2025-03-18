import { supabase } from './client';

export type SignInWithEmailParams = {
  email: string;
  password: string;
};

export type SignUpWithEmailParams = {
  email: string;
  password: string;
  metadata?: Record<string, any>;
};

export const signInWithEmail = async ({ email, password }: SignInWithEmailParams) => {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signUpWithEmail = async ({ email, password, metadata }: SignUpWithEmailParams) => {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });
};

export const signOut = async () => {
  return supabase.auth.signOut();
};

export const getSession = async () => {
  return supabase.auth.getSession();
};

export const getUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
}; 