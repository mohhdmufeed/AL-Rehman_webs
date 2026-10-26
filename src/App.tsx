import { FormEvent, useEffect, useState } from "react"

// ============================================================================
// REAL SERVICE PHOTO GALLERIES (EASILY ADD MORE PICTURES HERE)
// To add more photos for Gates or any service, simply append a new item:
// { id: "gate-6", title: "Your Gate Name", image: "https://...", specs: "...", description: "..." }
// ============================================================================
interface ServicePhoto {
  id: string
  title: string
  service: string
  image: string
  specs: string
  description: string
}

const serviceGalleries: Record<string, ServicePhoto[]> = {
  Gates: [
    {
      id: "gate-laser-floral",
      service: "Gates",
      title: "Designer Laser-Cut Floral Compound Gate",
      image: "/gate-modern-laser.png",
      specs: "CNC Laser-Cut Floral Center • Triple Leaf Folding • Clean Light Grey Finish",
      description:
        "Modern 3-panel residential entrance gate fabricated with precision CNC laser-cut floral artwork and matching horizontal ventilation slats.",
    },
    {
      id: "gate-compound-geo",
      service: "Gates",
      title: "Modern Architectural Compound Wall Gate",
      image: "/gate-compound-geometric.jpg",
      specs: "Geometric Diamond Mesh • Horizontal Louver Slats • Custom Box Section Handles",
      description:
        "Rigid compound perimeter entrance gate fabricated to exact pillar dimensions, featuring central diamond security lattice and square motif handles.",
    },
    {
      id: "gate-sliding-track",
      service: "Gates",
      title: "Heavy-Duty Track-Mounted Sliding Compound Gate",
      image: "/gate-sliding-track.jpg",
      specs: "Heavy Gauge Mild Steel • Ground Roller Track • Horizontal Security Louvers",
      description:
        "Site-fitted sliding driveway gate engineered with reinforced bottom roller guides, high-load wheels, and heavy-duty protective enamel coating.",
    },
    {
      id: "gate-forged-double",
      service: "Gates",
      title: "Handcrafted Forged Iron Double Main Gate",
      image: "/gate-forged-iron.png",
      specs: "Handcrafted Iron Filigree • Cast Flower Medallions • Heavy Security Latches",
      description:
        "Heavy double entrance swing gate fabricated in our workshop with forged ornamental scrollwork, floral motifs, and multi-point secure locking latch.",
    },
    {
      id: "gate-steel-panel",
      service: "Gates",
      title: "Custom Steel Double-Leaf Security Door Gate",
      image: "/gate-steel-panel.png",
      specs: "Heavy Sheet Metal Panels • Embossed Medallions • Heavy-Duty Barrel Latches",
      description:
        "Full-privacy steel entry door fabricated with rigid steel framing, embossed rosette accents, and heavy-duty slide bolts for maximum home security.",
    },
    {
      id: "gate-classic-iron",
      service: "Gates",
      title: "Classic Wrought Iron & Steel Compound Gate",
      image: "/gates.png",
      specs: "Handcrafted Iron Filigree • Matte Finish • Double Swing Hinges",
      description:
        "Custom manufactured to exact entrance dimensions with reinforced hinge points and high-durability protective topcoat.",
    },
  ],

  Grills: [
    {
      id: "grill-wave-accent",
      service: "Grills",
      title: "Modern Wave Accent Window Safety Grill",
      image: "/grill-modern-white-wave.png",
      specs: "Solid Square Bar Steel • Curved Wave Accent • Durable Enamel Coating",
      description:
        "Contemporary residential window safety grill engineered with horizontal protective bars and an elegant curved vertical accent wave.",
    },
    {
      id: "grill-triple-wave",
      service: "Grills",
      title: "Triple S-Wave Architectural Window Grill",
      image: "/grill-triple-wave-window.png",
      specs: "High-Security Solid Steel • S-Curve Vertical Bars • Flush Wall Anchors",
      description:
        "Wall-fitted window security grill fabricated with triple fluid wave patterns providing maximum burglar deterrence with high architectural curb appeal.",
    },
    {
      id: "grill-sliding-patio",
      service: "Grills",
      title: "Triple-Panel Sliding Patio & French Door Security Grill",
      image: "/grill-sliding-patio-wave.png",
      specs: "Sliding Track System • Full Door Height • Integrated Top Transom Grills",
      description:
        "Complete multi-panel sliding security grill system engineered for balcony glass doors and large French window openings.",
    },
    {
      id: "grill-veranda-arch",
      service: "Grills",
      title: "Veranda & Porch Arched Security Grill Enclosure",
      image: "/grill-veranda-arch-enclosure.jpg",
      specs: "Arched Header Steel • Built-In Swing Gate • Full Porch Perimeter Security",
      description:
        "Custom veranda enclosure with continuous vertical security bars, decorative arched upper profiles, and an integrated access security door.",
    },
    {
      id: "grill-balcony-circle",
      service: "Grills",
      title: "Balcony & Terrace Geometric Ring Parapet Safety Grill",
      image: "/grill-balcony-circle-parapet.jpg",
      specs: "Circular Ring Motifs • Heavy Gauge Top & Bottom Frame • Parapet Anchoring",
      description:
        "Architectural exterior balcony safety grill combining vertical barrier bars with dual upper and lower decorative geometric ring borders.",
    },
    {
      id: "grill-floral-rosette",
      service: "Grills",
      title: "Handcrafted Diamond & Floral Rosette Security Grill",
      image: "/grill-diamond-floral-workshop.png",
      specs: "Forged Floral Centerpiece • Diamond Lozenge Framing • Heavy Perimeter Welds",
      description:
        "Workshop-crafted ornamental steel safety grill featuring central forged flower clover medallion and diamond reinforcement bars.",
    },
    {
      id: "grill-window-classic",
      service: "Grills",
      title: "Heavy-Duty Classic Box Section Window Security Grill",
      image: "/grill-window-classic-bars.jpg",
      specs: "Box Section Framework • Full Window Coverage • Clean Modern Finish",
      description:
        "Rigid steel window grill providing tamper-proof barrier protection for ground and upper-floor residential bedrooms.",
    },
  ],

  "Railings & Staircases": [
    {
      id: "stair-anti-slip-perforated",
      service: "Railings & Staircases",
      title: "Exterior Anti-Slip Perforated Steel Entrance Staircase",
      image: "/stair-anti-slip-perforated-steps.png",
      specs: "Perforated Safety Grate Treads • Powder-Coated Steel Railing • Heavy Stringer Frame",
      description:
        "Durable exterior steel staircase fabricated with embossed slip-resistant perforated steel steps and rigid safety handrails for secure entry.",
    },
    {
      id: "stair-industrial-structural",
      service: "Railings & Staircases",
      title: "Heavy-Duty Industrial Structural Steel Staircase",
      image: "/stair-industrial-workshop-steel.png",
      specs: "Heavy C-Channel Stringers • Flat Steel Plate Treads • Welded Vertical Tube Balustrade",
      description:
        "Engineered high-load factory and warehouse steel staircase fabricated in our workshop with solid steel treads and sturdy continuous handrails.",
    },
    {
      id: "railing-stainless-tension-cable",
      service: "Railings & Staircases",
      title: "Stainless Steel Handrail with Horizontal Safety Bars",
      image: "/railing-stainless-steel-cable-bar.png",
      specs: "Grade 304 Stainless Steel • Cylindrical Top Rail • Multi-Tier Safety Run • Flange Base Mounts",
      description:
        "Sleek contemporary stainless steel balustrade with brushed cylindrical handrail, heavy base anchors, and horizontal safety runner bars for internal and external stairs.",
    },
    {
      id: "railing-geometric-box-tube",
      service: "Railings & Staircases",
      title: "Modern Geometric Box-Section Steel Stair Handrail",
      image: "/railing-geometric-box-tube-steel.png",
      specs: "Square Hollow Section Steel • Alternating Rectangular Motifs • Clean Mitered Welds",
      description:
        "Architectural modern stair railing with custom alternating rectangular box balusters, precision mitered corner joints, and clean primed steel finish.",
    },
    {
      id: "railing-modern-geometric-stainless",
      service: "Railings & Staircases",
      title: "Minimalist Geometric Stainless Steel Stair Balustrade",
      image: "/railing-modern-geometric-stainless-stair.png",
      specs: "Architectural Stainless Steel • Interlocking Angled Geometry • Precision Welded & Polished",
      description:
        "High-end modern staircase railing featuring bespoke angled geometric chevron lines, custom-fitted to the staircase pitch with immaculate brushed finish.",
    },
    {
      id: "stair-rooftop-terrace",
      service: "Railings & Staircases",
      title: "Outdoor Rooftop Terrace Steel Staircase with Geometric Railing",
      image: "/stair-rooftop-terrace-geometric.png",
      specs: "Outdoor Primed Steel • Open Tread Risers • Geometric Balustrade Lines",
      description:
        "Custom rooftop access steel staircase fabricated with rigid square tubular stringers, open anti-sag steps, and modern multi-angle balustrades.",
    },
    {
      id: "railing-stainless-ornamental-pillar",
      service: "Railings & Staircases",
      title: "Luxury Stainless Steel Stair Railing with Carved Wooden Master Pillar",
      image: "/railing-stainless-ornamental-pillar-granite.png",
      specs: "SS 304 Mirror Polish • Teak Finish Wood Newel • Amber Crystal Ball Finial • Geometric Infill",
      description:
        "Premium indoor staircase railing featuring mirror-finish stainless steel tubes, decorative wooden master post with crystal globe finial, and bespoke geometric riser panels.",
    },
    {
      id: "railing-stainless-wood-pillar",
      service: "Railings & Staircases",
      title: "Stainless Steel & Hardwood Combination Staircase Handrail",
      image: "/railing-stainless-wood-pillar-red.png",
      specs: "Dual Finish SS 304 & Wood • Multi-Tier Safety Runners • Heavy Floor Core Drilling",
      description:
        "Contemporary combination balustrade with rich polished wood accent posts, stainless steel round handrail, and four horizontal protection bars.",
    },
    {
      id: "stair-industrial-yellow",
      service: "Railings & Staircases",
      title: "Industrial High-Visibility Steel Safety Access Staircase",
      image: "/stair-industrial-yellow-safety.png",
      specs: "Safety Yellow Epoxy Finish • Continuous Dual Handrails • Gusseted Base Brackets",
      description:
        "Factory and mezzanine steel access staircase engineered with continuous safety rails, non-slip tread plates, and durable high-visibility yellow powder coating.",
    },
  ],

  "Sheds & Roofing": [
    {
      id: "shed-truss-gabled",
      service: "Sheds & Roofing",
      title: "Large-Span Gabled Steel Roof Truss Framework",
      image: "/shed-truss-gabled-framework.png",
      specs: "Engineered Tubular Rafters • Purlin Grid System • Ridge Beam Apex • Anti-Sag Rods",
      description:
        "Precision manufactured wide-span structural gabled roof framework designed for optimal rain shedding, high wind resistance, and durable sheet cladding.",
    },
    {
      id: "shed-terrace-canopy",
      service: "Sheds & Roofing",
      title: "Modern Terrace Rooftop Canopy & Steel Pergola Frame",
      image: "/shed-terrace-canopy-pergola.png",
      specs: "Heavy Hollow Section Columns • Slatted Rafter Joists • Wall Anchored • Weatherproof Finish",
      description:
        "Custom architectural steel terrace awning and pergola structure fabricated to transform open rooftops into shaded, weather-protected living spaces.",
    },
    {
      id: "shed-rooftop-welding",
      service: "Sheds & Roofing",
      title: "On-Site Precision Hip & Pyramid Roof Truss Welding",
      image: "/shed-rooftop-welding-apex.png",
      specs: "Full Penetration Arc Welds • Custom Angular Hip Rafters • Reinforced Gusset Plates",
      description:
        "On-site roof fabrication and precision apex welding by our certified welders, ensuring rock-solid structural integrity for rooftop additions.",
    },
    {
      id: "shed-industrial-warehouse",
      service: "Sheds & Roofing",
      title: "Pre-Engineered Industrial Warehouse Shed & Wall Cladding",
      image: "/shed-industrial-warehouse-interior.png",
      specs: "Heavy Structural Steel Trusses • Galvalume Roofing • Corrugated Wall Panels • Double Access Doors",
      description:
        "Turnkey commercial steel shed construction featuring welded roof trusses, purlins, and full metal sheet cladding for industrial workshops and storage.",
    },
  ],

  "Structural Steel": [
    {
      id: "struct-equipment-stand",
      service: "Structural Steel",
      title: "Heavy-Duty Welded Box-Section Industrial Equipment Stand",
      image: "/struct-heavy-duty-equipment-stand.png",
      specs: "Square Hollow Section Steel • Gusseted Mounting Pads • Base Floor Runners • Matte Black Epoxy",
      description:
        "Rigid custom structural equipment stand fabricated with heavy-gauge tubular steel and machined mounting plates to securely support machinery and power systems.",
    },
    {
      id: "struct-stainless-chassis",
      service: "Structural Steel",
      title: "Industrial Stainless Steel Machine Chassis & Skid Frame",
      image: "/struct-stainless-machine-base-frame.png",
      specs: "SS 304 Box Section • Leveling Foot Pads • Precision TIG Welded • Heavy Machine Mounting",
      description:
        "Corrosion-resistant structural stainless steel foundation skid built for food processing, pharmaceutical, and high-spec industrial manufacturing equipment.",
    },
    {
      id: "struct-bevel-weld",
      service: "Structural Steel",
      title: "High-Strength Bevel-Groove Full Penetration Joint Welding",
      image: "/struct-bevel-groove-weld-joint.png",
      specs: "RD-260 E6013 Low Carbon Rod • Beveled Plate Prep • Full Root Penetration • Certified Joint",
      description:
        "Precision edge beveling and high-tensile arc welding for load-bearing structural joints, ensuring crack-free strength under extreme compression and shear loads.",
    },
    {
      id: "struct-wire-mesh-rolls",
      service: "Structural Steel",
      title: "Heavy-Gauge Galvanized Welded Wire Mesh Rolls",
      image: "/struct-galvanized-wire-mesh-rolls.png",
      specs: "Hot-Dip Galvanized Wire • Electric Resistance Welded Grid • Rustproof • Bulk Yard Supply",
      description:
        "High-durability galvanized steel mesh rolls fabricated for industrial security enclosures, safety partitions, animal fencing, and concrete slab reinforcement.",
    },
    {
      id: "struct-wire-mesh-panel",
      service: "Structural Steel",
      title: "Rigid Galvanized Steel Safety Fencing Mesh",
      image: "/struct-welded-wire-mesh-roll.png",
      specs: "Square Grid Pattern • Anti-Corrosion Zinc Coating • Rigid Vertical Alignment • High Tensile",
      description:
        "Uniform welded wire mesh engineered for boundary security fences, machine safety guards, window screening, and construction site perimeters.",
    },
  ],

  "Welding & Repairs": [
    {
      id: "weld-workshop-fabrication",
      service: "Welding & Repairs",
      title: "Precision Workshop Arc & Metal Frame Welding",
      image: "/weld-workshop-fabrication-sparks.png",
      specs: "Certified Manual Metal Arc / MIG • Argon Shielded • Deep Root Penetration • Slag Free",
      description:
        "Expert workshop welding and steel fabrication by master fabricators, delivering high-integrity joints for gates, structural frames, and machinery components.",
    },
    {
      id: "weld-arc400-inverter",
      service: "Welding & Repairs",
      title: "Industrial 400A Heavy-Duty IGBT Inverter Arc Welder",
      image: "/weld-arc400-industrial-inverter.png",
      specs: "ARC400 IGBT Technology • Digital Current Display • High Duty Cycle • Thick Gauge Welding",
      description:
        "Commercial-grade heavy-amperage welding power source utilized for deep weld penetration on thick structural steel, iron gates, and heavy machinery repairs.",
    },
    {
      id: "weld-grinder-finishing",
      service: "Welding & Repairs",
      title: "Heavy-Duty Angle Grinder & Weld Seam Finishing Tool",
      image: "/weld-grinder-metal-fabrication-tool.png",
      specs: "High-Speed Angle Grinder • Cut-Off Discs • Flap Wheel Polishing • Flush Weld Dressing",
      description:
        "Industrial grinding and metal prep equipment used for beveling joints, cutting structural profiles, and polishing weld beads to a smooth, paint-ready surface.",
    },
  ],
}

