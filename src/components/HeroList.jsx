import { useEffect, useState } from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

export default function HeroList() {
  const [roles, setRoles] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(1);
  const [activeRoleId, setActiveRoleId] = useState(1);

  // Fetch roles
  useEffect(() => {
    const fetchRoles = async () => {
      const url = "https://unofficial-mobile-legends.p.rapidapi.com/roles";
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
        setRoles(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoles();
  }, []);

  // Fetch heroes
  useEffect(() => {
    const fetchHeroes = async () => {
      if (!selectedRoleId) return;

      const url = `https://unofficial-mobile-legends.p.rapidapi.com/roles/${selectedRoleId}`; // Asegúrate de que esta URL sea correcta
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

  return (
    <section className="w-full my-5">
      {/* Bar */}
      <nav className="flex justify-center items-center gap-2 mb-5">
        <Button
          onClick={() => {
            setSelectedRoleId(1);
            setActiveRoleId(1);
          }}
          className={`hover:bg-blue-500 rounded-md px-5 py-2 ${
            activeRoleId === 1 ? "bg-blue-500" : ""
          }`}
        >
          ALL
        </Button>
        {roles.map((role) => (
          <Button
            key={role.id}
            onClick={() => {
              setSelectedRoleId(role.label);
              setActiveRoleId(role.label);
            }}
            className={`hover:bg-blue-500 rounded-md px-5 py-2 ${
              activeRoleId === role.label ? "bg-blue-500" : ""
            }`}
          >
            {role.label}
          </Button>
        ))}
      </nav>

      <hr />

      {/* Heroes List */}
      <Card isFooterBlurred radius="lg" className="grid grid-cols-7 gap-2 mt-5">
        {heroes.map((hero) => (
          <div key={hero.heroid} className="relative">
            <Image
              src={hero.key}
              alt={hero.name}
              height={200}
              width={200}
              className="object-cover rounded-lg"
            />
            <CardFooter className="absolute bottom-0 left-0 right-0 z-10 bg-black/50 border border-white/20 text-white/80 font-bold rounded-b-lg p-1">
              {hero.name}
            </CardFooter>
          </div>
        ))}
      </Card>
    </section>
  );
}
