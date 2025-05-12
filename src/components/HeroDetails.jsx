import { useEffect, useState } from "react";

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

  if (!hero) return <p>Loading hero details...</p>;

  return (
    <article className="overflow-auto h-dvh mt-4">
      <div className="flex flex-row h-auto w-full mx-auto">
        {hero.cover_picture && (
          <img
            src={hero.cover_picture}
            alt={`Cover image of ${hero.name || "N/A"}`}
            className="w-1/2 lg:w-1/2 h-[180px] lg:h-[230px] object-cover mr-4 rounded-md"
          />
        )}

        <div className="flex flex-col w-full">
          <h2 className="text-3xl font-bold">{hero.name || "N/A"}</h2>
          <p className="text-[#7890B3]">{hero.type || "N/A"}</p>
          <ul className="flex w-full gap-4 mt-4">
            <li>⚔️ Physical: <strong>{hero.phy || "N/A"}</strong></li>
            <li>🪄 Magic: <strong>{hero.mag || "N/A"}</strong></li>
            <li>❤️ Life: <strong>{hero.alive || "N/A"}</strong></li>
            <li>🧠 Difficulty: <strong>{hero.diff || "N/A"}</strong></li>
          </ul>

          <div className="flex w-full lg:w-2/3 h-full justify-between items-end">
            <div className="flex w-full h-auto items-center">
            {hero.counters?.best && (
              <div className="flex w-full h-auto items-center">
                <img
                  src={hero.counters.best.icon}
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
            )}
            {hero.counters?.counters && (
              <div className="flex w-full h-auto items-center">
                <img
                  src={hero.counters.counters.icon}
                  alt={`Hero Counter Image ${hero.counters.counters.name || "N/A"}`}
                  width={70}
                  height={70}
                  className="rounded-full"
                />
                <div className="flex flex-col ml-4">
                  <p className="text-sm text-[#7890B3]">Counter</p>
                  <p>{hero.counters.counters.name || "N/A"}</p>
                </div>
              </div>
            )}
            {hero.counters?.countered && (
              <div className="flex w-full h-auto items-center">
                <img
                  src={hero.counters.countered.icon}
                  alt={`Hero Counter Image ${hero.counters.countered.name || "N/A"}`}
                  width={70}
                  height={70}
                  className="rounded-full"
                />
                <div className="flex flex-col ml-4">
                  <p className="text-sm text-[#7890B3]">Countered</p>
                  <p>{hero.counters.countered.name || "N/A"}</p>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-col w-full h-auto my-4">
        <h3 className="text-2xl font-bold">Skills</h3>
        {hero.skill?.skill?.map((skill) => (
          skill?.icon && skill?.name ? (
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
                <p className="text-sm text-[#7890B3]">{stripHTML(skill.des)}</p>
              </div>
            </div>
          ) : null
        ))}

        {hero.skill?.item?.tips && (
          <span className="text-[#7890B3] p-4">
            <strong className="text-sm text-[#f2f2f2]">Tips: </strong>
            {stripHTML(hero.skill.item.tips)}
          </span>
        )}

        {hero.skill?.item?.battle_second?.icon && (
          <div className="flex flex-col w-full h-auto mt-4">
            <h4 className="font-semibold">Secondary Item</h4>
            <div className="flex flex-row w-full items-center space-x-4 p-2">
              <img
                src={hero.skill.item.battle_second.icon}
                width={50}
                height={50}
                className="flex w-14"
              />
              <p>
                <strong className="text-lg font-bold text-[#d3eb3b]">Recomended!</strong>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Gear */}
      <div className="flex flex-col w-full h-auto mt-4 mb-20">
        <h3 className="text-2xl font-bold">Gears</h3>
        {hero.gear?.out_pack?.map((item) => (
          item?.equip?.icon && item?.equip?.name ? (
            <div
              key={item.equipment_id}
              className="flex flex-row items-center justify-between w-full h-full gap-0 mt-2"
            >
              <div className="flex w-20 h-auto justify-center items-center mx-auto">
                <img
                  src={item.equip.icon}
                  alt={`Icono de ${item.equip.name}`}
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex flex-col w-full p-2">
                <h4 className="text-lg font-bold">{item.equip.name}</h4>
                <p className="text-sm text-[#7890B3]">
                  {item.equip.des ? stripHTML(item.equip.des.join(" ")) : "No description"}
                </p>
              </div>
            </div>
          ) : null
        ))}
        {hero.gear?.out_pack_tips && (
          <span className="text-[#7890B3] p-4">
            <strong className="text-sm text-[#f2f2f2]">Tips: </strong>
            {stripHTML(hero.gear.out_pack_tips)}
          </span>
        )}
      </div>
    </article>
  );
}
