
export default function Loading() {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-3xl font-bold mb-8">Your Collections</h1>
        <div className="relative">
          <div className="flex space-x-6 overflow-x-auto pb-8">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-64 rounded-lg overflow-hidden animate-pulse">
                <div className="bg-gray-800 h-96 w-64"></div>
                <div className="h-6 bg-gray-800 rounded w-20 mt-3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }