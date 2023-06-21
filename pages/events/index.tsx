import React from "react";
import { HyText, HyEventsList, HyTabs, Loader } from "../../index";
import Layout from "../../Layout";
import { useState, useEffect } from "react";
import { getDocByCollection } from "../../lib/endpoints";

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [events, setEvents] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setEvents(await getDocByCollection("events"));
      setCategories(await getDocByCollection("categories"));
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (events.length > 0 && categories.length > 0) setIsLoading(false);
  }, [categories, events]);

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };

  const filteredEvents =
    selectedCategory === "all"
      ? events
      : events.filter((event: any) => event.category === selectedCategory);

  if (isLoading) {
    return <Loader />;
  }

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
          <HyEventsList events={filteredEvents} filter="activeEvents" />
        </Layout>
      )}
    </>
  );
};
export default Events;
