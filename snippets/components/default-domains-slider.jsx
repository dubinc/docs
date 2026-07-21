export const DefaultDomainsSlider = () => {
  const cards = [
    {
      name: "Amazon",
      slug: "amazon",
      icon: "https://dub.co/_mintlify/static/dub/images/default-domains/amazon.svg",
    },
    {
      name: "Figma",
      slug: "figma",
      icon: "https://dub.co/_mintlify/static/dub/images/default-domains/figma.svg",
    },
    {
      name: "GitHub",
      slug: "github",
      icon: "https://dub.co/_mintlify/static/dub/images/default-domains/github.svg",
    },
    {
      name: "Spotify",
      slug: "spotify",
      icon: "https://dub.co/_mintlify/static/dub/images/default-domains/spotify.svg",
    },
    {
      name: "ChatGPT",
      slug: "chatgpt",
      icon: "https://dub.co/_mintlify/static/dub/images/default-domains/chatgpt.svg",
    },
    {
      name: "Google",
      slug: "google",
      icon: "https://dub.co/_mintlify/static/dub/images/default-domains/google.svg",
    },
  ];

  return (
    <div className="not-prose relative mb-8 flex h-80 items-center overflow-hidden">
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden pb-4 py-4 px-4 cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {cards.map((card) => (
          <a
            key={card.slug}
            href={`https://dub.co/tools/${card.slug}-link-shortener`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 w-[320px] h-64 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/40 dark:bg-gray-800/80 p-6 shadow-md shadow-gray-400/10 dark:shadow-black/30 backdrop-blur-sm transition-all duration-75 hover:bg-white dark:hover:bg-gray-700/90 active:cursor-grabbing no-underline text-inherit relative overflow-hidden [background-size:16px_16px] "
          >
            <h3 className="mb-2 text-left font-semibold text-gray-800 dark:text-gray-100">
              {card.name} Link
            </h3>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 group-hover:gap-2 transition-all duration-100">
              <span className="font-semibold">Shortener</span>
              <span>→</span>
            </div>
            <div className="absolute -bottom-10 -right-8 z-10 w-1/2">
              <img
                src={card.icon}
                alt={card.name}
                className="h-[222px] w-[222px] object-contain"
              />
            </div>
            <div className="absolute bottom-0 left-0 h-32 w-3/5">
              <img
                src="https://dub.co/_mintlify/static/dub/images/default-domains/background-grid.svg"
                alt=""
                className="h-full w-full object-cover object-left-bottom dark:invert dark:opacity-60"
                aria-hidden
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
