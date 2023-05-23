import { useRouter } from "next/router";
import { findDocById } from "../../lib/endpoints";
import { useEffect, useState } from "react";
import { HyText } from "../../components/Atoms/HyText";
import Layout from "../../Layout";

const Event = () => {
  const [event, setEvent] = useState<any>();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    async function fetchData() {
      id && setEvent(await findDocById("events", id));
    }
    fetchData();
  }, [id]);

  const goBack = () => {
    router.push("/events");
  };

  return (
    <>
      {event && (
        <Layout>
          <div onClick={goBack}>backlink</div>
          <HyText>{event.title}</HyText>
          <HyText>{event.description}</HyText>
          <HyText>{event.price}</HyText>
        </Layout>
      )}
    </>
  );
};

export default Event;
