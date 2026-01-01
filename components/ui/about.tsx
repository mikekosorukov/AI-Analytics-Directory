import Image from "next/image";
import diagramImg from "@/assets/about_diagram.png";
import { IBM_Plex_Sans } from 'next/font/google';
import { CheckCircle2, Users, Target, Award, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const IBM = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function About() {
  return (
    <div className={`space-y-8 mt-16 bg-[#f5f5f5] p-6 rounded-xl font-serif selection-custom text-lg ${IBM.className}`}>
      <div className="bg-white rounded-xl p-6 lg:px-20 xl:px-40 shadow-lg border text-black border-white/10 space-y-12">
        {/* Reasons for existing */}
        <section>
          <div className='mb-8'>
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900">
              Reasons for existing
            </h2>
            <div className='w-20 h-1 bg-[#E67F44] rounded-full' />
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            The idea of this project was born at the intersection of three
            observations:
          </p>
          <div className='space-y-3 my-6'>
            <div className='flex gap-3 items-start p-4 rounded-lg bg-blue-50 border border-blue-100 text-base'>
              <CheckCircle2 className='w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0' />
              <p className='text-gray-700 leading-relaxed'>
                AI analytics is an emerging market, promising to become as big as,
                if not bigger than, AI coding.
              </p>
            </div>
            <div className='flex gap-3 items-start p-4 rounded-lg bg-blue-50 border border-blue-100 text-base'>
              <CheckCircle2 className='w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0' />
              <p className='text-gray-700 leading-relaxed'>
                There's no specific tool on the internet for people to explore
                this landscape.
              </p>
            </div>
            <div className='flex gap-3 items-start p-4 rounded-lg bg-blue-50 border border-blue-100 text-base'>
              <CheckCircle2 className='w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0' />
              <p className='text-gray-700 leading-relaxed'>
                Scraped marketing materials fail to provide an accurate picture of
                the tools' capabilities and limitations.
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            There are plenty of AI tool directories and lists. Still, they lack
            two major components that we believe are essential for delivering
            value in the face of an emerging technology:
          </p>
          <div className='mb-8'>
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900">
              Expert opinion and Curation
            </h2>
            <div className='w-16 h-1 bg-[#E67F44] rounded-full' />
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Everyone knows that Intercom and Zendesk deliver on the "enabling
            live communication between support teams and clients" outcome — it
            is an established and well-understood category.
          </p>
          <p className="text-gray-700 leading-relaxed">
            However, few people are aware of the tools that enable users to
            "make AI agents understand my data." Even more importantly, it is
            not clear what outcomes are even possible.
          </p>
        </section>

        <div className="flex w-full justify-center my-8">
          <Image
            src={diagramImg}
            alt="AI analytics diagram"
            width={400}
            height={400}
            className="w-[600px] lg:h-[300px] rounded-lg shadow-md border border-gray-200"
          />
        </div>

        <Separator className='my-8' />

        {/* Expert opinion */}
        <section>
          <div className='mb-8'>
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900">
              Expert opinion comes in three forms:
            </h2>
            <div className='w-16 h-1 bg-[#E67F44] rounded-full' />
          </div>
          <div className='grid gap-4 my-6'>
            <div className='bg-gradient-to-r from-purple-50 to-white border border-purple-100 rounded-xl p-6 shadow-sm text-base'>
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-purple-100 rounded-lg'>
                  <Target className='w-6 h-6 text-purple-600' />
                </div>
                <div>
                  <h4 className='font-bold text-purple-900 mb-2 text-lg'>
                    "Opinionated" categorization
                  </h4>
                  <p className='text-gray-700 leading-relaxed'>
                    That enables users to effectively map their needs to tools, providing a comprehensive
                    view of tools serving the same primary outcome.
                  </p>
                </div>
              </div>
            </div>
            <div className='bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-xl p-6 shadow-sm text-base'>
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-blue-100 rounded-lg'>
                  <Target className='w-6 h-6 text-blue-600' />
                </div>
                <div>
                  <h4 className='font-bold text-blue-900 mb-2 text-lg'>
                    The "Details" information
                  </h4>
                  <p className='text-gray-700 leading-relaxed'>
                    That assesses the tool from the prism of jobs-to-be-done, capabilities, and
                    differentiators, as opposed to marketing-driven benefits.
                  </p>
                </div>
              </div>
            </div>
            <div className='bg-gradient-to-r from-green-50 to-white border border-green-100 rounded-xl p-6 shadow-sm text-base'>
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-green-100 rounded-lg'>
                  <Target className='w-6 h-6 text-green-600' />
                </div>
                <div>
                  <h4 className='font-bold text-green-900 mb-2 text-lg'>
                    "How to Use" page
                  </h4>
                  <p className='text-gray-700 leading-relaxed'>
                    Provides the framework to learn about key attributes of the landscape and the tools to navigate
                    this landscape effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator className='my-8' />

        {/* Curation */}
        <section>
          <div className='mb-8'>
            <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900">
              Curation
            </h3>
            <div className='w-16 h-1 bg-[#E67F44] rounded-full' />
          </div>
          <p className="text-gray-700 leading-relaxed">
            Curation means that every entry on the list has been manually
            selected and belongs here. It also means that new tools launched
            will be added promptly, ensuring exhaustiveness at any given moment.
            Finally, it means that the information on the list is up-to-date.
          </p>
        </section>

        <Separator className='my-8' />

        {/* Data and content */}
        <section>
          <div className='mb-8'>
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900">
              Data and content
            </h2>
            <div className='w-20 h-1 bg-[#E67F44] rounded-full' />
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            The initial list of tools comes from Josh's personal compilation —
            he is a founder of an AI analytics tool himself. This list was built
            out of necessity — he had to keep his finger on the pulse of the
            latest developments. This initial list was then revised, enriched,
            and extended to include every tool on the market and all the
            relevant information.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The list will be updated at least on a bi-weekly basis to ensure
            exhaustiveness and accuracy. If there's a new tool, it will be
            added; if a startup dies or pivots, it will be removed. If new
            functionality is launched, it will be added.
          </p>
        </section>

        <Separator className='my-8' />

        {/* Vision and community */}
        <section>
          <div className='mb-8'>
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900">
              Project vision and community
            </h2>
            <div className='w-20 h-1 bg-[#E67F44] rounded-full' />
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            We envision this project becoming a place to learn about the AI
            analytics market and the initial decision point for considering AI
            analytics tools.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            As a startup founder (Josh) and a startup PM (Mike), we know it is
            close to impossible to build a useful product without close contact
            with its users. So we encourage you to send any suggestions, ideas,
            or criticism (we mean it) to X or Y.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you think we missed a tool that belongs, use the{' '}
            <span className='px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-medium'>
              Suggest
            </span>{' '}
            button on the main page.
          </p>
        </section>

        <Separator className='my-8' />

        {/* Credits */}
        <section>
          <div className='mb-8'>
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900">
              Credits
            </h2>
            <div className='w-20 h-1 bg-[#E67F44] rounded-full' />
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            This project was made possible thanks to:
          </p>
          <div className='grid gap-6'>
            <div className='bg-gradient-to-r from-purple-50 to-white border border-purple-100 rounded-xl p-6 shadow-sm text-base'>
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-purple-100 rounded-full'>
                  <Award className='w-6 h-6 text-purple-600' />
                </div>
                <div className='flex-1'>
                  <h4 className='font-bold text-purple-900 mb-2 text-lg'>
                    Josh Harris
                  </h4>
                  <p className='text-gray-700 leading-relaxed mb-3'>
                    The founder of the Semantic Layer startup{' '}
                    <a
                      href="https://getanswerlayer.com"
                      target='_blank'
                      className="inline-flex items-center gap-1 text-blue-600 font-semibold underline underline-offset-2 hover:bg-blue-100 px-1 rounded transition-colors"
                    >
                      AnswerLayer
                      <ExternalLink className='w-3 h-3' />
                    </a>
                    , for providing hand-crafted data and committing his time to
                    curating the content.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/josh-harris-86188983/"
                    target='_blank'
                    className="inline-flex items-center gap-1 text-blue-600 font-medium underline underline-offset-2 hover:bg-blue-100 px-1 rounded transition-colors text-sm"
                  >
                    Follow Josh on LinkedIn
                    <ExternalLink className='w-3 h-3' />
                  </a>
                </div>
              </div>
            </div>

            <div className='bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-xl p-6 shadow-sm text-base'>
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-blue-100 rounded-full'>
                  <Award className='w-6 h-6 text-blue-600' />
                </div>
                <div className='flex-1'>
                  <h4 className='font-bold text-blue-900 mb-2 text-lg'>
                    Mike Kosorukov
                  </h4>
                  <p className='text-gray-700 leading-relaxed mb-3'>
                    A startup PM, for revising the content, putting this app together, and getting it out into the
                    world.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/mkosorukov/"
                    target='_blank'
                    className="inline-flex items-center gap-1 text-blue-600 font-medium underline underline-offset-2 hover:bg-blue-100 px-1 rounded transition-colors text-sm"
                  >
                    Follow Mike on LinkedIn
                    <ExternalLink className='w-3 h-3' />
                  </a>
                </div>
              </div>
            </div>

            <div className='bg-gradient-to-r from-green-50 to-white border border-green-100 rounded-xl p-6 shadow-sm text-base'>
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-green-100 rounded-full'>
                  <Award className='w-6 h-6 text-green-600' />
                </div>
                <div className='flex-1'>
                  <h4 className='font-bold text-green-900 mb-2 text-lg'>
                    Dan Hockenmaier
                  </h4>
                  <p className='text-gray-700 leading-relaxed mb-3'>
                    An analytics mastermind, for inspiring this idea.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/dan-hock/"
                    target='_blank'
                    className="inline-flex items-center gap-1 text-green-600 font-medium underline underline-offset-2 hover:bg-green-100 px-1 rounded transition-colors text-sm"
                  >
                    Follow Dan on LinkedIn
                    <ExternalLink className='w-3 h-3' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
