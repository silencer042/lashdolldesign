import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Clock, Star, Info, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";

// Define interfaces for our data structures
interface ServiceCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface BaseService {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: string;
  duration: string;
  icon: React.ReactNode;
  benefits: string[];
  aftercare: string[];
  image: string;
}

interface MicrobladingService extends BaseService {
  precare: string[];
}

interface FillerService extends BaseService {
  contraindications: string[];
}

type Service = BaseService | MicrobladingService | FillerService;

// Type guards
function hasPrecareInstructions(service: Service): service is MicrobladingService {
  return 'precare' in service && Array.isArray((service as MicrobladingService).precare);
}

function hasContraindications(service: Service): service is FillerService {
  return 'contraindications' in service && Array.isArray((service as FillerService).contraindications);
}

// Service categories
const categories: ServiceCategory[] = [
  { id: "lashes", label: "Lashes", icon: <i className="fas fa-eye text-accent"></i> },
  { id: "microblading", label: "Microblading & Brows", icon: <i className="fas fa-paint-brush text-accent"></i> },
  { id: "facials", label: "Facial Treatments", icon: <i className="fas fa-spa text-accent"></i> },
  { id: "anti-wrinkle", label: "Anti-Wrinkle & Fillers", icon: <i className="fas fa-magic text-accent"></i> },
];

