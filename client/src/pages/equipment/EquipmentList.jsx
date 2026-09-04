// // This handles the GET /api/equipment

// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../services/api";
// import EquipmentCard from "../../components/EquipmentCard";
// import { gsap } from "gsap";
// import Heading from "../../components/Heading/Heading";

// const EquipmentList = () => {
//   const [equipment, setEquipment] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const headerRef = useRef();
//   const cardsRef = useRef();

//   const categories = [
//     "All",
//     "Tractor",
//     "Harvester",
//     "Rotavator",
//     "Cultivator",
//     "Seeder",
//     "Tiller",
//     "Thresher",
//     "Sprayer",
//     "Pump",
//     "Other",
//   ];

//   useEffect(() => {
//     gsap.from(headerRef.current, {
//       y: -50,
//       opacity: 0,
//       duration: 1,
//       ease: "power3.out",
//     });

//     gsap.from(cardsRef.current, {
//       y: 50,
//       opacity: 0,
//       duration: 1,
//       ease: "power3.out",
//     });
//   }, []);

//   const fetchEquipment = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.get("/equipment");

//       setEquipment(response.data.equipment || []);
//     } catch (error) {
//       console.error(error);

//       setError(error.response?.data?.message || "Failed to load machinery");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEquipment();
//   }, []);

//   const filteredEquipment =
//     selectedCategory === "All"
//       ? equipment
//       : equipment.filter(
//           (item) =>
//             item.category?.toLowerCase() === selectedCategory.toLowerCase(),
//         );

//   return (
//     <div className="min-h-screen bg-linear-to-b from-green-50  to-yellow-200 px-4 py-10">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         {/* <div ref={headerRef} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//           <div>
//             <Heading highlight="Find" heading="Machinery"/>
//           </div>

//           <Link
//             to="/add-equipment"
//             className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg text-center"
//           >
//             + List Your Machinery
//           </Link>
//         </div> */}

//         <div className="mb-3">
//           <Heading highlight="Find" heading="Machinery" />
//         </div>
//         {/* Category Filter */}
//         <div className="mb-8 overflow-x-auto">
//           <div className="flex gap-3 min-w-max">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 type="button"
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-5 py-2.5 rounded-full border transition font-medium ${
//                   selectedCategory === category
//                     ? "bg-green-600 text-white border-green-600"
//                     : "bg-white text-gray-700 border-gray-200 hover:border-green-500 hover:text-green-600"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Loading */}
//         {loading && (
//           <div className="text-center py-20 text-gray-500">
//             Loading machinery...
//           </div>
//         )}

//         {/* Error */}
//         {!loading && error && (
//           <div className="text-center py-20">
//             <p className="text-red-500 mb-4">{error}</p>

//             <button
//               onClick={fetchEquipment}
//               className="px-5 py-2 bg-green-600 text-white rounded-lg"
//             >
//               Try Again
//             </button>
//           </div>
//         )}

//         {/* Empty */}
//         {!loading && !error && equipment.length === 0 && (
//           <div className="bg-white rounded-2xl border p-10 text-center">
//             <div className="text-6xl mb-4">🚜</div>

//             <h2 className="text-xl font-semibold">No machinery listed yet</h2>

//             <p className="text-gray-500 mt-2">
//               Be the first person to list agricultural machinery.
//             </p>

//             <Link
//               to="/add-equipment"
//               className="inline-block mt-5 bg-green-600 text-white px-5 py-2.5 rounded-lg"
//             >
//               Add Machinery
//             </Link>
//           </div>
//         )}

//         {/* Cards */}
//         {!loading && !error && equipment.length > 0 && (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {equipment.map((item) => (
//               <EquipmentCard key={item._id} equipment={item} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EquipmentList;

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import EquipmentCard from "../../components/EquipmentCard";
import { gsap } from "gsap";
import Heading from "../../components/Heading/Heading";

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const headerRef = useRef();
  const cardsRef = useRef();

  const categories = [
    "All",
    "Tractor",
    "Harvester",
    "Rotavator",
    "Cultivator",
    "Seeder",
    "Tiller",
    "Thresher",
    "Sprayer",
    "Pump",
    "Other",
  ];

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(cardsRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/equipment");

      setEquipment(response.data.equipment || []);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message || "Failed to load machinery"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  // Filter equipment
  const filteredEquipment =
    selectedCategory === "All"
      ? equipment
      : equipment.filter(
          (item) =>
            item.category?.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-yellow-200 px-4 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-6">
          <Heading highlight="Find" heading="Machinery" />
        </div>

        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full border transition font-medium ${
                  selectedCategory === category
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-700 border-gray-200 hover:border-green-500 hover:text-green-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-gray-500">
            Loading machinery...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>

            <button
              onClick={fetchEquipment}
              className="px-5 py-2 bg-green-600 text-white rounded-lg"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty - no equipment at all */}
        {!loading && !error && equipment.length === 0 && (
          <div className="bg-white rounded-2xl border p-10 text-center">
            <div className="text-6xl mb-4">🚜</div>

            <h2 className="text-xl font-semibold">
              No machinery listed yet
            </h2>

            <p className="text-gray-500 mt-2">
              Be the first person to list agricultural machinery.
            </p>

            <Link
              to="/add-equipment"
              className="inline-block mt-5 bg-green-600 text-white px-5 py-2.5 rounded-lg"
            >
              Add Machinery
            </Link>
          </div>
        )}

        {/* No equipment in selected category */}
        {!loading &&
          !error &&
          equipment.length > 0 &&
          filteredEquipment.length === 0 && (
            <div className="bg-white rounded-2xl border p-10 text-center">
              <div className="text-5xl mb-4">🚜</div>

              <h2 className="text-xl font-semibold">
                No {selectedCategory} machinery found
              </h2>

              <p className="text-gray-500 mt-2">
                There are currently no machines listed in this category.
              </p>
            </div>
          )}

        {/* Cards */}
        {!loading &&
          !error &&
          filteredEquipment.length > 0 && (
            <div
              ref={cardsRef}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredEquipment.map((item) => (
                <EquipmentCard
                  key={item._id}
                  equipment={item}
                />
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default EquipmentList;