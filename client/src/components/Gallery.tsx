import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    src: "/gallery1.jpg",
    alt: "Classic Lashes",
    category: "classic"
  },
  {
    id: 2,
    src: "/gallery4.jpg",
    alt: "Volume Lashes",
    category: "volume"
  },
  {
    id: 3,
    src: "/gallery7.jpg",
    alt: "Natural Lashes",
    category: "classic"
  },
  {
    id: 4,
    src: "/gallery9.jpg",
    alt: "Hybrid Lashes",
    category: "hybrid"
  },
  {
    id: 5,
    src: "/gallery5.jpg",
    alt: "Lip Enhancement",
    category: "lips"
  },
  {
    id: 6,
    src: "/gallery6.jpg",
    alt: "Lip Enhancement",
    category: "lips"
  }
];

const categories = [
  { id: "all", label: "All Work" },
  { id: "classic", label: "Classic Lashes" },
  { id: "volume", label: "Volume Lashes" },
  { id: "hybrid", label: "Hybrid Lashes" },
  { id: "microblading", label: "Microblading" },
  { id: "lips", label: "Lip Enhancements" }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(image => image.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-accent/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center font-serif-italic mb-4">Our Work</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            Browse through our gallery to see the stunning transformations we create for our clients.
          </p>
        </motion.div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-primary text-white font-medium"
                  : "bg-secondary/80 text-foreground hover:bg-primary/20"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={activeCategory} // Re-render animation when category changes
        >
          {filteredImages.map((image) => (
            <motion.div 
              key={image.id}
              variants={itemVariants}
              className="overflow-hidden rounded-xl soft-shadow group relative cursor-pointer"
              onClick={() => setSelectedImage(image.src)}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-80 object-cover transition-all duration-700 hover:scale-110 group-hover:brightness-90" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-medium">{image.alt}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-primary/20 backdrop-blur-sm p-3 rounded-full">
                  <i className="fas fa-search text-white text-lg"></i>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram Integration Note */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg">
            <span className="font-medium">Follow us on Instagram</span> <a href="https://www.instagram.com/lashdollnottingham/" target="_blank" rel="noreferrer" className="text-primary">@lashdollnottingham</a> for more inspiration
          </p>
          <div className="flex items-center justify-center mt-2 gap-2">
            <a href="https://www.instagram.com/lashdollnottingham/" target="_blank" rel="noreferrer" className="text-primary hover:text-primary/80">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-primary"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="w-full h-auto max-h-[80vh] object-contain" 
            />
          </div>
        </div>
      )}
    </section>
  );
}
