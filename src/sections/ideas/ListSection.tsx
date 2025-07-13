import { useState } from "react";
import Dropdown from "../../components/Dropdown";
import PostCard from "../../components/PostCard";
import { usePost } from "../../hooks/usePost";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const ListSection = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("-published_at");

  const { data, isLoading, error, isError } = usePost({
    page: {
      number: currentPage,
      size: pageSize,
    },
    append: ["small_image", "medium_image"],
    sort: sortBy,
  });

  if (isLoading) {
    return (
      <section>
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="bg-white w-full rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-full h-48 bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <div className="container px-4">
          <div className="flex justify-center items-center h-64">
            <p>Error loading posts: {error?.message}</p>
          </div>
        </div>
      </section>
    );
  }

  const showingFrom = data?.meta.from || 0;
  const showingTo = data?.meta.to || 0;
  const totalPosts = data?.meta.total || 0;

  return (
    <section>
      <div className="container px-4">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">
          <h3 className="text-sm md:text-base">
            Showing {showingFrom}-{showingTo} of {totalPosts}
          </h3>
          <div className="flex flex-row gap-4 sm:gap-8">
            <div className="flex items-center gap-2 sm:gap-4">
              <p className="text-sm md:text-base whitespace-nowrap">
                Show per page
              </p>
              <Dropdown
                options={[
                  { value: 10, label: "10" },
                  { value: 20, label: "20" },
                  { value: 50, label: "50" },
                ]}
                onChange={(value) => {
                  setPageSize(value as number);
                  setCurrentPage(1);
                }}
                defaultValue={pageSize}
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <p className="text-sm md:text-base">Sort by</p>
              <Dropdown
                options={[
                  { value: "-published_at", label: "Newest" },
                  { value: "published_at", label: "Oldest" },
                ]}
                onChange={(value) => {
                  setSortBy(value as string);
                  setCurrentPage(1);
                }}
                defaultValue={sortBy}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {data?.data.map((post) => (
            <PostCard
              key={post.id}
              date={post.published_at}
              title={post.title}
              imageUrl={
                post.medium_image?.[0]?.url || post.small_image?.[0]?.url || ""
              }
            />
          ))}
        </div>

        {data?.meta.last_page && data.meta.last_page > 1 && (
          <div className="flex justify-center mt-8 gap-1 overflow-x-auto py-2">
            {data.meta.links.map((link, index) => {
              if (link.label === "&laquo; Previous") {
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={!link.url}
                    className="px-2 sm:px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 flex items-center gap-2 transition-colors"
                  >
                    <IoChevronBack className="w-4 h-4" />
                  </button>
                );
              }

              if (link.label === "Next &raquo;") {
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={!link.url}
                    className="px-2 sm:px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 flex items-center gap-2 transition-colors"
                  >
                    <IoChevronForward className="w-4 h-4" />
                  </button>
                );
              }

              if (link.label === "...") {
                return (
                  <span key={index} className="px-2 sm:px-3 py-2 text-gray-500">
                    ...
                  </span>
                );
              }

              const pageNumber = parseInt(link.label);
              if (!isNaN(pageNumber)) {
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-2 sm:px-3 py-2 rounded-md hover:bg-gray-100 min-w-[32px] sm:min-w-[40px] text-sm sm:text-base transition-colors ${
                      link.active
                        ? "bg-primary text-white hover:bg-primary/70"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ListSection;
