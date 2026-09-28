/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Pillars } from './components/Pillars';
import { Timeline } from './components/Timeline';
import { Universe } from './components/Universe';
import { Discography } from './components/Discography';
import { Duality } from './components/Duality';
import { Gallery } from './components/Gallery';
import { Docuseries } from './components/Docuseries';
import { FlyMovement } from './components/FlyMovement';
import { SocialFeed } from './components/SocialFeed';
import { Footer } from './components/Footer';
import { LoreGlossary } from './components/LoreGlossary';
import { FanKit } from './components/FanKit';
import { AmbientSoundscape } from './components/AmbientSoundscape';

export default function App() {
  return (
    <div className="bg-brand-black min-h-screen text-white selection:bg-brand-green selection:text-black">
      <AmbientSoundscape />
      <LoreGlossary />
      <FanKit />
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <Pillars />
        <Universe />
        <Discography />
        <Duality />
        <Gallery />
        <Docuseries />
        <FlyMovement />
        <SocialFeed />
      </main>
      <Footer />
    </div>
  );
}
