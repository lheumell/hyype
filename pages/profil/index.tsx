import { HyButton, HyEventsList, HyText, Loader, NoResult } from "../..";
import { signOut } from "firebase/auth";
import Layout from "../../Layout";
import GuardedPage from "../../components/GuardedPage";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../_app";
import { findDocById, getDocByCollectionWhere } from "../../lib/endpoints";
import style from "./profil.module.css";
import { useAuth } from "reactfire";

type TEvent = {
  id: string;
  title?: string;
  date?: string;
  description?: string;
  price?: number;
  guest?: string[];
  location?: string;
  city?: string;
  organizer?: string;
  capacity?: number;
  bgColor?: string;
};

const Profil = () => {
  const [myEvents, setMyEvents] = useState<any[]>();
  const [eventsBooked, setEventsBooked] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const useAuthContext = useContext(AuthContext);

  const { currentUser } = useAuthContext;

  useEffect(() => {
    async function fetchData() {
      currentUser &&
        currentUser.id &&
        setMyEvents(
          await getDocByCollectionWhere(
            "events",
            "organizer",
            "==",
            currentUser.id
          )
        );
      if (
        currentUser &&
        Array.isArray(currentUser.eventsBook) &&
        currentUser.eventsBook.length > 0
      ) {
        const eventsPromises =
          currentUser &&
          currentUser.eventsBook &&
          currentUser.eventsBook.map(async (eventId: any) => {
            const event = await findDocById("events", eventId);
            return event;
          });
        const events: TEvent[] = await Promise.all(eventsPromises);
        const activeEvents = events.filter((event) => {
          event.title;
        });
        setEventsBooked(activeEvents);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [currentUser]);

  const auth = useAuth();

  const onSignOutRequested = useCallback(() => {
    return signOut(auth);
  }, [auth]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout title="profil" isGuared>
      <GuardedPage whenSignedOut="/auth/sign-in">
        <HyText variant="title" weight="bold">
          Mes informations :
        </HyText>
        <HyText> Email : {currentUser?.email}</HyText>
        <HyText> Nom : {currentUser?.name}</HyText>
        <HyText variant="title" weight="bold">
          A venir :
        </HyText>
        {eventsBooked && eventsBooked.length > 0 ? (
          <HyEventsList events={eventsBooked} />
        ) : (
          <NoResult />
        )}
        <HyText variant="title" weight="bold">
          Mes evenements :
        </HyText>
        {myEvents && myEvents?.length > 0 ? (
          <HyEventsList events={myEvents} isAdminCard filter="activeEvents" />
        ) : (
          <NoResult />
        )}
        <HyText variant="title" weight="bold">
          Historique :
        </HyText>
        {myEvents && myEvents.length > 0 ? (
          <HyEventsList
            events={myEvents}
            disabledList
            filter="canceledEvents"
          />
        ) : (
          <NoResult />
        )}
        <div className={style.signout}>
          <HyButton onClick={onSignOutRequested}>Deconnexion</HyButton>
        </div>
      </GuardedPage>
    </Layout>
  );
};

export default Profil;
