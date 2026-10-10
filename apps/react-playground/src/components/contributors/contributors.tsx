import { CONTRIBUTORS } from "./contributors.constants";

function Contributors() {
  return (
    <section className="contributors-section" id="contributors">
      <div className="wrap">
        <div className="bento-section-head">
          <h2 className="bento-title">
            <span>Contributors</span>
          </h2>
          <span className="bento-counter mono">LinkedIn</span>
        </div>
        <div className="contributors-grid">
          {CONTRIBUTORS.map((person) => (
            <a
              key={person.linkedInUrl}
              className="contributor-card"
              href={person.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="contributor-photo"
                src={person.photoUrl}
                alt={person.name}
                width={72}
                height={72}
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="contributor-name">{person.name}</div>
                <div className="contributor-role">{person.role}</div>
                <div className="contributor-link mono">LinkedIn</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contributors;
