import { HyButton, HyIcon, HyText, HyModal } from "../../..";

import styles from "./HyCardEvent.module.css";
import concert from "../../../assets/concert.png";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../pages/_app";
import router from "next/router";

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
  admin: boolean;
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
    admin,
  } = props;

  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (event: any) => {
    event.stopPropagation();
    setIsOpen(true);
  };

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
    return guest.length === capacity;
  }, [capacity, guest.length]);

  const EventPrice = () => {
    return price == 0 ? (
      <HyText>Gratuit</HyText>
    ) : (
      <HyText>{price} €/Pers.</HyText>
    );
  };

  const EventCapacity = () => {
    return capacity == 0 ? (
      <HyText>illimité</HyText>
    ) : (
      <HyText>
        {guest.length}/{capacity} invités
      </HyText>
    );
  };

  const BookContent = () => {
    if (isCurrentUserOrganizer())
      return <HyText>Vous etes l'organisateur</HyText>;
    else if (isEventInEventsBook()) return <HyText>deja inscrit</HyText>;
    else if (isEventFull()) return <HyText>complet :/</HyText>;
    else return <HyButton onClick={onClick}>Book now</HyButton>;
  };

  const onClick = () => {
    handleClick(id, guest);
  };

  const goToEvent = () => {
    router.push("/events/" + id);
  };

  return (
    <div onClick={goToEvent} className={styles.card} key={id}>
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
        <EventPrice />
      </div>
      <div className={styles.people}>
        <EventCapacity />
      </div>
      <div className={styles.button}>
        {admin ? (
          <HyModal
            buttonName="modifier"
            isOpen={isOpen}
            openModal={openModal}
            closeModal={closeModal}
          >
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Your payment has been successfully submitted. We’ve sent you an
                email with all of the details of your order.
              </p>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Got it, thanks!
              </button>
            </div>
          </HyModal>
        ) : (
          <BookContent />
        )}
      </div>
    </div>
  );
};
