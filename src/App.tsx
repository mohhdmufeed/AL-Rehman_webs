import { FormEvent, useState } from "react"

const services = [
  {
    number: "01",
    image: "/gates.png",
    title: "Gates & Grills",
    text: "Gates and grills for homes, shops and compounds. Made to your measurements in styles you choose.",
    items: [
      "Main gate fabrication",
      "Custom steel gates",
      "Iron gate fabrication",
      "Sliding gates",
      "Window grill fabrication",
      "Security grills",
      "Gate repair and welding",
    ],
  },

  {
    number: "02",
    image: "/railings.png",
    position: "center 62%",
    title: "Railings & Staircases",
    text: "Steel staircases and railings for homes and buildings. Built to fit your space and finished to match.",
    items: [
      "Staircase railing fabrication",
      "Balcony railing fabrication",
      "Steel handrails",
      "Metal staircase fabrication",
      "Safety railings",
      "Railing repair",
    ],
  },

  {
    number: "03",
    image: "/shed.png",
    title: "Sheds & Roofing",
    text: "Steel sheds and roof structures for homes and businesses. Planned around your space and how you use it.",
    items: [
      "Metal shed fabrication",
      "Steel shed structures",
      "Roofing structures",
      "Car parking sheds",
      "Terrace roofing structures",
      "Steel roof trusses",
      "Canopy fabrication",
      "Shed repair",
    ],
  },

  {
    number: "04",
    image:
      "https://images.unsplash.com/photo-1627922529156-41f27fb6f7ac?auto=format&fit=crop&w=1000&h=620&q=80",
    title: "Structural Steel",
    text: "Steel frames, trusses and supports made to your drawings. Also custom metal components and structure repairs.",
    items: [
      "Structural steel fabrication",
      "Steel frame fabrication",
      "Steel truss fabrication",
      "Steel support structures",
      "Custom metal fabrication",
      "Custom metal components",
      "Steel structure repair",
    ],
  },

  {
    number: "05",
    image:
      "https://images.unsplash.com/photo-1466779561253-0a08336ba2ab?auto=format&fit=crop&w=1000&h=620&q=80",
    title: "Welding & Repairs",
    text: "Repair and new-build welding, in the workshop or on site. Send a photo or measurements to get a quote.",
    items: [
      "General welding services",
      "Custom welding work",
      "Metal welding repairs",
      "Gate and grill repair",
      "Railing repair",
      "Steel frame repair",
      "Shed structure repair",
      "Broken metal joint repair",
      "On-site welding",
      "Workshop welding services",
    ],
  },
]

const projects = [
  {
    title: "Custom Steel Gates",
    type: "GATES & GRILLS",
    service: "Gates & Grills",
    image:
      "https://images.unsplash.com/photo-1696521938054-399082dd4f8c?auto=format&fit=crop&w=1400&q=80",
  },

  {
    title: "Staircase Railings",
    type: "RAILINGS & STAIRCASES",
    service: "Railings & Staircases",
    image:
      "https://images.unsplash.com/photo-1612311408242-3ad94a8832cd?auto=format&fit=crop&w=1000&q=80",
  },

  {
    title: "Steel Frame Structures",
    type: "STRUCTURAL STEEL",
    service: "Structural Steel",
    image:
      "https://images.unsplash.com/photo-1584099667019-c7fbb1f55664?auto=format&fit=crop&w=1000&q=80",
  },
]

function silence(v: HTMLVideoElement | null) {
  if (v) {
    v.defaultMuted = true
    v.muted = true
    v.volume = 0
    const playPromise = v.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {})
    }
  }
}

function WaIcon() {
  return (
    <svg className="wa-icon" viewBox="0 0 32 32" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.02 3C8.84 3 3 8.83 3 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75A13 13 0 0 0 16.02 29C23.2 29 29 23.17 29 16S23.2 3 16.02 3Zm0 23.8c-1.95 0-3.86-.53-5.53-1.52l-.4-.23-3.96 1.04 1.06-3.86-.26-.4A10.74 10.74 0 0 1 5.2 16c0-5.96 4.87-10.8 10.82-10.8S26.8 10.04 26.8 16c0 5.96-4.84 10.8-10.78 10.8Zm5.93-8.1c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.74.16-.22.33-.85 1.06-1.04 1.28-.19.22-.38.24-.7.08-.33-.16-1.38-.51-2.62-1.62-.97-.86-1.62-1.93-1.81-2.25-.19-.33-.02-.5.14-.66.15-.15.33-.38.49-.57.16-.19.22-.33.33-.54.11-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.7s1.17 3.13 1.33 3.35c.16.22 2.3 3.5 5.56 4.91.78.33 1.38.53 1.85.68.78.25 1.49.21 2.05.13.62-.09 1.93-.79 2.2-1.55.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.63-.38Z"
      />
    </svg>
  )
}

