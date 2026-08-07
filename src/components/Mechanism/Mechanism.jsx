import "./Mechanism.css";
import { mechanism } from "../../data/copy.js";

const LAPTOP_SRC = "/Assets/Images/4th section laptop image.png";

export default function Mechanism() {
  return (
    <section className="mechanism">
      <div className="wrap">
        <div className="mechanism__card">
          <div className="mechanism__visual">
            <img src={LAPTOP_SRC} alt="Whiteboard sketch of the Compounding RPV OS" className="mechanism__laptop" />
          </div>

          <div className="mechanism__copy">
            <p className="mechanism__intro">{mechanism.lines[0]}</p>

            {/* Reference image shows this as a headline + separate paragraph, dropping
                the brackets/™ that copy.js's single-sentence lines[1] carries — flagged
                per design-v2.md 0.8, defaulting to the reference's exact wording/split. */}
            <h2 className="mechanism__headline">
              Our proprietary diagnostic{" "}
              <br className="hl-br" />
              system: Compounding Revenue{" "}
              <br className="hl-br" />
              Per Vistor Operating System
            </h2>
            <p className="mechanism__body">
              Was built by reverse engineering hundreds of customer journeys and figuring out what makes people go
              from “I don’t think this is for me” to “I need this”.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
