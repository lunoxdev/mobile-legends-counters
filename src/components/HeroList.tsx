import { useEffect, useState } from "react";
import HeroDetails from "./HeroDetails";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "motion/react";
import { type Hero, type HeroApiResponse } from "../types";

export default function HeroList() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<string>("ALL");
  const [activeRoleId, setActiveRoleId] = useState<string>("ALL");
  const [selectedHeroId, setSelectedHeroId] = useState<string>(null);

  const roles = [
    { id: "ALL", name: "ALL" },
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

      const url =
        selectedRoleId === "ALL"
          ? "https://unofficial-mobile-legends.p.rapidapi.com/heroes"
          : `https://unofficial-mobile-legends.p.rapidapi.com/roles/${selectedRoleId}`;

      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": import.meta.env.PUBLIC_RAPIDAPI_KEY,
          "x-rapidapi-host": import.meta.env.PUBLIC_RAPIDAPI_HOST,
        },
      };

      try {
        const response = await fetch(url, options);
        const data: HeroApiResponse = await response.json();
        setHeroes(data.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHeroes();
  }, [selectedRoleId]);

  const handleRoleClick = (roleId: string) => {
    setSelectedRoleId(roleId);
    setActiveRoleId(roleId);
    setSelectedHeroId(null);
  };

  const handleHeroClick = (heroId: string) => {
    setSelectedHeroId(heroId);
  };

  return (
    <section>
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
          {heroes
            .slice()
            .reverse()
            .map((hero, index) => (
              <motion.div
                key={hero.heroid}
                className="relative overflow-hidden h-auto rounded-lg hover:shadow-md hover:shadow-[#98FFFF]"
                onClick={() => handleHeroClick(hero.heroid)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.02,
                  duration: 0.3,
                  ease: "easeIn",
                }}
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
              </motion.div>
            ))}
        </div>
      )}
    </section>
  );
}