function Mark() {
  return <img className="logo" src="/logo.jpeg" alt="AL-REHMAN Welding Works" />
}

export default function App() {
  const [sent, setSent] = useState(false)

  const [menu, setMenu] = useState(false)

  const [service, setService] = useState("")

  const [details, setDetails] = useState("")

  function pick(serviceTitle: string, detail = "") {
    setService(serviceTitle)

    setDetails(detail ? `I need: ${detail}` : "")

    setSent(false)

    setMenu(false)
  }

  function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const message = `Hello, I would like a quote.\n\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nService: ${data.get("service")}\nJob size: ${data.get("size")}\nDetails: ${data.get("details") || "Not provided"}`

    window.open(
      `https://wa.me/919972522213?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    )

    setSent(true)

    event.currentTarget.reset()

    setService("")

    setDetails("")
  }

  return (
    <div className="site">
      <header className="nav">
        <a
          className="brand"
          href="#top"
          aria-label="AL-REHMAN Welding Works home"
          onClick={() => setMenu(false)}
        >
          <Mark />
        </a>
        <nav aria-label="Primary navigation" className={menu ? "open" : ""}>
          <a href="#services" onClick={() => setMenu(false)}>
            Services
          </a>
          <a href="#work" onClick={() => setMenu(false)}>
            Our work
          </a>
          <a href="#about" onClick={() => setMenu(false)}>
            About
          </a>
          <a href="#quote" onClick={() => setMenu(false)}>
            Contact
          </a>
          <a className="menu-call" href="tel:+919972522213">
            Call +91 99725 22213
          </a>
        </nav>
        <div className="nav-right">
          <a className="nav-cta" href="#quote" onClick={() => pick("")}>
            Get a quote <span>↗</span>
          </a>
          <button
            type="button"
            className="burger"
            aria-label="Toggle menu"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <i />
            <i />
            <i />
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <video
            className="hero-video"
            ref={silence}
            src="/welding-sparks.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onVolumeChange={(e) => {
              e.currentTarget.muted = true
              e.currentTarget.volume = 0
            }}
            aria-label="Sparks spraying from a metal weld"
          >
            <source src="/welding-sparks.mp4" type="video/mp4" />
          </video>
          <div className="hero-shade" />
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> Built with precision
            </p>
            <h1>
              STRONGER
              <br />
              <em>STRUCTURES.</em>
            </h1>
            <p className="intro">
              Lasting solutions. Expert welding and metal fabrication for homes,
              shops, compounds and businesses—made to your measurements.
            </p>
            <div className="hero-actions">
              <a
                className="button primary"
                href="#quote"
                onClick={() => pick("")}
              >
                Start your project <span>↗</span>
              </a>
              <a
                className="button secondary"
                href="https://wa.me/919972522213?text=Hello%2C%20I%20would%20like%20a%20quote."
                target="_blank"
                rel="noreferrer"
              >
                <WaIcon /> WhatsApp <span>↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="trust">
          <p>TRUSTED FOR WORK THAT DEMANDS</p>
          <div>
            <a href="#services">PRECISION</a>
            <i />
            <a href="#work">STRENGTH</a>
            <i />
            <a href="#about">RELIABILITY</a>
          </div>
        </section>

        <section className="services" id="services">
          <div className="section-head">
            <div>
              <p className="eyebrow dark">
                <span /> What we do
              </p>
              <h2>
                Built for your
                <br />
                <em>requirements.</em>
              </h2>
            </div>
            <p>
              From a single custom gate to full-scale structural fabrication, we
              bring the same discipline, accuracy and pride to every weld.
            </p>
          </div>
          <div className="service-grid complete">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <div className="service-photo">
                  <img
                    src={service.image}
                    alt={service.title}
                    style={
                      service.position
                        ? { objectPosition: service.position }
                        : undefined
                    }
                    loading="lazy"
                  />
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#quote"
                        onClick={() => pick(service.title, item)}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  className="card-link"
                  href="#quote"
                  onClick={() => pick(service.title)}
                  aria-label={`Request ${service.title}`}
                >
                  Discuss your project <span>↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="work" id="work">
          <div className="work-head">
            <div>
              <p className="eyebrow">
                <span /> Selected work
              </p>
              <h2>
                Made to perform.
                <br />
                <em>Built to endure.</em>
              </h2>
            </div>
            <a href="#quote" onClick={() => pick("")}>
              Start a project <span>↗</span>
            </a>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <a
                className={`project p${index + 1}`}
                key={project.title}
                href="#quote"
                onClick={() => pick(project.service, project.title)}
                aria-label={`Request work like ${project.title}`}
              >
                <img src={project.image} alt={project.title} />
                <div className="project-label">
                  <small>{project.type}</small>
                  <h3>{project.title}</h3>
                </div>
                <span className="project-go" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="about" id="about">
          <div className="about-image video-panel">
            <video
              ref={silence}
              src="/logo-reveal.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onVolumeChange={(e) => {
                e.currentTarget.muted = true
                e.currentTarget.volume = 0
              }}
              aria-label="AL-REHMAN logo reveal animation"
            >
              <source src="/logo-reveal.mp4" type="video/mp4" />
            </video>
            <a className="quality" href="#quote">
              <strong>100%</strong>
              <span>
                COMMITMENT
                <br />
                TO QUALITY
              </span>
            </a>
          </div>
          <div className="about-copy">
            <p className="eyebrow dark">
              <span /> The AL-REHMAN standard
            </p>
            <h2>
              Honest work.
              <br />
              <em>Solid results.</em>
            </h2>
            <p>
              AL-Rehman Welding Works creates practical metalwork for homes,
              shops, compounds and businesses. We plan every job around your
              space, measurements and how you use it—then deliver clean, durable
              results without shortcuts.
            </p>
            <ul>
              <li>
                <a href="#services">
                  <b>✓</b> Skilled & experienced craftsmen
                </a>
              </li>
              <li>
                <a href="#work">
                  <b>✓</b> Quality materials, clean finishes
                </a>
              </li>
              <li>
                <a href="#quote">
                  <b>✓</b> Clear pricing and reliable timelines
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section className="quote" id="quote">
          <div className="quote-copy">
            <p className="eyebrow">
              <span /> Let's build it right
            </p>
            <h2>
              Have a project
              <br />
              in mind?
            </h2>
            <p>
              Tell us what you need. We’ll review the details and get back to
              you with a practical solution and honest estimate.
            </p>
            <div className="contact-list">
              <div>
                <span>CALL US</span>
                <a href="tel:+919972522213">+91 99725 22213</a>
                <a href="tel:+919113592492">+91 91135 92492</a>
              </div>
              <div>
                <span>EMAIL</span>
                <a href="mailto:alrehmanfabrications@gmail.com">
                  alrehmanfabrications@gmail.com
                </a>
              </div>
              <div>
                <span>VISIT US</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=AL-REHMAN%20WELDING%20WORKS%2C%20Melpangthi%2C%20Shiroor%2C%20Karnataka%20576228"
                  target="_blank"
                  rel="noreferrer"
                >
                  AL-REHMAN WELDING WORKS
                  <br />
                  Melpangthi, Shiroor
                  <br />
                  Karnataka 576228
                </a>
              </div>
            </div>
          </div>
          <form onSubmit={submitQuote}>
            <label>
              Your name
              <input required name="name" placeholder="Enter your full name" />
            </label>
            <label>
              Phone number
              <input
                required
                name="phone"
                type="tel"
                placeholder="+91 00000 00000"
              />
            </label>
            <label>
              What do you need?
              <select
                required
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {services.map((service) => (
                  <option key={service.title}>{service.title}</option>
                ))}
              </select>
            </label>
            <label>
              Job size
              <select required name="size" defaultValue="Medium">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </label>
            <label>
              Project details
              <textarea
                name="details"
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Briefly describe your project..."
              />
            </label>
            <button className="submit" type="submit">
              {sent ? "Open WhatsApp again" : "Send via WhatsApp"}{" "}
              <span>↗</span>
            </button>
            <p className="form-note">
              No online payment. We confirm the price after you send the
              details.
            </p>
            {sent && (
              <p className="success" role="status">
                Your quote details were prepared in WhatsApp.
              </p>
            )}
          </form>
        </section>
      </main>

      <footer>
        <a className="brand" href="#top">
          <Mark />
        </a>
        <nav aria-label="Footer">
          <a href="#services">Services</a>
          <a href="#work">Our work</a>
          <a href="#about">About</a>
          <a href="#quote">Contact</a>
        </nav>
        <p>
          © {new Date().getFullYear()} AL-REHMAN Welding Works. All rights
          reserved.
        </p>
      </footer>

      <a
        className="wa-float"
        href="https://wa.me/919972522213?text=Hello%2C%20I%20would%20like%20a%20quote."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <WaIcon />
      </a>
    </div>
  )
}
