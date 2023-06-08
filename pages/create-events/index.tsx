import React, { useContext, useEffect, useMemo, useState } from "react";
import Layout from "../../Layout";
import {
  HyText,
  HyButton,
  HyLabelInput,
  HySelectDropdown,
  HyCardEvent,
} from "../../index";
import styles from "./createevent.module.css";
import { createDocByCollection, getDocByCollection } from "../../lib/endpoints";
import { HyToggle } from "../../components/Molecules/HyToggle";
import { AuthContext } from "../_app";
import dynamic from "next/dynamic";
import router from "next/router";

type TCategory = {
  id: number;
  name: string;
};

const HyAutoLocation = dynamic(
  () => import("../../components/Atoms/HyAutoLocation"),
  {
    ssr: false,
  }
);

const CreateEvents = () => {
  const [hasLimitParticipant, setHasLimitParticipant] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  
  const [categories, setCategories] = useState<any>();
  
  const [selectedCategory, setSelectedCategory] = useState<TCategory>();
  const [title, setTitle] = useState("");
  const [decscription, setDecscription] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [price, setPrice] = useState(0);

  const colorPickerBg = ["FFA9DC", "FFE993", "9DD9F4", "E8CABB", "FCAA51"];

  const randomColor =
    colorPickerBg[Math.floor(Math.random() * (4 - 0 + 1)) + 0];

  const useAuthContext = useContext(AuthContext);

  const { currentUser } = useAuthContext;

  useEffect(() => {
    async function fetchData() {
      setCategories(await getDocByCollection("categories"));
    }
    fetchData();
  }, []);

  useMemo(() => {
    categories && setSelectedCategory(categories[0]);
  }, [categories]);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    const formData = { title, decscription };
    // const [formData, setFormData] = useState({
    //   name: "",
    //   email: "",
    //   message: ""
    // });
    // const handleInput = (e) => {
    //   const fieldName = e.target.name;
    //   const fieldValue = e.target.value;

    //   setFormData((prevState) => ({
    //     ...prevState,
    //     [fieldName]: fieldValue
    //   }));
    // }
    createDocByCollection("events", {
      title: title,
      description: decscription,
      location: location,
      city: city,
      date: date,
      price: price && isPaying ? price : 0,
      capacity: capacity ? capacity : 0,
      organizer: currentUser.id,
      category: selectedCategory && selectedCategory.name,
      guest: [],
      bgColor: randomColor,
      isCanceled: false,
    });
    router.push("/events");
  };

  return (
    <Layout title="crée ton evenement" isGuarded>
      <div className={styles.pagecreate}>
        <div className={styles.leftcontent}>
          <HyCardEvent
            id={"0"}
            title={title}
            date={date}
            price={price && isPaying ? price : 0}
            guest={[]}
            capacity={capacity && hasLimitParticipant ? capacity : 0}
            location={location}
            city={city}
            organizer={""}
            handleClick={undefined}
            bgColor={colorPickerBg[0]}
            isDisabled={true}
          />
        </div>
        <div className={styles.rightcontent}>
          <HyText variant="title">Crée ton evenement !</HyText>
          <form className={styles.form} onSubmit={handleFormSubmit}>
            <HyLabelInput
              value={title}
              setValue={setTitle}
              label="Titre"
              type="text"
            />
            <HyLabelInput
              value={decscription}
              setValue={setDecscription}
              label="decscription"
              type="text"
            />
            {/* {typeof document !== "undefined" && (
              <AddressAutofill accessToken="pk.eyJ1IjoibGhldW1lbGwiLCJhIjoiY2xpa2R5dzZkMDB6aTNzbXA5b2FoNGFqdSJ9.-iWQMwxxd0WH4gTATYgIpA">
                <HyLabelInput
                  label="Addresse"
                  type="text"
                  value={location}
                  setValue={setLocation}
                  autoComplete="address-line1"
                />
              </AddressAutofill>
            )} */}
            <HyAutoLocation value={location} setValue={setLocation} />
            <HyLabelInput
              label="Ville"
              type="text"
              value={city}
              setValue={setCity}
              autoComplete="address-level2"
            />
            <div>
              <HyToggle
                value={hasLimitParticipant}
                setValue={setHasLimitParticipant}
              />
              <HyLabelInput
                isDisabled={!hasLimitParticipant}
                value={capacity}
                setValue={setCapacity}
                label="Nombre max. de participants"
                type="number"
              />
            </div>
            <div>
              <HyToggle value={isPaying} setValue={setIsPaying} />
              <HyLabelInput
                isDisabled={!isPaying}
                value={price}
                setValue={setPrice}
                label="Prix"
                type="number"
              />
            </div>
            <HyLabelInput
              value={date}
              setValue={setDate}
              label="Date"
              type="date"
            />
            <HySelectDropdown
              items={categories}
              selectedItem={selectedCategory}
              setSelectedItem={setSelectedCategory}
            />
            {/* <HyLabelInput //Faire un multi select
              value={category}
              setValue={setCategory}
              label="Categories"
              type="text"
            /> */}
            <div className={styles.button}>
              <HyButton onClick={() => {}}>Créer</HyButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateEvents;
