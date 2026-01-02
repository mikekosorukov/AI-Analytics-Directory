import { IBM_Plex_Sans } from 'next/font/google';
import { forwardRef } from 'react';
import { CheckCircle2, Lightbulb, Target, Info, AlertCircle, Sparkles } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const IBM = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const HowTo = forwardRef<HTMLDivElement>((_, ref) => (
	<div
		className={`space-y-8 mt-16 bg-[#f5f5f5] p-6 rounded-xl selection-custom text-lg ${IBM.className}`}
		ref={ref}
	>
		<div className='bg-white rounded-xl p-6 lg:px-40 shadow-lg border text-black space-y-12 border-white/10'>
			<section className='mb-3'>
				<div className='mb-8'>
					<h2 className='text-2xl lg:text-3xl font-bold mb-3 text-gray-900'>
						Current state of AI Analytics
					</h2>
					<div className='w-20 h-1 bg-[#E67F44] rounded-full' />
				</div>
				<p className='text-gray-700 leading-relaxed mb-6'>
					If we get to the bottom of things, all analytics tools have enabled
					just one thing: to get from raw data to insights that can be
					interpreted by non-technical humans and acted upon to drive business
					outcomes. AI analytics leverages the emerging AI technology at certain
					stages in the pipeline to primarily deliver on two improvements:
				</p>
				<div className='space-y-3 my-6'>
					<div className='flex gap-3 items-start p-4 rounded-lg bg-green-50 border border-green-100 text-base'>
						<CheckCircle2 className='w-5 h-5 text-green-600 mt-0.5 flex-shrink-0' />
						<p className='text-gray-700 leading-relaxed'>Make analytics faster for data analysts and engineers.</p>
					</div>
					<div className='flex gap-3 items-start p-4 rounded-lg bg-green-50 border border-green-100 text-base'>
						<CheckCircle2 className='w-5 h-5 text-green-600 mt-0.5 flex-shrink-0' />
						<p className='text-gray-700 leading-relaxed'>
							Allow a broader range of non-technical individuals to gain insights
							without the assistance of data engineers.
						</p>
					</div>
				</div>
				<p className='text-gray-700 leading-relaxed mb-6'>
					This list contains all the tools on the spectrum—from full-stack
					analytics platforms to specialized developer tools solving a specific
					problem.
				</p>
				
				<p className='text-gray-700 leading-relaxed mb-6'>
					AI analytics could grow massively, but it's still in its infancy at
					the moment. This is not surprising, given that the underlying
					technology is a living and breathing substance that is yet to shape
					into something that anybody can understand.
				</p>
				
				<p className='text-gray-700 leading-relaxed mb-6'>
					As always with emerging and fragmented markets, there are lots of AI
					analytics tools that pop up. All of them are trying to figure out the
					best ways to solve existing problems in new, unique ways. Oftentimes,
					their use cases overlap, and there are no clear winners at the moment.
					In our view, this is the perfect time to jump in and get to understand
					this landscape and leverage this emerging technology to get a head
					start.
				</p>
				<p className='text-gray-700 leading-relaxed'>
					In the face of emerging technology, it's very beneficial to get to the
					bottom of things and look at all of these tools from the perspective
					of the outcomes these tools deliver on or the{' '}
					<span className='px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-medium'>
						"jobs"
					</span>{' '}
					that users{' '}
					<span className='px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-medium'>
						"hire"
					</span>{' '}
					these tools to deliver.
				</p>
			</section>

			<Separator className='my-8' />

		<section id='categorization' className='scroll-mt-24'>
			<div className='mb-8'>
				<h2 className='text-2xl lg:text-3xl font-bold mb-3 text-gray-900'>
					Categorization
				</h2>
				<div className='w-20 h-1 bg-[#E67F44] rounded-full' />
			</div>
				<p className='text-gray-700 leading-relaxed mb-6'>
					To make this directory useful and easy to navigate, it is essential to
					categorize the tools. Although categorization is somewhat arbitrary as
					startups add new features or make soft pivots toward other audiences,
					it can make it possible for them to migrate from one category to
					another.
				</p>

				<div className='rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm'>
					<table className='w-full table-auto border-collapse text-base'>
						<tbody>
							<tr className='border-b border-gray-200 even:bg-gray-50'>
								<td className='font-bold px-6 py-4 align-top border-r border-gray-200 bg-gradient-to-r from-blue-50 to-transparent w-[190px]'>
									<span className='text-blue-700'>Text to SQL</span>
								</td>
								<td className='px-6 py-4 text-gray-700 leading-relaxed'>
									The simplest of the bunch, this was one of the first
									categories to emerge after ChatGPT came out. It is generally
									seen as demo software that's not suitable for real-world use.
								</td>
							</tr>

							<tr className='border-b border-gray-200 even:bg-gray-50'>
								<td className='font-bold px-6 py-4 align-top border-r border-gray-200 bg-gradient-to-r from-blue-50 to-transparent w-[190px]'>
									<span className='text-blue-700'>AI Analyst</span>
								</td>
								<td className='px-6 py-4 text-gray-700 leading-relaxed'>
									<p className='mb-4'>
										The biggest common denominator for tools in this category is that (at least in their vision) they strive to take on the job of a full-time analyst so that every non-technical employee can get self-serve business insights without SQL/Python/data engineering help.
									</p>
									<p className='mb-4'>
										This most often includes several "jobs": chatting with a natural-language LLM agent that runs queries against data sources under the hood; generating dashboards, reports, and data products; and distributing the insights across teams and channels.
									</p>
									<p>
										These tools are the natural evolution of the basic "text-to-SQL" tools, but unlike them, AI analyst tools more often than not require data engineers to correctly set them up on top of existing data infrastructure before business users can use them.
									</p>
								</td>
							</tr>

							<tr className='border-b border-gray-200 even:bg-gray-50'>
								<td className='font-bold px-6 py-4 align-top border-r border-gray-200 bg-gradient-to-r from-blue-50 to-transparent w-[190px]'>
									<span className='text-blue-700'>Semantic layer</span>
								</td>
								<td className='px-6 py-4 text-gray-700 leading-relaxed'>
									<p className='mb-4'>
										Semantic-layer platforms map complex data into familiar business terms so that all users can access the same source of truth, with full confidence in its integrity through this unified enterprise data layer. It helps keep all definitions and business logic in one place and then manage and change them centrally.
									</p>
									<p className='mb-4'>
										Typically, these tools provide the biggest benefits to larger enterprises that have lots of teams, each of which has its own definition of "gross revenue," so the costs of AI agents misinterpreting natural language pile up.
									</p>
									<p>
										Most of these tools provide natural-language AI agents, which makes them similar to the AI Analyst category; however, the latter has a much weaker focus on semantic modeling in favor of usability and speed.
									</p>
								</td>
							</tr>

							<tr className='border-b border-gray-200 even:bg-gray-50'>
								<td className='font-bold px-6 py-4 align-top border-r border-gray-200 bg-gradient-to-r from-blue-50 to-transparent w-[190px]'>
									<span className='text-blue-700'>AI Spreadsheets</span>
								</td>
								<td className='px-6 py-4 text-gray-700 leading-relaxed'>
									<p className='mb-4'>
										Tools in this category, unlike AI Analyst tools, focus on spreadsheets/csvs as data sources and provide a spreadsheet-based interface. On top of it sits an AI chat that allows users to perform calculations, data cleaning, and create pivot tables using natural language.
									</p>
									<p>
										Some of the tools offer a plugin that brings AI chat and other functions directly into the web versions of Excel or Sheets. The most sophisticated tools in this group allow for extra flexibility with Python or JS cells and database/API connectors.
									</p>
								</td>
							</tr>

							<tr className='border-b border-gray-200 even:bg-gray-50'>
								<td className='font-bold px-6 py-4 align-top border-r border-gray-200 bg-gradient-to-r from-blue-50 to-transparent w-[190px]'>
									<span className='text-blue-700'>Data IDEs</span>
								</td>
								<td className='px-6 py-4 text-gray-700 leading-relaxed'>
									<p className='mb-4'>
										Similar to traditional IDEs, data IDEs are AI data editors designed for data teams — connected to the data warehouse and business context, and powered by an agent that assists in writing SQL and Python code.
									</p>
									<p>
										They allow data scientists and engineers to create data pipelines, run analytics, explore data, and ensure data quality from a single integrated space.
									</p>
								</td>
							</tr>

							<tr className='border-b border-gray-200 even:bg-gray-50'>
								<td className='font-bold px-6 py-4 align-top border-r border-gray-200 bg-gradient-to-r from-blue-50 to-transparent w-[190px]'>
									<span className='text-blue-700'>Qualitative AI Analytics</span>
								</td>
								<td className='px-6 py-4 text-gray-700 leading-relaxed'>
									<p className='mb-4'>
										AI qualitative analytics tools help teams analyze unstructured customer data like interviews, support tickets, sales calls, surveys, and open-text feedback at scale. These tools detect intents, emotions, pain points, and emerging patterns, turning raw conversations into structured insights.
									</p>
									<p>
										Some of these tools focus on concrete use cases like exploratory analysis for academia or extracting issues coming from user&lt;&gt;LLM interactions. Others focus on product analytics or sales interactions, providing additional capabilities like sales-team training.
									</p>
								</td>
							</tr>

							<tr className='even:bg-gray-50'>
								<td className='font-bold px-6 py-4 align-top border-r border-gray-200 bg-gradient-to-r from-blue-50 to-transparent w-[190px]'>
									<span className='text-blue-700'>Data Pipeline Assistant</span>
								</td>
								<td className='px-6 py-4 text-gray-700 leading-relaxed'>
									<p className='mb-4'>
										Tools in this category use AI to help data teams design, build, and maintain data pipelines with far less manual effort. It understands warehouse schemas, lineage, and business logic, and automates repetitive tasks like mapping fields, generating tests, fixing broken queries, and detecting upstream/downstream impacts.
									</p>
									<p>
										These assistants reduce cognitive load, improve data quality, and speed up development cycles by acting as always-available copilots for data engineers.
									</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<Separator className='my-8' />

			<section>
				<div className='mb-8'>
					<h2 className='text-2xl lg:text-3xl font-bold mb-3 text-gray-900'>
						Expectations
					</h2>
					<div className='w-20 h-1 bg-[#E67F44] rounded-full' />
				</div>
				<div className='bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-6 text-base'>
					<div className='flex gap-3'>
						<Info className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' />
						<div>
							<h4 className='font-semibold text-blue-900 mb-2'>Set Realistic Expectations</h4>
							<p className='text-blue-800 leading-relaxed'>
								Given the state of the market, don't expect perfectly working apps;
								there's no beaten path here, so expect effectiveness gains at the
								expense of stability, scalability, and security.
							</p>
						</div>
					</div>
				</div>
			</section>

			<Separator className='my-8' />

			<section>
				<div className='mb-8'>
					<h2 className='text-2xl lg:text-3xl font-bold mb-3 text-gray-900'>
						Best practices using the directory
					</h2>
					<div className='w-20 h-1 bg-[#E67F44] rounded-full' />
				</div>
				<p className='text-gray-700 leading-relaxed mb-6'>
					First, go over the categories to get an initial sense of what each
					category does.
				</p>
				<p className='text-gray-700 leading-relaxed mb-6'>
					Then, go to the list of tools and filter by categories you're
					interested in learning more about.
				</p>
				<p className='text-gray-700 leading-relaxed mb-6'>
					View the details of the tool by clicking on it. The section is
					structured using a{' '}
					<span className='px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-medium'>
						jobs-to-be-done
					</span>{' '}
					framework in mind:
				</p>
				<div className='grid gap-4 my-6'>
					<div className='bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-base'>
						<h4 className='font-bold text-blue-600 mb-2'>
							What it is for
						</h4>
						<p className='text-gray-700 leading-relaxed'>
							Listing the problems this tool addresses.
						</p>
					</div>
					<div className='bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-base'>
						<h4 className='font-bold text-blue-600 mb-2'>
							Who it is for
						</h4>
						<p className='text-gray-700 leading-relaxed'>
							Listing the types of users this tool targets and who it solves the
							problems above for.
						</p>
					</div>
					<div className='bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-base'>
						<h4 className='font-bold text-blue-600 mb-2'>
							Benefits vs Status Quo
						</h4>
						<p className='text-gray-700 leading-relaxed'>
							Providing an overview of how these problems were solved in the past
							and what benefits this new solution has compared to them.
						</p>
					</div>
				</div>
			</section>
		</div>
	</div>
));

HowTo.displayName = 'HowTo';

export default HowTo;
