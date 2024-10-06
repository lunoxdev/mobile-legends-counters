import { useEffect, useState } from "react";

export default function HeroList() {
  const [roles, setRoles] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(1);

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
    <section>
      <h2>Roles</h2>
      {roles.map((role) => (
        <button key={role.id} onClick={() => setSelectedRoleId(role.label)}>
          {role.label}
        </button>
      ))}
      <h2>Héroes</h2>
      {heroes.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </section>
  );
}
