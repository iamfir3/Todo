import notFound from "../Assets/404.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);
  return (
    <>
      <img src={notFound} alt="404"></img>
    </>
  );
};

export default NotFound;
