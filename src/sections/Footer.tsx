import { TapeRule } from "../components/TapeRule";

export function Footer() {
  return (
    <footer>
      <TapeRule />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-10 md:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-chalk">Saaspoke</p>
          <p className="mt-1 font-mono text-xs tracking-wide text-chalk/55">Software that serves you.</p>
        </div>
        <nav aria-label="Footer" className="flex gap-7 text-sm text-chalk/55">
          <a href="#work" className="link-wipe hover:text-chalk">Work</a>
          <a href="#pricing" className="link-wipe hover:text-chalk">Pricing</a>
          <a href="#story" className="link-wipe hover:text-chalk">Story</a>
          <a href="#contact" className="link-wipe hover:text-chalk">Contact</a>
        </nav>
        <p className="font-mono text-xs text-chalk/55">
          Saaspoke LLC · Virginia · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
