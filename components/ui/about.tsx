import Image from "next/image";
import diagramImg from "@/assets/about_diagram.png";

export default function About() {
  return (
    <div className="space-y-8 bg-[#f5f5f5] p-6 rounded-xl font-serif">
      <div className="bg-white rounded-xl p-6 lg:px-20 xl:px-40 shadow-lg border text-black border-white/10 space-y-8">
        {/* Reasons for existing */}
        <section>
          <h2 className="flex w-full justify-center text-2xl lg:text-3xl font-bold mb-4">
            Reasons for existing
          </h2>
          <p className="text-black leading-relaxed">
            The idea of this project was born at the intersection of three
            observations:
          </p>
          <ul className="list-disc list-inside space-y-2 text-black mt-3">
            <li>
              AI analytics is an emerging market, promising to become as big as,
              if not bigger than, AI coding.
            </li>
            <li>
              There’s no specific tool on the internet for people to explore
              this landscape.
            </li>
            <li>
              Scraped marketing materials fail to provide an accurate picture of
              the tools’ capabilities and limitations.
            </li>
          </ul>

          <p className="mt-4 text-black leading-relaxed">
            There are plenty of AI tool directories and lists. Still, they lack
            two major components that we believe are essential for delivering
            value in the face of an emerging technology:
          </p>
          <p className="mt-2 font-semibold">Expert opinion and Curation</p>

          <p className="mt-4 text-black leading-relaxed">
            Everyone knows that Intercom and Zendesk deliver on the “enabling
            live communication between support teams and clients” outcome — it
            is an established and well-understood category.
          </p>
          <p className="mt-3 text-black leading-relaxed">
            However, few people are aware of the tools that enable users to
            “make AI agents understand my data.” Even more importantly, it is
            not clear what outcomes are even possible.
          </p>
        </section>

        <div className="flex w-full justify-center">
          <Image src={diagramImg} alt="" width={400} height={400} className="w-[600px] lg:h-[300px]" />
        </div>

        {/* Expert opinion */}
        <section>
          <h3 className="text-xl lg:text-2xl font-semibold mb-3">
            Expert opinion comes in three forms:
          </h3>
          <ul className="list-disc list-inside space-y-3 text-black">
            <li>
              <strong>“Opinionated” categorization</strong> that enables users
              to effectively map their needs to tools, providing a comprehensive
              view of tools serving the same primary outcome.
            </li>
            <li>
              <strong>“Details” information</strong> that assesses the tool from
              the prism of jobs-to-be-done, capabilities, and differentiators,
              as opposed to marketing-driven benefits.
            </li>
            <li>
              <strong>“How to Use” page</strong> provides the framework to learn
              about key attributes of the landscape and the tools to navigate
              this landscape effectively.
            </li>
          </ul>
        </section>

        {/* Curation */}
        <section>
          <h3 className="text-xl lg:text-2xl font-semibold mb-3">Curation</h3>
          <p className="text-black leading-relaxed">
            Every entry on the list has been manually selected and belongs here.
            It also means that new tools launched will be added promptly,
            ensuring exhaustiveness at any given moment. Finally, it means that
            the information on the list is up-to-date.
          </p>
        </section>

        {/* Data and content */}
        <section>
          <h2 className="flex w-full justify-center text-2xl lg:text-3xl font-bold mb-4">
            Data and content
          </h2>
          <p className="text-black leading-relaxed">
            The initial list of tools comes from Josh’s personal compilation —
            he is a founder of an AI analytics tool himself. This list was built
            out of necessity — he had to keep his finger on the pulse of the
            latest developments. This initial list was then revised, enriched,
            and extended to include every tool on the market and all the
            relevant information.
          </p>
          <p className="mt-3 text-black leading-relaxed">
            The list will be updated at least on a bi-weekly basis to ensure
            exhaustiveness and accuracy. If there’s a new tool, it will be
            added; if a startup dies or pivots, it will be removed. If new
            functionality is launched, it will be added.
          </p>
        </section>

        {/* Vision and community */}
        <section>
          <h2 className="flex w-full justify-center text-2xl lg:text-3xl font-bold mb-4">
            Project vision and community
          </h2>
          <p className="text-black leading-relaxed">
            We envision this project becoming a place to learn about the AI
            analytics market and the initial decision point for considering AI
            analytics tools.
          </p>
          <p className="mt-3 text-black leading-relaxed">
            As a startup founder (Josh) and a startup PM (Mike), we know it is
            close to impossible to build a useful product without close contact
            with its users. So we encourage you to send any suggestions, ideas,
            or criticism (we mean it) to X or Y.
          </p>
          <p className="mt-3 text-black leading-relaxed">
            If you think we missed a tool that belongs, use the “Suggest” button
            on the main page.
          </p>
        </section>

        {/* Credits */}
        <section>
          <h2 className="flex w-full justify-center text-2xl lg:text-3xl font-bold mb-4">
            Credits
          </h2>
          <ul className="list-disc list-inside space-y-3 text-black">
            <li>
              <strong>Josh Harris</strong>, founder of the Semantic Layer
              startup AnswerLayer, for providing hand-crafted data and
              committing his time to curating the content.
            </li>
            <li>
              <strong>Mike Kosorukov</strong>, startup PM, for revising the
              content, putting this app together, and getting it out into the
              world.
            </li>
            <li>
              <strong>Dan Hockenmaier</strong>, an analytics mastermind, for
              inspiring this idea.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
