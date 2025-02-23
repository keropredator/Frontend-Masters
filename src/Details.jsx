import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import fetchPet from "./fetchPets";

const Details = () => {
  const { id } = useParams();
  // console.log(id);
  const results = useQuery({
    queryKey: ["details", id],
    queryFn: fetchPet,
  });

  // console.log(results);
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">😗</h2>
      </div>
    );
  }
  if (results.isError) {
    return <h1>Something went wrong</h1>;
  }
  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button>Adopt {pet.name}</button>
          <p>{pet.description}</p>
        </h2>
      </div>
    </div>
  );
};

export default Details;