// All services
const allServices = {
  lashes: [
    {
      id: "classic-lashes",
      title: "Classic Lashes",
      description: "Enhance your natural beauty with our individually applied classic lashes, customized for your unique eye shape.",
      longDescription: "Our classic lash extensions involve attaching one single extension to one natural lash, creating a naturally enhanced look. Ideal for those who want a subtle enhancement or are new to lash extensions.",
      price: "From £65",
      duration: "90 minutes",
      icon: <i className="fas fa-eye"></i>,
      benefits: ["Natural-looking results", "Enhances your natural lashes", "Customized to your eye shape"],
      aftercare: ["Avoid water and steam for 24 hours", "Use oil-free products around eyes", "Don't rub or pull lashes"],
      image: "@assets/Classic lashes.png"
    },
    {
      id: "volume-lashes",
      title: "Volume Lashes",
      description: "Create a dramatic, full look with our volume lashes that give a fluffy, textured effect to your lash line.",
      longDescription: "Volume lashes involve attaching multiple ultra-light extensions to each natural lash, creating a fuller, more dramatic effect. Perfect for those wanting a glamorous, eye-catching look.",
      price: "From £85",
      duration: "120 minutes",
      icon: <i className="fas fa-fan"></i>,
      benefits: ["Dramatic, fuller appearance", "Customizable volume", "Lightweight comfort"],
      aftercare: ["Avoid oil-based products", "Gentle cleansing daily", "Regular infills every 2-3 weeks"],
      image: "@assets/Volume lashes.png"
    },
    {
      id: "hybrid-lashes",
      title: "Hybrid Lashes",
      description: "The perfect balance between classic and volume, our hybrid lashes offer a textured, dimensional look.",
      longDescription: "Hybrid lashes combine both classic and volume techniques for a naturally fuller look with added dimension and texture. Ideal for those who want more than classics but not the full drama of volumes.",
      price: "From £75",
      duration: "110 minutes",
      icon: <i className="fas fa-star-half-alt"></i>,
      benefits: ["Natural fullness with texture", "Custom ratio for your desired look", "Best of both classic and volume"],
      aftercare: ["Avoid oil-based skincare", "No rubbing or pulling", "Regular infills every 2-3 weeks"],
      image: "@assets/Hybrid lashes.png"
    },
    {
      id: "lash-infills",
      title: "Lash Infills",
      description: "Maintain your beautiful lash extensions with our infill service, keeping your lashes looking fresh and full.",
      longDescription: "Our lash infill service maintains your existing extensions by filling in any gaps where extensions have shed with your natural lash cycle. Recommended every 2-3 weeks to keep your lashes looking perfect.",
      price: "From £45",
      duration: "60 minutes",
      icon: <RefreshCw size={18} />,
      benefits: ["Maintains fullness", "More economical than a full set", "Extends the life of your lash extensions"],
      aftercare: ["Same aftercare as full sets", "Schedule regular infills", "Gentle cleansing to extend longevity"],
      image: "@assets/Lash infills.png"
    },
    {
      id: "lash-lift",
      title: "Lash Lift & Tint",
      description: "Enhance your natural lashes with a lift and tint that curls and darkens for a mascara-like effect.",
      longDescription: "A lash lift curls your natural lashes from base to tip, while the tint darkens them for a mascara-like effect. This treatment is perfect for those who want to enhance their natural lashes without extensions.",
      price: "£50",
      duration: "45 minutes",
      icon: <i className="fas fa-arrow-up"></i>,
      benefits: ["No maintenance required", "Lasts 6-8 weeks", "Enhances natural lashes"],
      aftercare: ["Keep lashes dry for 24 hours", "Avoid oil-based products", "No rubbing or harsh cleansers"],
      image: "@assets/lash lift & tint.png"
    }
  ],
  microblading: [
    {
      id: "microblading",
      title: "Microblading",
      description: "Achieve perfectly shaped, natural-looking brows with our precision microblading technique.",
      longDescription: "Microblading is a semi-permanent technique where a specialized hand tool is used to draw individual hair-like strokes in the brow area, implanting pigment into the skin. The result is natural-looking, fuller brows that can last 1-2 years with proper care.",
      price: "£250",
      duration: "120 minutes",
      icon: <i className="fas fa-paint-brush"></i>,
      benefits: ["Natural-looking results", "Customized shape and color", "Semi-permanent (1-2 years)"],
      aftercare: ["Keep area dry for 7-10 days", "Avoid sun exposure", "No makeup on the area during healing"],
      precare: ["Avoid blood thinners", "No alcohol 24 hours before", "No tanning or sunburn"],
      image: "@assets/Microblading.png"
    },
    {
      id: "microblading-touchup",
      title: "Microblading Touch-Up",
      description: "Refresh your microbladed brows to maintain their perfect shape and color.",
      longDescription: "A microblading touch-up is recommended 6-8 weeks after your initial treatment to perfect the color and shape. After that, annual touch-ups help maintain your microbladed brows as the pigment fades over time.",
      price: "From £100",
      duration: "90 minutes",
      icon: <i className="fas fa-sync-alt"></i>,
      benefits: ["Perfects initial results", "Extends longevity", "Adjusts color as needed"],
      aftercare: ["Same aftercare as initial treatment", "Avoid excessive sweating", "Protect from sun exposure"],
      image: "@assets/Microblading touch-up.png"
    },
    {
      id: "brow-lamination",
      title: "Brow Lamination",
      description: "Tame unruly brows and create a sleek, brushed-up look with our brow lamination treatment.",
      longDescription: "Brow lamination is a process of restructuring the brow hairs to keep them in the desired shape. The treatment straightens and lifts the hairs, creating a fuller, more defined look that lasts 4-6 weeks.",
      price: "£45",
      duration: "45 minutes",
      icon: <i className="fas fa-magic"></i>,
      benefits: ["Tames unruly brows", "Creates fuller appearance", "Lasts 4-6 weeks"],
      aftercare: ["Keep brows dry for 24 hours", "Avoid makeup and skincare on brows", "Apply conditioning serum"],
      image: "@assets/Brow Lamination.png"
    }
  ],
  facials: [
    {
      id: "dermaplaning",
      title: "Dermaplaning",
      description: "Exfoliate dead skin cells and remove peach fuzz for a smoother, brighter complexion.",
      longDescription: "Dermaplaning is a exfoliation treatment that removes dead skin cells and vellus hair (peach fuzz) using a specialized surgical blade. This results in a smoother skin texture, better product absorption, and a radiant complexion.",
      price: "£60",
      duration: "45 minutes",
      icon: <i className="fas fa-sparkles"></i>,
      benefits: ["Removes peach fuzz", "Immediately smoother skin", "Enhanced product absorption"],
      aftercare: ["Avoid sun exposure", "Use gentle skincare products", "Apply SPF daily"],
      image: "@assets/Dermaplaning.png"
    },
    {
      id: "microneedling",
      title: "Microneedling",
      description: "Stimulate collagen production and improve skin texture with our advanced microneedling treatment.",
      longDescription: "Microneedling involves creating controlled micro-injuries to the skin using fine needles, which stimulates the body's natural wound healing process. This results in increased collagen and elastin production, improving skin texture, reducing scars, and rejuvenating the skin.",
      price: "£120",
      duration: "60 minutes",
      icon: <i className="fas fa-syringe"></i>,
      benefits: ["Reduces fine lines", "Improves acne scars", "Stimulates collagen production"],
      aftercare: ["Avoid sun exposure", "No makeup for 24 hours", "Use gentle, hydrating products"],
      image: "@assets/Microneedling.png"
    },
    {
      id: "glass-skin",
      title: "Glass Skin Facial",
      description: "Achieve the coveted dewy, poreless 'glass skin' look with our specialized Korean-inspired facial.",
      longDescription: "Our Glass Skin Facial combines multiple steps inspired by Korean skincare routines, including double cleansing, exfoliation, essence application, and intensive hydration. The result is luminous, translucent skin with a poreless, dewy finish.",
      price: "£85",
      duration: "75 minutes",
      icon: <i className="fas fa-gem"></i>,
      benefits: ["Intense hydration", "Dewy, luminous finish", "Refined pore appearance"],
      aftercare: ["Continue hydration routine", "Use lightweight products", "Apply SPF daily"],
      image: "@assets/Glass Skin Facial.png"
    }
  ],
  "anti-wrinkle": [
    {
      id: "botox",
      title: "Anti-Wrinkle Treatment",
      description: "Reduce the appearance of fine lines and wrinkles with our professional anti-wrinkle injections.",
      longDescription: "Our anti-wrinkle injections use botulinum toxin to temporarily relax facial muscles that cause wrinkles. This non-surgical treatment smooths existing lines and prevents new ones from forming, giving you a refreshed, youthful appearance.",
      price: "From £180",
      duration: "30 minutes",
      icon: <i className="fas fa-wind"></i>,
      benefits: ["Smooths fine lines", "Prevents new wrinkles", "Natural-looking results"],
      aftercare: ["No lying down for 4 hours", "Avoid exercise for 24 hours", "No facial massages for 2 weeks"],
      image: "@assets/Anti-Wrinkle Treatment.png"
    },
    {
      id: "lip-fillers",
      title: "Lip Fillers",
      description: "Enhance your lips with our safe, effective dermal fillers for added volume and definition.",
      longDescription: "Our lip filler treatments use hyaluronic acid dermal fillers to add volume, improve shape, and enhance definition of the lips. The procedure is customized to your desired look, from subtle enhancement to a more dramatic transformation.",
      price: "From £200",
      duration: "45 minutes",
      icon: <i className="fas fa-kiss"></i>,
      benefits: ["Customizable volume", "Defined lip contour", "Results last 6-12 months"],
      aftercare: ["Apply ice to reduce swelling", "Avoid extreme heat", "No strenuous exercise for 24 hours"],
      contraindications: ["Pregnancy or breastfeeding", "Active skin infections", "Certain autoimmune disorders"],
      image: "@assets/Lip Fillers.png"
    },
    {
      id: "dermal-fillers",
      title: "Dermal Fillers",
      description: "Restore lost volume and contour facial features with our premium dermal filler treatments.",
      longDescription: "Dermal fillers use hyaluronic acid to restore lost volume, smooth lines, and enhance facial contours. Our skilled practitioners customize each treatment to achieve natural-looking results that complement your unique features.",
      price: "From £250",
      duration: "60 minutes",
      icon: <i className="fas fa-magic"></i>,
      benefits: ["Immediate results", "Natural-looking volume", "Reduced appearance of lines"],
      aftercare: ["Avoid makeup for 12 hours", "No alcohol for 24 hours", "Avoid sun exposure"],
      image: "@assets/Dermal Fillers.png"
    }
  ]
};

