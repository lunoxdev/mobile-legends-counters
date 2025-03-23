import { useEffect, useState } from "react";
import HeroDetails from "./HeroDetails";

import toast, { Toaster } from "react-hot-toast";

export default function HeroList() {
  const [heroes, setHeroes] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(1);
  const [activeRoleId, setActiveRoleId] = useState(1);
  const [selectedHeroId, setSelectedHeroId] = useState(null);

  const roles = [
    { id: 1, name: "ALL" },
    { id: "Tank", name: "Tank" },
    { id: "Fighter", name: "Fighter" },
    { id: "Assassin", name: "Assassin" },
    { id: "Mage", name: "Mage" },
    { id: "Marksman", name: "Marksman" },
    { id: "Support", name: "Support" },
  ];

  useEffect(() => {
    const fetchHeroes = async () => {
      if (!selectedRoleId) return;

      // Show the toast with the "x" button to close
      toast(
        "Unfortunately, we don't manage the data, so it may not display sometimes.",
        {
          duration: 2000,
          style: {
            borderRadius: "10px",
            background: "#383f6f",
            color: "#f2f2f2",
            textSizeAdjust: "80%",
          },
        }
      );

      const url = `https://unofficial-mobile-legends.p.rapidapi.com/roles/${selectedRoleId}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": import.meta.env.PUBLIC_RAPIDAPI_KEY,
          "x-rapidapi-host": import.meta.env.PUBLIC_RAPIDAPI_HOST,
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setHeroes(data.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHeroes();
  }, [selectedRoleId]);

  const handleRoleClick = (roleId) => {
    setSelectedRoleId(roleId);
    setActiveRoleId(roleId);
    setSelectedHeroId(null);
  };

  const handleHeroClick = (heroId) => {
    setSelectedHeroId(heroId);
  };

  return (
    <section className="w-full">
      <Toaster position="top-right" reverseOrder={false} />
      <nav className="flex shrink-0">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => handleRoleClick(role.id)}
            className={`px-5 py-3 border-b-[0.1px] outline-none border-[#7890B3] text-[#7890B3] hover:text-[#f2f2f2] hover:bg-gradient-to-t hover:from-[#5C67B8] hover:to-[#5C67B8]/5 ${
              activeRoleId === role.id
                ? "border-b-2 border-[#98FFFF] bg-gradient-to-t from-[#5C67B8] to-[#5C67B8]/5 text-[#f2f2f2]"
                : ""
            }`}
          >
            {role.name}
          </button>
        ))}
      </nav>

      {/* Hero Details */}
      {selectedHeroId ? (
        <HeroDetails selectedHeroId={selectedHeroId} />
      ) : (
        <div className="grid grid-cols-6 lg:grid-cols-9 h-auto gap-3 pb-16 pt-4 pr-2 overflow-y-auto max-h-dvh">
          {heroes.map((hero) => (
            <div
              key={hero.heroid}
              className="relative overflow-hidden h-auto rounded-lg hover:shadow-md hover:shadow-[#98FFFF]"
              onClick={() => handleHeroClick(hero.heroid)}
            >
              <img
                src={hero.key}
                alt={hero.name}
                height={170}
                width={170}
                className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-[#292E52] via-[#292E52]/70 to-transparent px-2 pb-1 pt-10 text-sm justify-center">
                {hero.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
