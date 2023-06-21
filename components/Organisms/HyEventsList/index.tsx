import { useContext, useEffect, useMemo, useState } from "react";
import { HyCardEvent } from "../../../index";

import styles from "./HyEventsList.module.css";
import { AuthContext } from "../../../pages/_app";
import { updateDocByCollection } from "../../../lib/endpoints";

interface IHyEventsList {
  events: Tevent[];
  isAdminCard?: boolean;
  filter?: "activeEvents" | "canceledEvents";
  disabledList?: boolean;
}

type Tevent = {
  id: string;
  title: string;
  date: string;
  description: string;
  price: number;
  guest: string[];
  location: string;
  city: string;
  organizer: string;
  capacity: number;
  bgColor: string;
  image: string;
  isCanceled: boolean;
  isDisabled: boolean;
};

export const HyEventsList = (props: IHyEventsList) => {
  const { events, isAdminCard, filter, disabledList } = props;

  const eventsFiltered = useMemo(() => {
    if (filter === "activeEvents")
      return events.filter((event) => !event.isCanceled);
    if (filter === "canceledEvents")
      return events.filter((event) => event.isCanceled);
    return events;
  }, [events, filter]);

  const useAuthContext = useContext(AuthContext);

  const { currentUser, setCurrentUser } = useAuthContext;

  const handleClick = async (id: any, guest: any) => {
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
      {eventsFiltered.map((event) => (
        <HyCardEvent
          key={event.id}
          id={event.id}
          title={event.title}
          date={event.date}
          price={event.price}
          guest={event.guest}
          capacity={event.capacity}
          location={event.location}
          city={event.city}
          organizer={event.organizer}
          handleClick={handleClick}
          isAdminCard={isAdminCard}
          bgColor={event.bgColor}
          image={event.image}
          isDisabled={disabledList}
        />
      ))}
    </ul>
  );
};
