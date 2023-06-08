import { HyButton, HyIcon, HyText, HyModal } from "../../..";

import styles from "./HyCardEvent.module.css";
import bg from "../../../assets/bg-first.png";
import deleteIcon from "../../../assets/delete.png";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../pages/_app";
import router from "next/router";
import { updateDocByCollection } from "../../../lib/endpoints";

type THyCardEvent = {
  id: string;
  title: string;
  date: string;
  price: number;
  guest: string[];
  capacity: number;
  location: string;
  city: string;
  organizer: string;
  handleClick: any;
  isAdminCard?: boolean;
  bgColor: string;
  isDisabled?: boolean;
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
    city,
    handleClick,
    organizer,
    isAdminCard,
    bgColor,
    isDisabled,
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
    if (capacity === 0) return;
    return guest && guest.length === capacity;
  }, [capacity, guest]);

  const EventPrice = () => {
    return price == 0 ? (
      <HyText>Gratuit</HyText>
    ) : (
      <HyText>{price} €/Pers.</HyText>
    );
  };

  const EventCapacity = () => {
    return capacity === 0 ? (
      <HyText>illimité</HyText>
    ) : (
      <HyText>
        {guest && guest.length}/{capacity} invités
      </HyText>
    );
  };

  const BookContent = () => {
    if (isCurrentUserOrganizer())
      return (
        <HyButton onClick={() => {}} variant="secondary" isDisabled>
          Vous etes l'organisateur
        </HyButton>
      );
    else if (isEventInEventsBook())
      return (
        <HyButton onClick={() => {}} variant="secondary" isDisabled>
          Inscrit
        </HyButton>
      );
    else if (isEventFull())
      return (
        <HyButton onClick={() => {}} variant="secondary" isDisabled>
          Complet :/
        </HyButton>
      );
    else return <HyButton onClick={onClick}>Se joindre</HyButton>;
  };
  const onClick = () => {
    handleClick(id, guest);
  };

  const goToEvent = () => {
    router.push("/events/" + id);
  };

  const style: React.CSSProperties = {
    backgroundColor: `#${bgColor}`,
  };

  const handleDeleteEvent = () => {
    const updateData = {
      isCanceled: true,
    };
    updateDocByCollection("users", updateData, currentUser.id);
    setIsOpen(false);
  };

  return (
    <div
      onClick={goToEvent}
      className={`${styles.card} ${isDisabled && styles.carddisabled} `}
      key={id}
    >
      {isAdminCard && (
        <HyModal
          buttonName={<HyIcon icon={deleteIcon} size={"20"}></HyIcon>}
          isOpen={isOpen}
          openModal={openModal}
          closeModal={closeModal}
          classes={styles.deletebutton}
          variantButton="error"
          withIcon
        >
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Voulez-vous vraiment supprimer cet evenement ?
            </p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={handleDeleteEvent}
            >
              Supprimer
            </button>
          </div>
        </HyModal>
      )}

      <div className={styles.imagecontent}>
        <HyText variant="subheading" classes={styles.date}>
          {date}
        </HyText>
        <div style={style} className={styles.bgimage}>
          <HyIcon classes={styles.image} icon={bg} size="350" />
        </div>
      </div>
      <div className={styles.title}>
        <HyText weight="bold" addStyle="truncate">
          {title}
        </HyText>
        <HyText variant="subheading" color="secondary" addStyle="truncate">
          {city}
        </HyText>
      </div>
      <div className={styles.price}>
        <EventPrice />
      </div>
      <div className={styles.people}>
        <EventCapacity />
      </div>
      <div className={styles.button}>
        {isAdminCard ? <></> : <BookContent />}
      </div>
    </div>
  );
};
