import { IBM_Plex_Sans } from 'next/font/google';

const IBM = IBM_Plex_Sans({ subsets: ['latin'] });

export default function HowTo() {
	return (
		<div
			className={`space-y-8 mt-16 bg-[#f5f5f5] p-6 rounded-xl selection-custom text-lg ${IBM.className}`}
		>
			<div className='bg-white rounded-xl p-6 lg:px-40 shadow-lg border text-black space-y-8 border-white/10'>
				<section className='mb-3'>
					<h2 className='flex w-full text-2xl lg:text-3xl font-bold mt-5 mb-8 capitalize'>
						Current state of AI Analytics
					</h2>
					<p className='text-black'>
						If we get to the bottom of things, all analytics tools have enabled
						just one thing: to get from raw data to insights that can be
						interpreted by non-technical humans and acted upon to drive business
						outcomes. AI analytics leverages the emerging AI technology at
						certain stages in the pipeline to primarily deliver on two
						improvements:
					</p>
					<ul className='list-disc list-inside space-y-2 text-black my-3'>
						<li>Make analytics faster.</li>
						<li>
							Allow a broader range of non-technical individuals to gain
							insights without the assistance of data engineers.
						</li>
					</ul>
					<p className='text-black mb-3'>
						This list contains all the tools on the spectrum—from full-stack
						analytics platforms to specialized developer tools solving a
						specific problem.
					</p>
					<p className='text-black mb-3'>
						AI analytics could grow massively, but it's still in its infancy at
						the moment. This is not surprising, given that the underlying
						technology is a living and breathing substance that is yet to shape
						into something that anybody can understand.
					</p>
					<p className='text-black mb-3'>
						As always with emerging and fragmented markets, there are lots of AI
						analytics tools that pop up. All of them are trying to figure out
						the best ways to solve existing problems in new, unique ways.
						Oftentimes, their use cases overlap, and there are no clear winners
						at the moment. In our view, this is the perfect time to jump in and
						get to understand this landscape and leverage this emerging
						technology to get a head start.
					</p>
					<p className='text-black'>
						In the face of emerging technology, it's very beneficial to get to
						the bottom of things and look at all of these tools from the
						perspective of the outcomes these tools deliver on or the{' '}
						<span className='font-bold'>"jobs" </span>
						that users <span className='font-bold'>"hire"</span> these tools to
						deliver.
					</p>
				</section>

				<section>
					<h2 className='flex w-full text-2xl lg:text-3xl font-bold mt-5 mb-8 capitalize'>
						Categorization
					</h2>
					<p className='text-black mb-3'>
						To make this directory useful and easy to navigate, it is essential
						to categorize the tools. Although categorization is somewhat
						arbitrary as startups add new features or make soft pivots toward
						other audiences, it can make it possible for them to migrate from
						one category to another.
					</p>

					<div className='rounded-xl overflow-hidden border border-gray-300 bg-white'>
						<table className='w-full table-auto border-collapse text-black mb-3'>
							<tbody>
								<tr className='border-b border-gray-200'>
									<td className='font-bold p-2 align-top border-r'>
										Data engineering assistant
									</td>
									<td className='p-2'>
										These tools are a refinement of general coding assistants,
										focusing on writing data pipelines that move data from one
										storage system to another.
									</td>
								</tr>

								<tr className='border-b border-gray-200'>
									<td className='font-bold p-2 align-top border-r'>
										Database native
									</td>
									<td className='p-2'>
										Many cloud databases are building out AI assistants for
										analyzing data stored within them. These have the advantage
										of being directly integrated, with the disadvantage of being
										unable to access data in other databases.
									</td>
								</tr>

								<tr className='border-b border-gray-200'>
									<td className='font-bold p-2 align-top border-r'>
										Semantic layer
									</td>
									<td className='p-2'>
										Like a repository for reusable query patterns and
										calculations, these tools encode definitions to ensure that
										metrics and measures are repeatable and consistent over
										time. They sit between the database and the analyst.
										Increasingly, this is seen as a requirement for truly useful
										conversational analytics.
									</td>
								</tr>

								<tr className='border-b border-gray-200'>
									<td className='font-bold p-2 align-top border-r'>
										Embedding Analytics
									</td>
									<td className='p-2'>
										White-labeled tools that allow analytics to be embedded in
										other products.
									</td>
								</tr>

								<tr className='border-b border-gray-200'>
									<td className='font-bold p-2 align-top border-r'>
										AI Analyst
									</td>
									<td className='p-2'>
										These tools often mix SQL with Python, sometimes in a
										notebook format. They aim to be a one-to-one replacement for
										a data analyst, including visualization and summarization.
									</td>
								</tr>

								<tr className='border-b border-gray-200'>
									<td className='font-bold p-2 align-top border-r'>
										SaaS Tool Aggregator
									</td>
									<td className='p-2'>
										These tools focus on connecting to other SaaS tools like
										Google Analytics, Facebook Ads, Shopify, etc. They are
										aiming for the small business/indie hacker market.
									</td>
								</tr>

								<tr className='border-b border-gray-200'>
									<td className='font-bold p-2 align-top border-r'>
										Text to SQL
									</td>
									<td className='p-2'>
										The simplest of the bunch, this was one of the first
										categories to emerge after ChatGPT came out. It is generally
										seen as demo software that’s not suitable for real-world
										use.
									</td>
								</tr>

								<tr className='border-b border-gray-200'>
									<td className='font-bold p-2 align-top border-r'>
										Data IDEs
									</td>
									<td className='p-2'>
										“Cursor for Data.” These tools assume people will continue
										to interact directly with SQL but need the nice features of
										an IDE, like autocomplete, schema exploration, etc.
									</td>
								</tr>

								<tr>
									<td className='font-bold p-2 align-top border-r'>
										AI Spreadsheets
									</td>
									<td className='p-2'>
										Integrating AI into the familiar spreadsheet interface.
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>

				<section>
					<h2 className='flex w-full text-2xl lg:text-3xl font-bold mt-5 mb-8 capitalize'>
						Expectations
					</h2>
					<p className='text-black mb-3'>
						Given the state of the market, don’t expect perfectly working apps;
						there’s no beaten path here, so expect effectiveness gains at the
						expense of stability, scalability, and security.
					</p>
				</section>

				<section>
					<h2 className='flex w-full text-2xl lg:text-3xl font-bold mt-5 mb-8 capitalize'>
						Best practices using the directory
					</h2>
					<p className='text-black mb-3'>
						First, go over the categories to get an initial sense of what each
						category does.
					</p>
					<p className='text-black mb-3'>
						Then, go to the list of tools and filter by categories you’re
						interested in learning more about.
					</p>
					<p className='text-black mb-3'>
						View the details of the tool by clicking on it. The section is
						structured using a jobs-to-be-done framework in mind:
					</p>
					<ul className='list-disc list-inside space-y-2 text-black mt-3'>
						<li>
							<span className='font-bold text-[#4739ba] underline'>
								What it is for:
							</span>{' '}
							Listing the problems this tool addresses.
						</li>
						<li>
							<span className='font-bold text-[#4739ba] underline'>
								Who it is for:
							</span>{' '}
							Listing the types of users this tool targets and who it solves the
							problems above for.
						</li>
						<li>
							<span className='font-bold text-[#4739ba] underline'>
								Vs. Status Quo Alternatives:
							</span>{' '}
							Providing an overview of how these problems were solved in the
							past and what benefits this new solution has compared to them.
						</li>
					</ul>
				</section>
			</div>
		</div>
	);
}
