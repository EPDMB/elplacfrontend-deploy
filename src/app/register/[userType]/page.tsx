import { RegisterView } from "@/components/RegisterView";
import { RegisterViewPageProps } from "@/types";
import React from "react";

const page: React.FC<RegisterViewPageProps> = ({ params }) => {
  console.log(params);

  return <RegisterView userTypeParam={params.userType} />;
};
export default page;
