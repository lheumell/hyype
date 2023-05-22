import React from "react";
import { HyText, HyEventsList, HyTabs } from "../../index";
import Layout from "../../Layout";
import { useState, useEffect } from "react";
import { getDocByCollection } from "../../lib/endpoints";

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [events, setEvents] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      setEvents(await getDocByCollection("events"));
      setCategories(await getDocByCollection("categories"));
    }
    fetchData();
  }, []);

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };

  const filteredEvents =
    selectedCategory === "all"
      ? events
      : events.filter((event: any) => event.category === selectedCategory);

  return (
    <>
      {categories && filteredEvents && (
        <Layout title="Tous les evenements">
          <HyText variant="title">Events</HyText>
          <HyTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          <HyEventsList events={filteredEvents} />
        </Layout>
      )}
    </>
  );
};
export default Events;
