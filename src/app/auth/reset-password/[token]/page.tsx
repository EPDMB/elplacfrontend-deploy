import ForgotPassStep2 from '@/components/ForgotPassStep2'
import { ForgotPasswordProps } from '@/types';
import React from 'react'

const page: React.FC<ForgotPasswordProps> = ({ params }) => {
  console.log(params);
  return (
    <div>
      <ForgotPassStep2 token={params.token} />
    </div>
  );
};

export default page