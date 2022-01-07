import React from "react";
import { Link } from "react-router-dom";
import { setAccessToken } from "./accessToken";
import { useLogoutMutation, useMeQuery } from "./generated/graphql";

interface Props {}

const Header = (props: Props) => {
  const { data, loading } = useMeQuery({ fetchPolicy: "network-only" });
  const [logout, { client }] = useLogoutMutation();
  let body = null;

  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = (
      <>
        <div>you are logged in as {data.me.email}</div>{" "}
        <button
          onClick={async () => {
            await logout();
            setAccessToken("");
            await client!.resetStore();
          }}
        >
          logout
        </button>
      </>
    );
  } else {
    body = <div>not logged in</div>;
  }

  return (
    <header>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/authenticated-route">Authenticated Route</Link>
      </div>
      {body}
    </header>
  );
};

export default Header;
