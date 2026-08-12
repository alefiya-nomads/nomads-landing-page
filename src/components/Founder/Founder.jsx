import "./Founder.css";
import FounderStory from "./FounderStory.jsx";
import { founder } from "../../data/copy.js";

export default function Founder() {
  return (
    <section className="founder">
      <img
        className="founder__seal"
        src="/Assets/Doodle/white compass badge.png"
        alt=""
        aria-hidden="true"
      />
      <div className="founder__split">
        <div className="founder__photo-col">
          <div className="founder__photo-sticky">
            <img
              className="founder__photo"
              src="/Assets/Images/alefiys image.png"
              alt="Alefiya Khoraki, co-founder and CMO at Nomads Marketing"
            />
          </div>
        </div>

        <div className="founder__copy-col">
          <div className="founder__intro" data-reveal>
            <span className="founder__intro-hey">{founder.intro.hey}</span>
            <span className="founder__intro-name">{founder.intro.name}</span>
          </div>
          <span className="founder__intro-role" data-reveal data-reveal-delay="120">
            {founder.intro.role}
          </span>

          <FounderStory
            paragraphs={founder.paragraphs}
            numberedList={founder.numberedList}
            paragraphs2={founder.paragraphs2}
          />
        </div>
      </div>
    </section>
  );
}
