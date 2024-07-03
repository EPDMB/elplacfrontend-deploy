import { CallToAction } from "@/components/CallToAction";
import { Contact } from "@/components/Contact";
import { Reviews } from "@/components/Reviews";
import { Solidarity } from "@/components/Solidarity";
import { Suscribe } from "@/components/Suscribe";

export default function Home() {
  return (
    <main>
      <section>
        <CallToAction />
      </section>
      <section>
        <Reviews />
      </section>
      <section>
        <Contact />
      </section>
      <section>
        <Solidarity />
      </section>
      <section>
        <Suscribe />
      </section>
    </main>
  );
}