// Flat list of all photos for the "All" view in gallery slider
const allGalleryPhotos: ServicePhoto[] = Object.values(serviceGalleries).flat()

const services = [
  {
    number: "01",
    key: "Gates",
    title: "Gates & Compound Entrances",
    text: "Custom sliding, swing and perimeter compound gates. Handcrafted to your measurements with heavy-duty durability.",
    items: [
      "Main entrance gate fabrication",
      "Custom steel sliding gates",
      "Wrought iron gate fabrication",
      "Modern laser-cut design gates",
      "Double swing compound gates",
      "Heavy-duty panel door gates",
      "Gate repair and welding",
    ],
  },
  {
    number: "02",
    key: "Grills",
    title: "Window & Safety Grills",
    text: "High-security window grills, veranda enclosures, balcony barriers, and sliding door security grills engineered for lasting protection.",
    items: [
      "Modern window grill fabrication",
      "Architectural wave & S-curve grills",
      "Balcony & parapet safety grills",
      "Veranda security enclosures",
      "Sliding patio door grills",
      "Handcrafted ornamental grills",
      "Window grill repair and repainting",
    ],
  },
  {
    number: "03",
    key: "Railings & Staircases",
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
    number: "04",
    key: "Sheds & Roofing",
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
    number: "05",
    key: "Structural Steel",
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
    number: "06",
    key: "Welding & Repairs",
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

  // Mini-sliders state for each service card in #services
  const [cardIndices, setCardIndices] = useState<Record<string, number>>({
    Gates: 0,
    Grills: 0,
    "Railings & Staircases": 0,
    "Sheds & Roofing": 0,
    "Structural Steel": 0,
    "Welding & Repairs": 0,
  })

  function nextCardPhoto(key: string, e: React.MouseEvent) {
    e.stopPropagation()
    const photos = serviceGalleries[key] || []
    if (photos.length <= 1) return
    setCardIndices((prev) => ({
      ...prev,
      [key]: ((prev[key] || 0) + 1) % photos.length,
    }))
  }

  function prevCardPhoto(key: string, e: React.MouseEvent) {
    e.stopPropagation()
    const photos = serviceGalleries[key] || []
    if (photos.length <= 1) return
    setCardIndices((prev) => ({
      ...prev,
      [key]: ((prev[key] || 0) - 1 + photos.length) % photos.length,
    }))
  }

  // Dedicated Gallery Slider State
  const [activeCategory, setActiveCategory] = useState<string>("Gates")
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)
  const [autoPlay, setAutoPlay] = useState<boolean>(true)

  // Current photos for selected category
  const currentPhotos =
    activeCategory === "All"
      ? allGalleryPhotos
      : serviceGalleries[activeCategory] || []

  // Ensure index is within range
  const safeSlideIndex =
    currentPhotos.length > 0 ? activeSlideIndex % currentPhotos.length : 0
  const currentSlide = currentPhotos[safeSlideIndex] || currentPhotos[0]

  // Auto-play timer for slider
  useEffect(() => {
    if (!autoPlay || currentPhotos.length <= 1) return
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % currentPhotos.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [autoPlay, currentPhotos.length])

  function nextSlide() {
    setActiveSlideIndex((prev) => (prev + 1) % currentPhotos.length)
  }

  function prevSlide() {
    setActiveSlideIndex(
      (prev) => (prev - 1 + currentPhotos.length) % currentPhotos.length,
    )
  }

  function switchCategory(cat: string) {
    setActiveCategory(cat)
    setActiveSlideIndex(0)
  }

  function jumpToGallery(cat: string) {
    switchCategory(cat)
    const el = document.getElementById("gallery")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

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
          <a href="#gallery" onClick={() => setMenu(false)}>
            Photo Gallery
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
              shops, compounds and businesses—made to your exact measurements.
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
                href="#gallery"
              >
                Browse Designs <span>↓</span>
              </a>
            </div>
          </div>
        </section>

        <section className="trust">
          <p>TRUSTED FOR WORK THAT DEMANDS</p>
          <div>
            <a href="#services">PRECISION</a>
            <i />
            <a href="#gallery">INNOVATION</a>
            <i />
            <a href="#about">STRENGTH</a>
            <i />
            <a href="#quote">RELIABILITY</a>
          </div>
        </section>

        {/* SERVICES SECTION WITH INTERACTIVE SLIDER CONTROLS ON CARDS */}
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
              From custom sliding gates and security grills to full-scale structural steel fabrication, we
              bring master craftsmanship and precision to every weld.
            </p>
          </div>

          <div className="service-grid">
            {services.map((srv) => {
              const gallery = serviceGalleries[srv.key] || []
              const currentIndex = cardIndices[srv.key] || 0
              const activePhoto = gallery[currentIndex] || {
                image: "/gates.png",
                title: srv.title,
              }

              return (
                <article className="service-card" key={srv.number}>
                  {/* Photo area with mini-slider arrows and counter */}
                  <div className="service-photo-wrap">
                    <img
                      src={activePhoto.image}
                      alt={activePhoto.title || srv.title}
                      loading="lazy"
                    />

                    <div className="card-slide-bar">
                      <div className="card-slide-top">
                        <span className="card-slide-count">
                          {currentIndex + 1} / {gallery.length} Photos
                        </span>
                        <div className="card-slide-dots">
                          {gallery.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              type="button"
                              className={`card-dot-btn ${dotIdx === currentIndex ? "active" : ""}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                setCardIndices((prev) => ({
                                  ...prev,
                                  [srv.key]: dotIdx,
                                }))
                              }}
                              aria-label={`Go to slide ${dotIdx + 1}`}
                            />
                          ))}
                        </div>
                      </div>

                      {gallery.length > 1 && (
                        <div className="card-slide-nav">
                          <button
                            type="button"
                            className="card-arrow-btn"
                            onClick={(e) => prevCardPhoto(srv.key, e)}
                            aria-label={`Previous ${srv.title} photo`}
                            title="Previous image"
                          >
                            ‹
                          </button>
                          <button
                            type="button"
                            className="card-arrow-btn"
                            onClick={(e) => nextCardPhoto(srv.key, e)}
                            aria-label={`Next ${srv.title} photo`}
                            title="Next image"
                          >
                            ›
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <h3>{srv.title}</h3>
                  <p>{srv.text}</p>

                  <ul>
                    {srv.items.map((item) => (
                      <li key={item}>
                        <a
                          href="#quote"
                          onClick={() => pick(srv.title, item)}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="service-card-footer">
                    <a
                      className="card-link"
                      href="#quote"
                      onClick={() => pick(srv.title)}
                      aria-label={`Request ${srv.title}`}
                    >
                      Discuss project <span>↗</span>
                    </a>
                    <button
                      type="button"
                      className="card-gallery-jump"
                      onClick={() => jumpToGallery(srv.key)}
                      title={`View all ${gallery.length} ${srv.title} pictures in slider`}
                    >
                      View all {gallery.length} designs <span>→</span>
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* ================================================================== */}
        {/* DEDICATED SLIDING PHOTO SHOWCASE SECTION                           */}
        {/* ================================================================== */}
        <section className="gallery-section" id="gallery">
          <div className="gallery-header">
            <div>
              <p className="eyebrow">
                <span /> Design Showcase & Gallery
              </p>
              <h2>
                EXPLORE REAL
                <br />
                <em>FABRICATED DESIGNS.</em>
              </h2>
            </div>
            <p className="sub">
              Slide through real photographs of our custom gates, railings, sheds, and steel frameworks.
              Select any category below to inspect our finished client installations.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="gallery-tabs" role="tablist" aria-label="Service categories">
            <button
              type="button"
              className={`gallery-tab ${activeCategory === "All" ? "active" : ""}`}
              onClick={() => switchCategory("All")}
            >
              All Categories <span className="count">{allGalleryPhotos.length}</span>
            </button>
            {Object.keys(serviceGalleries).map((catName) => (
              <button
                key={catName}
                type="button"
                className={`gallery-tab ${activeCategory === catName ? "active" : ""}`}
                onClick={() => switchCategory(catName)}
              >
                {catName} <span className="count">{serviceGalleries[catName].length}</span>
              </button>
            ))}
          </div>

          {/* Main Slider Display */}
          <div
            className="gallery-slider-frame"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            {currentSlide && (
              <>
                <img
                  key={currentSlide.id}
                  className="gallery-slide-img"
                  src={currentSlide.image}
                  alt={currentSlide.title}
                />
                <div className="gallery-slide-overlay" />

                {/* Top Status & Controls Bar */}
                <div className="gallery-top-bar">
                  <span className="service-badge">
                    {currentSlide.service}
                  </span>

                  <div className="slider-status-pill">
                    <span>
                      {safeSlideIndex + 1} / {currentPhotos.length}
                    </span>
                    <button
                      type="button"
                      className="auto-toggle"
                      onClick={() => setAutoPlay(!autoPlay)}
                      title={autoPlay ? "Pause Auto-slide" : "Start Auto-slide"}
                    >
                      {autoPlay ? "⏸ Pause" : "▶ Play"}
                    </button>
                  </div>
                </div>

                {/* Left & Right Chevrons */}
                {currentPhotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="slide-nav-btn slide-nav-prev"
                      onClick={prevSlide}
                      aria-label="Previous photo"
                      title="Previous photo (Left arrow)"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="slide-nav-btn slide-nav-next"
                      onClick={nextSlide}
                      aria-label="Next photo"
                      title="Next photo (Right arrow)"
                    >
                      ›
                    </button>
                  </>
                )}

                {/* Bottom Information & WhatsApp Inquiry Action */}
                <div className="gallery-slide-info">
                  <div className="gallery-slide-copy">
                    <div className="gallery-slide-specs">{currentSlide.specs}</div>
                    <h3>{currentSlide.title}</h3>
                    <p className="gallery-slide-desc">{currentSlide.description}</p>
                  </div>

                  <a
                    className="gallery-inquire-btn"
                    href={`https://wa.me/919972522213?text=${encodeURIComponent(
                      `Hello, I saw this design on your website and would like a quote:\n\nDesign: ${currentSlide.title}\nCategory: ${currentSlide.service}\nSpecifications: ${currentSlide.specs}`,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WaIcon /> Inquire on WhatsApp <span>↗</span>
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Interactive Thumbnails Strip */}
          <div className="gallery-thumbnails-strip" aria-label="Thumbnail previews">
            {currentPhotos.map((photo, pIdx) => (
              <button
                key={photo.id}
                type="button"
                className={`gallery-thumb-btn ${pIdx === safeSlideIndex ? "active" : ""}`}
                onClick={() => setActiveSlideIndex(pIdx)}
                aria-label={`View ${photo.title}`}
              >
                <img src={photo.image} alt={photo.title} loading="lazy" />
                <span className="gallery-thumb-title">{photo.title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ABOUT SECTION */}
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
                <a href="#gallery">
                  <b>✓</b> Real tested designs & custom measurements
                </a>
              </li>
              <li>
                <a href="#services">
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

        {/* QUOTE SECTION */}
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
                {services.map((srv) => (
                  <option key={srv.title}>{srv.title}</option>
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
          <a href="#gallery">Gallery</a>
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
