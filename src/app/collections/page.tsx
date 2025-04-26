import CollectionsComponentPage from "./collections-component";

const CollectionsPage = async () => {
  // Simulate an async operation (e.g., fetching data)
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Example delay

  return (
    <div>
      <CollectionsComponentPage />
    </div>
  );
};

export default CollectionsPage;