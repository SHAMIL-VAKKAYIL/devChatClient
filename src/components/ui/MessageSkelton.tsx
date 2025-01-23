
function MessageSkeleton() {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div>
      <div className="overflow-y-auto flex-1  p-4 space-y-4">
        {skeletonMessages.map((_, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-4 ${
              idx % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            </div>

            <div className="space-y-2">
              <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse" />
              <div
                className={`w-[200px] h-16 bg-gray-200 rounded-lg animate-pulse ${
                  idx % 2 === 0 ? "" : "ml-auto"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MessageSkeleton;
