import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
