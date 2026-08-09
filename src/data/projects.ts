export type Project = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  href: string;
  description: string;
  tags: string[];
  status: "In Development" | "Live";
  overview: string;
  problem: string;
  research: string;
  design: string;
  development: string;
  challenges: string;
  architecture: string;
  /** Real screenshots/clips land here later — empty for now, template renders a styled placeholder. */
  gallery: string[];
  results: string;
  lessons: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "spokebike",
    number: "01",
    title: "SpokeBike",
    subtitle: "Smart Bicycle Experience",
    href: "https://spokebike.vercel.app",
    description:
      "A modern bicycle-focused project designed to combine smart technology, intuitive interaction, and a clean digital experience — making cycling smarter, safer, and more connected.",
    tags: ["React", "Node.js", "MongoDB", "IoT"],
    status: "In Development",
    overview:
      "SpokeBike (SPOKE) is a city-wide bike and e-bike rental network — scan a bike or e-bike at any of 42 stations, unlock in seconds, and ride, with helmet and insurance included on every reservation.",
    problem:
      "Existing bike-share apps make renting feel like a chore — slow unlocks, unclear pricing, and no real sense of whether a bike is actually available before you walk to a station. The goal was a rental flow that feels instant: find a bike, see live availability, unlock, ride.",
    research:
      "Looked at how established bike-share networks (Citi Bike, Lime) handle station discovery, live fleet visibility, and unlock speed, and where riders still hit friction — mainly stale availability data and multi-step unlock flows. Landed on treating unlock speed and live station/fleet accuracy as the core product metrics, not afterthoughts.",
    design:
      "Built around a single search bar — pickup station and duration — leading straight to a live trip view: route, distance, battery, and cost, so a rider always knows exactly what they're getting before and during a ride.",
    development:
      "React front end talking to a Node.js API that tracks live fleet and station state in MongoDB. Each bike reports position and battery in real time, which is what powers the live trip view and the citywide availability count.",
    challenges:
      "Keeping fleet and station data genuinely live — not just refreshed on a timer — is the hard part; the in-progress build still leans on a local dev API server for that data, which is exactly the kind of infrastructure dependency that needs to be rock-solid before this goes further than a demo.",
    architecture:
      "Bike/station hardware reporting → Node.js API (fleet + ride state) → MongoDB for stations/bikes/rides → React app rendering live availability, trip tracking, and pricing.",
    gallery: ["/projects/spokebike/screenshot-1.png"],
    results:
      "In active development. The rental flow, live trip view, and station network UI are built; the next milestone is standing up a real backend service so fleet, pricing, and live-network data load outside of local development.",
    lessons:
      "For a rental product, the UI is only as trustworthy as the data behind it — a beautiful 'live' dashboard showing stale numbers is worse than no dashboard at all.",
  },
  {
    slug: "lordcloud",
    number: "02",
    title: "LordCloud",
    subtitle: "Game Server Hosting Platform",
    href: "https://lordcloud.vercel.app",
    description:
      "A game server hosting platform offering instant, unlimited-resource servers for Minecraft, Rust, Palworld, Valheim, Terraria, and more — plus Discord bot hosting and domains, all from a single storefront and client dashboard.",
    tags: ["Next.js", "Node.js", "MongoDB", "Docker"],
    status: "In Development",
    overview:
      "LordCloud is a game server hosting storefront — pick a game (Minecraft, Rust, Palworld, Valheim, Terraria), choose a plan starting at $9.99, and get an unlimited-slot, unlimited-bandwidth server running, backed by a client dashboard and cart for managing it.",
    problem:
      "Most game server hosts either bury pricing behind a maze of add-ons or make you configure things a casual player shouldn't have to think about. The goal was a storefront simple enough to go from 'pick a game' to 'server running' in a couple of clicks, without hiding the real cost.",
    research:
      "Looked at established game hosts (Shockbyte, BisectHosting, Apex) for what makes a hosting storefront feel trustworthy — clear per-game pricing, obvious resource limits (or lack thereof), and a fast checkout — versus what makes them feel like a bait-and-switch.",
    design:
      "Game-first navigation: each supported game (Minecraft, Rust, Palworld, Valheim, Terraria) gets its own tab and hero treatment, with pricing and 'unlimited slots/storage/bandwidth' stated up front instead of buried in a features table.",
    development:
      "Next.js storefront with a Node.js API handling orders, provisioning requests, and account state in MongoDB. Server instances run in Docker containers so each game server is isolated and can be spun up or torn down on demand.",
    challenges:
      "Provisioning real game servers on demand — rather than just selling a plan and manually setting it up — is the part that separates a hosting storefront from a hosting business. Getting that provisioning path reliable across five different games is the current bottleneck.",
    architecture:
      "Next.js storefront + client dashboard → Node.js API (orders, accounts, provisioning) → MongoDB for account/order state → Docker-hosted game server containers per purchase.",
    gallery: ["/projects/lordcloud/screenshot-1.png"],
    results:
      "In active development, with the storefront, pricing, and multi-game navigation live. Next milestone is wiring automated provisioning so a purchase turns into a running server without manual setup.",
    lessons:
      "In hosting, the storefront sells the plan but the dashboard sells the renewal — the post-purchase experience matters as much as the landing page.",
  },
  {
    slug: "ai-for-public-safety",
    number: "03",
    title: "AI for Public Safety",
    subtitle: "Smart Monitoring System",
    href: "https://public-safety-ai.vercel.app",
    description:
      "An AI-powered public safety platform designed to monitor environments, detect potential threats, and respond in real time. Using computer vision and intelligent alert systems, it enhances security across public spaces — enabling faster response, improved awareness, and proactive risk prevention.",
    tags: ["Python", "OpenCV", "YOLO", "TensorFlow", "Arduino"],
    status: "In Development",
    overview:
      "A computer-vision-driven monitoring system that watches a space, flags potential safety risks in real time, and raises alerts — built to make public spaces more responsive without adding headcount.",
    problem:
      "Manual monitoring doesn't scale, and most 'smart' surveillance either overpromises on accuracy or is too costly for smaller public spaces to deploy. The goal was a lean pipeline that a modest camera-plus-compute setup could actually run.",
    research:
      "Compared object-detection models (YOLO variants) for the accuracy/speed tradeoff on constrained hardware, and looked at how existing public-safety systems structure alerting to avoid false-positive fatigue.",
    design:
      "Kept the alerting model simple and legible: clear risk categories, a visible confidence signal, and a log trail — designed so a non-technical operator could trust and act on an alert quickly.",
    development:
      "Python and OpenCV handle the video pipeline, YOLO performs real-time object/threat detection, TensorFlow backs the classification layer, and an Arduino-based sensor layer extends the system beyond pure vision.",
    challenges:
      "Balancing detection latency against accuracy on limited hardware was the central constraint — every model choice was really a tradeoff between 'catches it in time' and 'doesn't cry wolf.'",
    architecture:
      "Camera feed → OpenCV preprocessing → YOLO detection → TensorFlow classification → alert dispatch, with an Arduino layer providing supplementary sensor input.",
    gallery: ["/projects/ai-for-public-safety/screenshot-1.png"],
    results:
      "In active development, with the detection-to-alert pipeline validated in test scenarios. Next milestone is field-testing detection accuracy under real lighting and environmental conditions.",
    lessons:
      "For safety-critical systems, the model is the easy part — the hard part is designing alerts people will actually trust and act on.",
  },
];

export const getProjectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug);

/**
 * Cross-references a skill name against real project tech tags — used by
 * the Skills capsules to show "Used in: SpokeBike, LordCloud" honestly,
 * instead of a fabricated per-skill project count.
 */
export const projectsUsingTech = (techName: string): Project[] => {
  const key = techName.toLowerCase();
  return PROJECTS.filter((p) =>
    p.tags.some((tag) => {
      const t = tag.toLowerCase();
      return key.includes(t) || t.includes(key);
    })
  );
};
