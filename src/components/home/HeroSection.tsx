import { getSiteSettingsForHero } from "@/actions/settings";
import HeroSectionClient from "./HeroSectionClient";

export default async function HeroSection() {
  const settings = await getSiteSettingsForHero();
  return <HeroSectionClient settings={settings} />;
}
