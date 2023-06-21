import Router, { useRouter } from "next/router";
import { findDocById } from "../../lib/endpoints";
import { useContext, useEffect, useMemo, useState } from "react";
import { HyText } from "../../components/Atoms/HyText";
import Layout from "../../Layout";
import { HyIcon, HyLabelInput, Loader } from "../..";
import arrowLeft from "../../assets/arrow-left.png";
import styles from "./events.module.css";
import { AuthContext } from "../_app";

const Event = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState<any>();

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDecscription] = useState("");
  const [location, setLocation] = useState("");
  const [organizer, setOrganizer] = useState<any>();
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [price, setPrice] = useState(0);

  const router = useRouter();
  const { id } = router.query;

  const useAuthContext = useContext(AuthContext);

  const { currentUser } = useAuthContext;

  const isEventOfCurrentUser = useMemo(() => {
    return event && event.organizer === currentUser.id;
  }, [currentUser, event]);

  useEffect(() => {
    async function fetchData() {
      id && setEvent(await findDocById("events", id));
      event && setOrganizer(await findDocById("users", event.organizer));
    }
    fetchData();
    setIsLoading(false);
  }, [event, id]);

  useEffect(() => {
    if (!event) return;
    setTitle(event.title);
    setDecscription(event.description);
    setPrice(event.price);
    setCapacity(event.capacity);
  }, [event]);
  const remainingSpaces = useMemo(() => {
    return event && event.capacity - event.guest.length;
  }, [event]);

  const goBack = () => {
    Router.back();
  };

  const style: React.CSSProperties = {
    backgroundColor: event && `#${event.bgColor}`,
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {event && (
        <Layout>
          <div style={style} className={styles.eventpage}>
            <div onClick={goBack}>
              <HyIcon icon={arrowLeft} size="20" />
            </div>
            {isEventOfCurrentUser ? (
              <>
                <HyLabelInput
                  label={"title"}
                  value={title}
                  setValue={setTitle}
                  type={"text"}
                />
                <HyLabelInput
                  label={"description"}
                  value={description}
                  setValue={setDecscription}
                  type={"text"}
                />
                <HyLabelInput
                  label={"prix"}
                  value={price}
                  setValue={setPrice}
                  type={"number"}
                />

                <HyText>{event.category}</HyText>
                <HyText>Organisateur : {organizer && organizer.name}</HyText>
                <HyText>Date : {event.date}</HyText>
                <HyText>Il reste {remainingSpaces} place(s)</HyText>
              </>
            ) : (
              <>
                <HyText variant="title">{event.title}</HyText>
                <HyText weight="bold" color="secondary">
                  Description : {event.description}
                </HyText>
                <HyText>Prix : {event.price} €</HyText>
                <HyText>{category}</HyText>
                <HyText>Organisateur : {organizer && organizer.name}</HyText>
                <HyText>{event.bgColor}</HyText>
                <HyText>Date : {event.date}</HyText>
                <HyText>Il reste {remainingSpaces} place(s)</HyText>
              </>
            )}
          </div>
        </Layout>
      )}
    </>
  );
};

export default Event;
