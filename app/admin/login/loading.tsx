export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Header skeleton */}
          <div className="text-center pb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="space-y-1">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto"></div>
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>
          </div>

          {/* Form skeleton */}
          <div className="space-y-6">
            {/* Role selection skeleton */}
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-3 rounded-lg border-2 border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="flex-1 space-y-1">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Login method toggle skeleton */}
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>

            {/* Form fields skeleton */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Button skeleton */}
            <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>

            {/* Link skeleton */}
            <div className="text-center">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
