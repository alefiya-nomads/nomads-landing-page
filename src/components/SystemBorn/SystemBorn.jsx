import "./SystemBorn.css";

export default function SystemBorn() {
  return (
    <section className="system-born">
      <div className="system-born__card">
        <div className="system-born__text">
          <p className="system-born__para" data-reveal>
            I studied hours of real sales calls, demos, and live chats{" "}
            <br className="system-born__br" />
            from customers who didn&rsquo;t convert.
          </p>

          <span className="system-born__badge" data-reveal data-reveal-delay="100">
            That&rsquo;s how our proprietary system:
          </span>

          <h2 className="system-born__heading" data-reveal data-reveal-delay="180">
            Compounding Revenue per{" "}
            <br className="system-born__br" />
            Visitor &trade; OS was born
          </h2>

          <p className="system-born__para" data-reveal>
            A system that helps businesses stop losing the traffic{" "}
            <br className="system-born__br" />
            they&rsquo;ve already worked hard (and paid) to get by turning{" "}
            <br className="system-born__br" />
            those visitors into decision-ready leads.
          </p>

          <p className="system-born__para" data-reveal>
            In under five minutes, a cold visitor can go from &ldquo;just{" "}
            <br className="system-born__br" />
            browsing&rdquo; to thinking, &ldquo;This is exactly what I need.&rdquo;
          </p>

          {/* Yemi: no pulled-out "Today" chip — plain "Today, I've helped…" */}
          <p className="system-born__para system-born__para--bold" data-reveal data-reveal-delay="100">
            Today, I&rsquo;ve helped brands across 15+ industries <strong>maximize their{" "}
            <br className="system-born__br" />
            leads and sales</strong> from the traffic they already have.
          </p>


        </div>

        <div className="system-born__photo">
          <img
            src="/Assets/Images/DSC04663 1.webp"
            alt="Alefiya Khoraki seated in a wicker chair"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
