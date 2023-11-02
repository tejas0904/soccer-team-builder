import { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Realm from "realm-web";

type LogoutProps = {
  logout: () => Promise<void>;
};

const Logout = ({ logout }: LogoutProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/");
  }, []);
  return <></>;
};

export default Logout;
