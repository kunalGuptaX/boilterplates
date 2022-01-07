import React from "react";
import { useAuthenticatedRouteQuery } from "../generated/graphql";
interface Props {}

const AuthenticatedRoute = (props: Props) => {
  const { data } = useAuthenticatedRouteQuery({
    fetchPolicy: "network-only",
  });

  if (!data) {
    return <>loading...</>;
  }

  return <div>{data.authenticatedRoute}</div>;
};

export default AuthenticatedRoute;
