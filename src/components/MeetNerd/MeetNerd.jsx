import "./MeetNerd.css";
import HighlightSweep from "../primitives/HighlightSweep.jsx";

export default function MeetNerd() {
  return (
    <section className="meet-nerd">
      <img
        className="meet-nerd__badge"
        src="/Assets/Doodle/purple badge whos behind.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      <div className="wrap center">
        <p className="meet-nerd__wait" data-reveal>
          Wait...
        </p>
        <h2 className="meet-nerd__headline" data-reveal data-reveal-delay="120">
          Meet The{" "}
          <HighlightSweep tone="plum">Marketing Nerd Behind</HighlightSweep>{" "}
          <br className="hl-br" />
          The Compounding RPV OS.
        </h2>
      </div>
    </section>
  );
}
