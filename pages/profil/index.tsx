import { HyButton, HyEventsList, HyText } from "../..";
import { signOut } from "firebase/auth";
import Layout from "../../Layout";
import GuardedPage from "../../components/GuardedPage";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../_app";
import { findDocById, getDocByCollectionWhere } from "../../lib/endpoints";
import style from "./profil.module.css";

const Profil = () => {
  const [myEvents, setMyEvents] = useState<any[]>();
  const [eventsBooked, setEventsBooked] = useState<any>();

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
      if (currentUser && Array.isArray(currentUser.eventsBook)) {
        const eventsPromises =
          currentUser &&
          currentUser.eventsBook &&
          currentUser.eventsBook.map(async (eventId: any) => {
            const event = await findDocById("events", eventId);
            return event;
          });
        const events = await Promise.all(eventsPromises);
        setEventsBooked(events);
      }
    }
    fetchData();
  }, [currentUser]);

  return (
    <Layout title="profil">
      <GuardedPage whenSignedOut="/auth/sign-up">
        <HyText variant="title" weight="bold">
          Mes informations :
        </HyText>
        <HyText> Email : {currentUser?.email}</HyText>
        <HyText> Nom : {currentUser?.name}</HyText>
        <HyText variant="title" weight="bold">
          A venir :
        </HyText>
        {eventsBooked && <HyEventsList events={eventsBooked} />}
        <HyText variant="title" weight="bold">
          Mes evenements :
        </HyText>
        {myEvents && <HyEventsList events={myEvents} admin />}
        <div className={style.signout}>
          <HyButton onClick={signOut}>Deconnexion</HyButton>
        </div>
      </GuardedPage>
    </Layout>
  );
};

export default Profil;
