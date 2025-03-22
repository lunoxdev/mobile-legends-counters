import { useEffect, useState } from "react";

// Función para eliminar etiquetas HTML
function stripHTML(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.body.textContent || "";
}

export default function HeroDetails({ selectedHeroId }) {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      if (!selectedHeroId) return;

      const url = `https://unofficial-mobile-legends.p.rapidapi.com/heroes/${selectedHeroId}`;
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
        setHero(data.data);
      } catch (error) {
        console.error("Error while fetching hero details:", error);
      }
    };

    fetchHero();
  }, [selectedHeroId]);

  if (!hero) {
    return <p>Loading hero details...</p>;
  }

  return (
    <article className="overflow-auto h-dvh mt-4">
      <div className="flex flex-row h-auto w-full mx-auto">
        <img
          src={hero.cover_picture}
          alt={`Cover image of ${hero.name || "N/A"}`}
          className="w-1/3 h-[200px] object-cover mr-4"
        />

        <div className="flex flex-col w-full">
          <h2 className="text-3xl font-bold">{hero.name || "N/A"}</h2>
          <p className="text-[#7890B3]">{hero.type || "N/A"}</p>
          <ul className="flex w-full gap-4 mt-4">
            <li>
              ⚔️ Physical: <strong>{hero.phy || "N/A"}</strong>
            </li>
            <li>
              🪄 Magic: <strong>{hero.mag || "N/A"}</strong>
            </li>
            <li>
              ❤️ Life: <strong>{hero.alive || "N/A"}</strong>
            </li>
            <li>
              🧠 Difficulty: <strong>{hero.diff || "N/A"}</strong>
            </li>
          </ul>

          <div className="flex w-full h-full justify-between items-end">
            <div className="flex w-full h-auto items-center">
              <img
                src={hero.counters.best.icon || "N/A"}
                alt={`Hero Counter Image ${hero.counters.best.name || "N/A"}`}
                width={70}
                height={70}
                className="rounded-full"
              />
              <div className="flex flex-col ml-4">
                <p className="text-sm text-[#7890B3]">Ideal Combo</p>
                <p>{hero.counters.best.name || "N/A"}</p>
              </div>
            </div>
            <div className="flex w-full h-auto items-center">
              <img
                src={hero.counters.counters.icon || "N/A"}
                alt={`Hero Counter Image ${
                  hero.counters.counters.name || "N/A"
                }`}
                width={70}
                height={70}
                className="rounded-full"
              />
              <div className="flex flex-col ml-4">
                <p className="text-sm text-[#7890B3]">Counter</p>
                <p>{hero.counters.counters.name || "N/A"}</p>
              </div>
            </div>
            <div className="flex w-full h-auto items-center">
              <img
                src={hero.counters.countered.icon || "N/A"}
                alt={`Hero Counter Image ${
                  hero.counters.countered.name || "N/A"
                }`}
                width={70}
                height={70}
                className="rounded-full"
              />
              <div className="flex flex-col ml-4">
                <p className="text-sm text-[#7890B3]">Countered</p>
                <p>{hero.counters.countered.name || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-col w-full h-auto mt-4 mb-20">
        <h3 className="text-2xl font-bold">Skills</h3>
        {hero.skill.skill.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-row items-center justify-between w-full h-full gap-0 mt-2"
          >
            <div className="flex w-20 h-auto justify-center items-center mx-auto">
              <img
                src={skill.icon}
                alt={`Icono de ${skill.name}`}
                width={50}
                height={50}
                className="flex w-14"
              />
            </div>
            <div className="flex flex-col w-full p-2">
              <h4 className="text-lg font-bold">{skill.name}</h4>
              <p className="text-sm text-[#7890B3]">
                {/* Aplicamos stripHTML aquí */}
                {stripHTML(skill.des)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* <section className="mt-4">
        <h3>Equipamiento</h3>
        <ul>
          {hero.gear.out_pack.map((item) => (
            <li key={item.equipment_id}>
              <h4>{item.equip.name}</h4>
              <Image
                src={item.equip.icon}
                alt={`Icono de ${item.equip.name}`}
                width={50}
                height={50}
              />
              <p>{item.equip.des.join(" ")}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-4">
        <h3>Contadores</h3>
        <p>Mejor compañero: {hero.counters.best.name || "N/A"}</p>
        <p>Contrarresta a: {hero.counters.counters.name || "N/A"}</p>
        <p>Contrarrestado por: {hero.counters.countered.name || "N/A"}</p>
      </section> */}
    </article>
  );
}
