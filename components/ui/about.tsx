export default function About() {
  return (
    <div className="space-y-8 bg-[#f5f5f5] p-6 rounded-xl font-serif">
      <div className="bg-white rounded-xl p-6 lg:px-40 shadow-lg border text-black border-white/10">
        <h2 className="flex w-full justify-center text-2xl lg:text-3xl font-bold mb-4 capitalize">
          Reason for existence
        </h2>
        <p className="text-black font-serif">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
        <h1 className="flex w-full justify-center text-2xl lg:text-3xl font-bold text-black mt-6 mb-4">
          Data and content curation
        </h1>
        <p className="text-black font-serif">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
        <div className="flex w-full justify-center">
          <div className="w-1/3 bg-gray-300 h-32 mt-4"></div>
        </div>
        <h2 className="flex w-full justify-center text-2xl lg:text-3xl font-bold text-black mt-6 mb-4">
          Community contribution
        </h2>
        <p className="text-black font-serif">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
      </div>
    </div>
  );
}