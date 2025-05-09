import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    src: "https://pixabay.com/get/g1dabeaf62926e5f77d02787928a9eaf4a7b60a0b48397fa26b6fec8deb39a07ed3e5c08784b37284622cc117982caa9ef0d50ec05d88705cf8b148babbc87eb1_1280.jpg",
    alt: "Eyelash Extensions",
    category: "classic"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
    alt: "Volume Lashes",
    category: "volume"
  },
  {
    id: 3,
    src: "https://pixabay.com/get/g68cefa0088ca6c4ef0d52224053b1d792a5a01798318f5c00b76cd6360b76687d543b838a75f597cdcadb271a89687ee000d278294be3ce54c67d3e62f51190e_1280.jpg",
    alt: "Natural Lashes",
    category: "classic"
  },
  {
    id: 4,
    src: "https://pixabay.com/get/gf698cb93ebf58ac89bf34e31e99ee80133449f22499635f5b542c9a183902e3303bb842b65102fe768c71c030aa955b09edaac72fc51b082bd8cee0a63b962dd_1280.jpg",
    alt: "Hybrid Lashes",
    category: "hybrid"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
    alt: "Microblading",
    category: "microblading"
  },
  {
    id: 6,
    src: "https://pixabay.com/get/g094ae382722b652273dc7f8164bd116dbf982d070f1f6841df306a8301ce8a78f560df45e4a2ff2c3a267c7be67c0dd7ba9523ac38e075cef4de61389d471910_1280.jpg",
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
            <span className="font-medium">Follow us on Instagram</span> <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-primary">@lashdollnottingham</a> for more inspiration
          </p>
          <div className="flex items-center justify-center mt-2 gap-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-primary hover:text-primary/80">
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
