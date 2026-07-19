export const NAV_ITEMS = [
  { id: "home",       tKey: "header.home",           href: "/" },
  { id: "facilities", tKey: "header.ourFacilities",   href: "/#about" },
  { id: "our-team",   tKey: "header.ourTeam",         href: "/#team" },
] as const;

export const MORE_ITEMS = [
  { id: "blog",         tKey: "header.blog",          href: "/blog" },
  { id: "faq",          tKey: "header.faq",           href: "/#faq" },
  { id: "contact-page", tKey: "header.contactUs",     href: "/contact" },
  { id: "updates",      tKey: "header.updates",       href: "/#updates" },
  { id: "privacy",      tKey: "header.privacyPolicy", href: "/privacy" },
] as const;
