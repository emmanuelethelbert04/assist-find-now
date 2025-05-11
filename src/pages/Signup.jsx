
import React from 'react';
import Layout from '../components/layout/Layout';
import SignupForm from '../components/auth/SignupForm';

const Signup = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <SignupForm />
      </div>
    </Layout>
  );
};

export default Signup;
