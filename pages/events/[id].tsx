import { useRouter } from "next/router";
import { findDocById } from "../../lib/endpoints";
import { useEffect, useMemo, useState } from "react";
import { HyText } from "../../components/Atoms/HyText";
import Layout from "../../Layout";
import { HyIcon, Loader } from "../..";
import arrowLeft from "../../assets/arrow-left.png";
import styles from "./events.module.css";

const Event = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState<any>();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    async function fetchData() {
      id && setEvent(await findDocById("events", id));
    }
    fetchData();
    setIsLoading(false);
  }, [id]);

  const remainingSpaces = useMemo(() => {
    return event && event.capacity - event.guest.length;
  }, [event]);

  const goBack = () => {
    router.push("/events");
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
            <HyText variant="title">{event.title}</HyText>
            <HyText weight="bold" color="secondary">
              Description : {event.description}
            </HyText>
            <HyText>Prix : {event.price} €</HyText>
            <HyText>{event.category}</HyText>
            <HyText>Organisateur : {event.organizer}</HyText>
            <HyText>{event.bgColor}</HyText>
            <HyText>Date : {event.date}</HyText>
            <HyText>Il reste {remainingSpaces} place(s)</HyText>
          </div>
        </Layout>
      )}
    </>
  );
};

export default Event;
