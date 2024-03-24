import { Link } from "react-router-dom";

interface CardProps {
  item: {
    raceId: number;
    name: string;
    image: string;
    addressDto: {
      city: string;
    };
  };
}

function Card({ item }: CardProps) {
  console.log(item);
  const { raceId, name, image, addressDto } = item;
  const { city } = addressDto;
  console.log(raceId);
  console.log(city);
  return (
    <div className="shadow-lg rounded-lg p-3 flex flex-col justify-between border border-deepBlack overflow-hidden m-4">
      <img src={image} alt="" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 mb-2">Available Seats: {city}</p>
        <p className="text-gray-600 mb-2">Available Seats: {city}</p>
        <div className="text-center mt-2">
          <Link to={`/races/${raceId}`}>
            <button className="w-full px-2 py-2 mt-2">Pokaż szczegóły</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
