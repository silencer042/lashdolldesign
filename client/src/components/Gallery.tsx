import { motion } from "framer-motion";

const galleryImages = [
  {
    id: 1,
    src: "https://pixabay.com/get/g1dabeaf62926e5f77d02787928a9eaf4a7b60a0b48397fa26b6fec8deb39a07ed3e5c08784b37284622cc117982caa9ef0d50ec05d88705cf8b148babbc87eb1_1280.jpg",
    alt: "Eyelash Extensions"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
    alt: "Volume Lashes"
  },
  {
    id: 3,
    src: "https://pixabay.com/get/g68cefa0088ca6c4ef0d52224053b1d792a5a01798318f5c00b76cd6360b76687d543b838a75f597cdcadb271a89687ee000d278294be3ce54c67d3e62f51190e_1280.jpg",
    alt: "Natural Lashes"
  },
  {
    id: 4,
    src: "https://pixabay.com/get/gf698cb93ebf58ac89bf34e31e99ee80133449f22499635f5b542c9a183902e3303bb842b65102fe768c71c030aa955b09edaac72fc51b082bd8cee0a63b962dd_1280.jpg",
    alt: "Hybrid Lashes"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
    alt: "Microblading"
  },
  {
    id: 6,
    src: "https://pixabay.com/get/g094ae382722b652273dc7f8164bd116dbf982d070f1f6841df306a8301ce8a78f560df45e4a2ff2c3a267c7be67c0dd7ba9523ac38e075cef4de61389d471910_1280.jpg",
    alt: "Lip Enhancement"
  }
];

export default function Gallery() {
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

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center font-serif mb-4">Our Work</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Browse through our gallery to see the stunning transformations we create for our clients.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {galleryImages.map((image) => (
            <motion.div 
              key={image.id}
              variants={itemVariants}
              className="overflow-hidden rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110" 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
