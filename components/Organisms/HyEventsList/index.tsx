import { useContext, useEffect, useState } from "react";
import { HyCardEvent } from "../../../index";

import styles from "./HyEventsList.module.css";
import { AuthContext } from "../../../pages/_app";
import { updateDocByCollection } from "../../../lib/endpoints";

interface IHyEventsList {
  events: Tevent[];
  isAdminCard?: boolean;
}

type Tevent = {
  //TEventCard en fait clean code
  id: string;
  title: string;
  date: string;
  description: string;
  price: number;
  guest: string[];
  location: string;
  organizer: string;
  capacity: number;
  bgColor: string;
};

export const HyEventsList = (props: IHyEventsList) => {
  const { events, isAdminCard } = props;

  const useAuthContext = useContext(AuthContext);

  const { currentUser, setCurrentUser } = useAuthContext;

  const handleClick = (id: any, guest: any) => {
    const updateData = {
      eventsBook: [...currentUser.eventsBook, id],
    };
    const updateDataEvent = {
      guest: [...guest, currentUser.id],
    };
    updateDocByCollection("users", updateData, currentUser.id);
    updateDocByCollection("events", updateDataEvent, id);
    setCurrentUser({
      ...currentUser,
      eventsBook: [...currentUser.eventsBook, id],
    });
  };

  return (
    <ul className={styles.list}>
      {events.map((event) => (
        <HyCardEvent
          key={event.id}
          id={event.id}
          title={event.title}
          date={event.date}
          price={event.price}
          guest={event.guest}
          capacity={event.capacity}
          location={event.location}
          organizer={event.organizer}
          handleClick={handleClick}
          isAdminCard={isAdminCard}
          bgColor={event.bgColor}
        />
      ))}
    </ul>
  );
};
