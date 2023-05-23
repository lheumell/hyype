import { HyButton, HyEventsList } from "../..";
import { signOut } from "firebase/auth";
import Layout from "../../Layout";
import GuardedPage from "../../components/GuardedPage";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../_app";
import { getDocByCollectionWhere } from "../../lib/endpoints";

const Profil = () => {
  const [myEvents, setMyEvents] = useState<any[]>();

  const useAuthContext = useContext(AuthContext);

  const { currentUser } = useAuthContext;

  useEffect(() => {
    async function fetchData() {
      currentUser &&
        setMyEvents(
          await getDocByCollectionWhere(
            "events",
            "organizer",
            "==",
            currentUser.id
          )
        );
    }
    fetchData();
  }, [currentUser]);

  useEffect(() => {
    console.log(myEvents);
  }, [myEvents]);

  return (
    <Layout title="profil">
      <GuardedPage whenSignedOut="/auth/sign-up">
        {currentUser?.email}
        {currentUser?.name}
        {myEvents && <HyEventsList events={myEvents} admin />}
        <HyButton onClick={signOut}>Deconnexion</HyButton>
      </GuardedPage>
    </Layout>
  );
};

export default Profil;
