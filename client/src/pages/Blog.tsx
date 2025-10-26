import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import type { Blog } from "@shared/schema";
import { format } from "date-fns";
import { SEO } from "@/components/SEO";
import { pagesSEO } from "@/lib/seo-config";

export default function Blog() {
  const { data: blogs, isLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={pagesSEO.blog.title}
        description={pagesSEO.blog.description}
        keywords={pagesSEO.blog.keywords}
      />
      <Navigation />
      
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-purple-500/10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Our Blog
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Insights, trends, and expert perspectives on technology, innovation, and digital transformation.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden animate-pulse">
                    <div className="aspect-video bg-muted" />
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-muted rounded w-1/3" />
                      <div className="h-6 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : blogs && blogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <Card 
                    key={blog.id} 
                    className="overflow-hidden hover:shadow-xl transition-all border-2 hover:border-primary/30 flex flex-col"
                    data-testid={`card-blog-${blog.slug}`}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                        data-testid={`img-blog-${blog.slug}`}
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 self-start">
                        {blog.category}
                      </div>
                      <h3 className="text-2xl font-bold mb-3 line-clamp-2" data-testid={`text-blog-title-${blog.slug}`}>
                        {blog.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 line-clamp-3 flex-1">
                        {blog.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(blog.publishedAt), 'MMM dd, yyyy')}</span>
                        </div>
                      </div>

                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                          <Tag className="w-4 h-4 text-muted-foreground" />
                          {blog.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link href={`/blog/${blog.slug}`}>
                        <Button className="w-full group" data-testid={`button-read-${blog.slug}`}>
                          <span className="flex items-center gap-2">
                            Read More
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">No blog posts available yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
