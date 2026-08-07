import "./SystemBorn.css";

export default function SystemBorn() {
  return (
    <section className="system-born">
      <div className="system-born__card">
        <div className="system-born__text">
          <p className="system-born__para">
            I studied hours of real sales calls, demos, and live chats{" "}
            <br className="system-born__br" />
            from customers who didn&rsquo;t convert.
          </p>

          <span className="system-born__badge">
            That&rsquo;s how our proprietary system:
          </span>

          <h2 className="system-born__heading">
            Compounding Revenue per{" "}
            <br className="system-born__br" />
            Visitor &trade; OS was born
          </h2>

          <p className="system-born__para">
            A system that helps businesses stop losing the traffic{" "}
            <br className="system-born__br" />
            they&rsquo;ve already worked hard (and paid) to get by turning{" "}
            <br className="system-born__br" />
            those visitors into decision-ready leads.
          </p>

          <p className="system-born__para">
            In under five minutes, a cold visitor can go from{" "}
            <strong>
              &ldquo;just{" "}
              <br className="system-born__br" />
              browsing&rdquo;
            </strong>{" "}
            to thinking, <strong>&ldquo;This is exactly what I need.&rdquo;</strong>
          </p>

          <span className="system-born__badge">Today</span>

          <p className="system-born__para system-born__para--bold">
            I&rsquo;ve helped brands across 15+ industries maximize their{" "}
            <br className="system-born__br" />
            leads and sales from the traffic they already have.
          </p>

          <img
            className="system-born__doodle"
            src="/Assets/Doodle/straight arrow.png"
            alt=""
            aria-hidden="true"
          />
        </div>

        <div className="system-born__photo">
          <img
            src="/Assets/Images/DSC04663 1.png"
            alt="Alefiya Khoraki seated in a wicker chair"
          />
        </div>
      </div>
    </section>
  );
}
