import { HyButton, HyIcon, HyText } from "../../..";

import styles from "./HyCardEvent.module.css";
import concert from "../../../assets/concert.png";
import { useCallback, useContext } from "react";
import { AuthContext } from "../../../pages/_app";

type THyCardEvent = {
  id: string;
  title: string;
  date: string;
  price: number;
  guest: string[];
  capacity: number;
  location: string;
  organizer: string;
  handleClick: any;
};

export const HyCardEvent = (props: THyCardEvent) => {
  const {
    id,
    title,
    date,
    price,
    capacity,
    guest,
    location,
    handleClick,
    organizer,
  } = props;

  const useAuthContext = useContext(AuthContext);

  const { currentUser } = useAuthContext;

  const isEventInEventsBook = useCallback(() => {
    return (
      currentUser && currentUser.eventsBook.find((event: any) => event === id)
    );
  }, [currentUser, id]);

  const isCurrentUserOrganizer = useCallback(() => {
    return currentUser && currentUser.id === organizer;
  }, [currentUser, organizer]);

  const isEventFull = useCallback(() => {
    console.log(guest.length, capacity);
    return guest.length === capacity;
  }, [capacity, guest.length]);

  const BookContent = () => {
    if (isCurrentUserOrganizer()) return "Vous etes l'organisateur";
    else if (isEventInEventsBook()) return "deja inscrit";
    else if (isEventFull()) return "complet :/";
    else return <HyButton onClick={onClick}>Book now</HyButton>;
  };

  const onClick = () => {
    handleClick(id, guest);
  };

  return (
    <div className={styles.card} key={id}>
      <div className={styles.imagecontent}>
        <HyText variant="subheading" classes={styles.date}>
          {date}
        </HyText>
        <HyIcon classes={styles.image} icon={concert} size="350" />
      </div>
      <div className={styles.title}>
        <HyText weight="bold">{title}</HyText>
        <HyText variant="subheading" color="secondary">
          {location}
        </HyText>
      </div>
      <div className={styles.price}>
        <HyText>{price} €/Pers.</HyText>
      </div>
      <div className={styles.people}>
        <HyText>
          {guest.length}/{capacity} invités
        </HyText>
      </div>
      <div className={styles.button}>
        <BookContent />
      </div>
    </div>
  );
};
