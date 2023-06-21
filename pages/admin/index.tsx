import { useEffect, useState } from "react";
import {
  getDocByCollectionWhere,
  updateDocByCollection,
} from "../../lib/endpoints";
import { HyButton } from "../..";

const Admin = () => {
  const [users, setUsers] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      setUsers(
        await getDocByCollectionWhere("users", "isVerified", "==", false)
      );
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const handleVerif = (id: number) => {
    const updateData = {
      isVerified: true,
    };
    updateDocByCollection("users", updateData, id);
  };

  return (
    <>
      {users &&
        users.map((user: any) => (
          <div key={user.name} className="">
            <p>{user.name}</p>
            <HyButton
              onClick={() => {
                handleVerif(user.id);
              }}
            >
              Verifier
            </HyButton>
          </div>
        ))}
    </>
  );
};

export default Admin;
