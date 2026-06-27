"use client";

import Image from "next/image";
import Link from "next/link";
import { BLOGS } from "@/data/blogs";
import { getDoctorBySlug } from "@/data/doctors";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function BlogSliderSection() {
  if (BLOGS.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-[#003D52] md:text-3xl">Health & Wellness Insights</h2>
          <p className="mt-2 text-gray-600">Read the latest articles from our specialists</p>
        </div>

        <div className="relative px-8 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {BLOGS.map((blog) => {
                const author = getDoctorBySlug(blog.authorSlug);
                const date = new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <CarouselItem key={blog.slug} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg hover:border-[#1F4FD8]/30">
                      <div className="relative h-56 w-full overflow-hidden bg-[#E9F4FF]">
                        <Image
                          src={blog.thumbnail}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#008489]">
                          <span>{date}</span>
                          <span className="text-gray-400">•</span>
                          <span>{blog.readingTime}</span>
                        </div>
                        <h3 className="mb-3 text-lg font-bold leading-tight text-[#003D52] group-hover:text-[#1F4FD8]">
                          <Link href={`/blog/${blog.slug}`} className="focus:outline-none">
                            <span className="absolute inset-0" aria-hidden="true" />
                            {blog.title}
                          </Link>
                        </h3>
                        <p className="mb-6 flex-1 text-sm text-gray-600 leading-relaxed line-clamp-3">
                          {blog.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between border-t border-gray-100 pt-5 mt-auto">
                          <div className="flex items-center gap-2">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-gray-200">
                              {author ? (
                                <Image src={author.image} alt={author.name} fill className="object-cover" />
                              ) : (
                                <div className="h-full w-full bg-gray-200" />
                              )}
                            </div>
                            <span className="text-xs font-semibold text-[#003D52]">
                              {author ? author.name : "Prerna Hospital"}
                            </span>
                          </div>
                          
                          <Link 
                            href={`/blog/${blog.slug}`}
                            className="relative z-10 inline-flex items-center justify-center rounded-full bg-[#1A202C] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1F4FD8] group-hover:bg-[#1F4FD8]"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </article>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-8" />
            <CarouselNext className="-right-4 md:-right-8" />
          </Carousel>
        </div>
        
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-[#F4F7FB] px-6 py-3 text-sm font-semibold text-[#003D52] shadow-sm transition hover:bg-[#E9F4FF] hover:text-[#1F4FD8]"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
