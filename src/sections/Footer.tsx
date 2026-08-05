import { TapeRule } from "../components/TapeRule";

export function Footer() {
  return (
    <footer>
      <TapeRule />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-10 md:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-chalk">Hichens <span className="italic text-brass">{"&"}</span> Sons</p>
          <p className="mt-1 font-mono text-xs tracking-wide text-chalk/55">An operational software studio.</p>
        </div>
        <nav aria-label="Footer" className="flex gap-7 text-sm text-chalk/55">
          <a href="#work" className="link-wipe hover:text-chalk">The work</a>
          <a href="#how" className="link-wipe hover:text-chalk">How we work</a>
          <a href="#story" className="link-wipe hover:text-chalk">Story</a>
          <a href="#contact" className="link-wipe hover:text-chalk">Contact</a>
        </nav>
        <p className="font-mono text-xs text-chalk/55">
          Hichens &amp; Sons · Virginia · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
