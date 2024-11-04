import React from "react";
import SearchFrom from "@/components/SearchFrom";
import StartupCard from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

const page = async ({ searchParams }) => {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const session = await auth();

  console.log("session:", session?.id);

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
        Explore Ideas<br/> And Share Your Voice
        </h1>
        {/* <h1 className="heading">
          Pitch Your Startup, <br /> Connect with Entrepreneurs
        </h1> */}
        <p className="sub-heading !max-w-3xl">
          A space to explore, create, and share your thoughts and ideas
        </p>

        <SearchFrom query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Blogs"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post, index) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p>Nothing</p>
          )}
        </ul>
      </section>


      <SanityLive />
    </>
  );
};

export default page;
