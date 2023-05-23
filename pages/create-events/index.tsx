import React, { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../Layout";
import { HyText, HyButton, HyLabelInput, HySelectDropdown } from "../../index";
import styles from "./createevent.module.css";
import { createDocByCollection, getDocByCollection } from "../../lib/endpoints";
import { HyToggle } from "../../components/Molecules/HyToggle";
import { AuthContext } from "../_app";

const CreateEvents = () => {
  const [hasLimitParticipant, setHasLimitParticipant] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState();

  const [categories, setCategories] = useState<any>();

  const [title, setTitle] = useState("");
  const [decscription, setDecscription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

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
      decscription: decscription,
      location: location,
      date: date,
      price: price ? price : 0,
      capacity: capacity ? capacity : 0,
      organizer: currentUser.id,
      category: selectedCategory,
      guest: [],
    });
  };

  return (
    <Layout title="crée ton evenement">
      <div className={styles.pagecreate}>
        <div className={styles.leftcontent}></div>
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
            <HyLabelInput
              value={location}
              setValue={setLocation}
              label="Lieux"
              type="text"
            />
            <HyLabelInput
              value={date}
              setValue={setDate}
              label="Date"
              type="text"
            />
            <div>
              <HyToggle
                label="Limitation de participant ?"
                value={hasLimitParticipant}
                setValue={setHasLimitParticipant}
              />
              {hasLimitParticipant && (
                <HyLabelInput
                  value={capacity}
                  setValue={setCapacity}
                  label="Nombre max. de participants"
                  type="number"
                />
              )}
            </div>
            <div>
              <HyToggle
                label="Payant ?"
                value={isPaying}
                setValue={setIsPaying}
              />
              {isPaying && (
                <HyLabelInput
                  value={price}
                  setValue={setPrice}
                  label="Prix"
                  type="number"
                />
              )}
            </div>
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