// Define a type for service bundles
type ServiceBundle = {
  id: string;
  title: string;
  description: string;
  price: string;
  saving: string;
  services: string[];
  duration: string;
  image: string;
};

// Service bundles
const serviceBundles: ServiceBundle[] = [
  {
    id: "lash-brow-bundle",
    title: "Lash & Brow Bundle",
    description: "Our most popular combination: Lash Lift & Tint paired with Brow Lamination for the ultimate eye transformation.",
    price: "£85",
    saving: "Save £10",
    services: ["Lash Lift & Tint", "Brow Lamination"],
    duration: "90 minutes",
    image: "@assets/Lash & Brow Bundle.png"
  },
  {
    id: "facial-botox-bundle",
    title: "Rejuvenation Package",
    description: "Combine our Glass Skin Facial with Anti-Wrinkle Treatment for complete facial rejuvenation.",
    price: "£230",
    saving: "Save £35",
    services: ["Glass Skin Facial", "Anti-Wrinkle Treatment (1 area)"],
    duration: "105 minutes",
    image: "@assets/Rejuvenation Package.png"
  }
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("lashes");
  const [activeService, setActiveService] = useState<string | null>(null);
  const [showPackages, setShowPackages] = useState(false);

  const toggleService = (serviceId: string) => {
    setActiveService(activeService === serviceId ? null : serviceId);
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-secondary/30 to-background bg-soft-texture">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center font-serif-italic mb-4">Our Luxury Services</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Experience the ultimate pampering with our premium beauty services tailored just for you.
          </p>
        </motion.div>
        
        {/* Category Tabs */}
        <Tabs 
          defaultValue="lashes" 
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="mb-12"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-secondary/50 p-1 rounded-full">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="px-6 py-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
                >
                  <span className="flex items-center">
                    <span className="mr-2">{category.icon}</span>
                    {category.label}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {/* Category Content */}
          {categories.map((category) => (
            <TabsContent 
              key={category.id} 
              value={category.id}
              className="focus:outline-none"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allServices[category.id as keyof typeof allServices].map((service, index) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        className="flex flex-col h-full"
                      >
                        <Card className="service-card-hover bg-white border-none overflow-hidden h-full rounded-xl soft-shadow flex flex-col">
                          <div className="relative overflow-hidden">
                            <img 
                              src={service.image} 
                              alt={service.title} 
                              className="w-full h-64 object-cover transition-all duration-700 hover:scale-110"
                            />
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-accent text-accent-foreground font-medium px-3 py-1 shimmer">
                                <Clock size={14} className="mr-1" /> {service.duration}
                              </Badge>
                            </div>
                          </div>
                          <CardHeader className="pt-6">
                            <CardTitle className="text-2xl font-serif-italic flex items-center">
                              <span className="mr-3 text-accent">{service.icon}</span>
                              {service.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                            <p className="font-semibold text-primary text-lg mb-4">{service.price}</p>
                            
                            <Button
                              variant="outline"
                              onClick={() => toggleService(service.id)}
                              className="w-full border-accent/30 text-accent-foreground hover:bg-accent/10 rounded-lg mb-4"
                            >
                              <span className="flex items-center justify-center">
                                <Info size={16} className="mr-2" />
                                {activeService === service.id ? "Hide Details" : "View Details"}
                                {activeService === service.id ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
                              </span>
                            </Button>
                            
                            <AnimatePresence>
                              {activeService === service.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="text-sm text-foreground/80 bg-secondary/30 p-4 rounded-lg mb-4">
                                    <p className="mb-4">{service.longDescription}</p>
                                    
                                    <h4 className="font-semibold text-foreground mb-2">Benefits:</h4>
                                    <ul className="mb-4">
                                      {service.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start mb-1">
                                          <Check size={14} className="text-primary mr-2 mt-1 flex-shrink-0" />
                                          <span>{benefit}</span>
                                        </li>
                                      ))}
                                    </ul>
                                    
                                    <h4 className="font-semibold text-foreground mb-2">Aftercare:</h4>
                                    <ul>
                                      {service.aftercare.map((item, i) => (
                                        <li key={i} className="flex items-start mb-1">
                                          <Star size={14} className="text-accent mr-2 mt-1 flex-shrink-0" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                    
                                    {hasPrecareInstructions(service) && (
                                      <>
                                        <h4 className="font-semibold text-foreground mb-2 mt-4">Before your appointment:</h4>
                                        <ul>
                                          {service.precare.map((item, i) => (
                                            <li key={i} className="flex items-start mb-1">
                                              <Info size={14} className="text-primary mr-2 mt-1 flex-shrink-0" />
                                              <span>{item}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </>
                                    )}
                                    
                                    {hasContraindications(service) && (
                                      <>
                                        <h4 className="font-semibold text-foreground mb-2 mt-4">Not recommended if:</h4>
                                        <ul>
                                          {service.contraindications.map((item, i) => (
                                            <li key={i} className="flex items-start mb-1">
                                              <i className="fas fa-exclamation-circle text-primary mr-2 mt-1"></i>
                                              <span>{item}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              asChild
                              className="w-full bg-gradient-gold hover:bg-accent text-accent-foreground font-medium rounded-full py-6 btn-glow gold-glow"
                            >
                              <a href="#book-now">Book Now</a>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

        {/* Service Packages/Bundles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold font-serif-italic">Special Service Bundles</h3>
            <Button
              variant="ghost"
              onClick={() => setShowPackages(!showPackages)}
              className="text-primary hover:text-primary/80 hover:bg-primary/5"
            >
              {showPackages ? "Hide Packages" : "View Packages"}
              {showPackages ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
            </Button>
          </div>
          
          <AnimatePresence>
            {showPackages && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  {serviceBundles.map((bundle, index) => (
                    <motion.div
                      key={bundle.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      <Card className="service-card-hover border-none overflow-hidden rounded-xl soft-shadow bg-gradient-to-r from-accent/5 to-primary/5">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-2/5">
                            <img 
                              src={bundle.image} 
                              alt={bundle.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="md:w-3/5 p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-xl font-serif-italic font-bold">{bundle.title}</h4>
                              <Badge className="bg-primary text-white px-3 py-1">{bundle.saving}</Badge>
                            </div>
                            <p className="text-muted-foreground mb-4">{bundle.description}</p>
                            <div className="mb-4">
                              <p className="font-semibold mb-2">Includes:</p>
                              <ul>
                                {bundle.services.map((service, i) => (
                                  <li key={i} className="flex items-center mb-1">
                                    <Check size={16} className="text-accent mr-2" />
                                    <span>{service}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                              <div>
                                <p className="text-lg font-bold text-primary">{bundle.price}</p>
                                <p className="text-sm flex items-center text-foreground/70">
                                  <Clock size={14} className="mr-1" /> {bundle.duration}
                                </p>
                              </div>
                              <Button 
                                asChild
                                className="bg-gradient-gold hover:bg-accent text-accent-foreground font-medium rounded-full gold-glow"
                              >
                                <a href="#book-now">Book Bundle</a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* FAQ/Additional Info */}
        <motion.div
          className="mt-16 bg-white rounded-2xl p-8 soft-shadow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold font-serif-italic text-center mb-6">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium">How long do lash extensions last?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Lash extensions typically last for the natural growth cycle of your lashes, which is about 6-8 weeks. However, as your natural lashes fall out and new ones grow in, the extensions will gradually thin out. We recommend getting infills every 2-3 weeks to maintain a full look.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium">Is microblading painful?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We apply a topical numbing cream before the procedure to minimize discomfort. Most clients describe the sensation as a light scratching feeling. Comfort levels vary from person to person, but the procedure is generally well-tolerated.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium">How should I prepare for my appointment?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                For lash appointments, come with clean lashes and no eye makeup. For microblading, avoid alcohol, caffeine, and blood thinners for 24 hours prior. For facial treatments, avoid retinol products for 3-5 days before your appointment. Specific instructions will be provided when you book.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium">Do you offer patch tests?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, we offer and recommend patch tests for all our treatments that involve dyes, tints, or other products that may cause allergic reactions. These should be done at least 48 hours before your appointment.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        {/* Consultation Note */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="italic text-lg text-foreground/80">
            All our services include a professional consultation to ensure we create your perfect look.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button
              asChild
              className="bg-gradient-gold hover:bg-accent text-accent-foreground font-medium rounded-full px-8 py-6 gold-glow"
            >
              <a href="#book-now">Book Appointment</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 rounded-full px-8 py-6 hover-glow"
            >
              <a href="#contact">Request Custom Service</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
