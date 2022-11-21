import data from "../data/data.js";

export default function Projekter() {
  return (
    <div>
      <div className="project-container">
        {data.map((item, i) => (
          <div key={i} className="project">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
