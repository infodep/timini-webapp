import { useContext } from "react";
import AuthContext from "../../contexts/auth";
import useUser from "../../helpers/hooks/useUser";

export const UserBox = (): JSX.Element => {
  const { user_id } = useContext(AuthContext);
  const { user, isError } = useUser(user_id!);

  if (isError || !user) {
    return <div>Error: {isError}</div>;
  }
  return (
    <div>
      <div>{user.id}</div>
      <div>
        {user.username} = {user.name}
      </div>
    </div>
  );
};
