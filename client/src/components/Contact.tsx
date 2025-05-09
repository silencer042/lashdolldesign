import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll be in touch soon.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center font-serif mb-4">Get In Touch</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            We'd love to hear from you! Book your appointment or send us a message.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Information */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full bg-accent/10 border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold font-serif mb-6">Contact Information</h3>
                
                <div className="flex items-start mb-6">
                  <div className="bg-primary rounded-full p-2 mr-4 mt-1 text-white">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Visit Us</h4>
                    <p className="text-foreground/80">15 Beauty Street, Nottingham, NG1 1AB</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-6">
                  <div className="bg-primary rounded-full p-2 mr-4 mt-1 text-white">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Call Us</h4>
                    <p className="text-foreground/80">+44 7123 456789</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-6">
                  <div className="bg-primary rounded-full p-2 mr-4 mt-1 text-white">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Us</h4>
                    <p className="text-foreground/80">info@lashdollnottingham.com</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold font-serif mt-8 mb-4">Opening Hours</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="font-semibold">Monday - Friday</p>
                    <p className="text-foreground/80">10:00 AM - 7:00 PM</p>
                  </div>
                  <div>
                    <p className="font-semibold">Saturday</p>
                    <p className="text-foreground/80">9:00 AM - 6:00 PM</p>
                  </div>
                  <div>
                    <p className="font-semibold">Sunday</p>
                    <p className="text-foreground/80">10:00 AM - 4:00 PM</p>
                  </div>
                </div>
                
                <div className="flex mt-8 space-x-4">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-primary hover:bg-primary/90 text-white rounded-full p-3 transition duration-300"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-primary hover:bg-primary/90 text-white rounded-full p-3 transition duration-300"
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a 
                    href="https://tiktok.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-primary hover:bg-primary/90 text-white rounded-full p-3 transition duration-300"
                    aria-label="TikTok"
                  >
                    <i className="fab fa-tiktok"></i>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="lg:w-1/2" 
            id="book-now"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full border-0 shadow-md">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold font-serif mb-6">Send Message</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your full name" 
                              {...field} 
                              className="w-full px-4 py-3 rounded-lg focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="Enter your email address" 
                              {...field} 
                              className="w-full px-4 py-3 rounded-lg focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Phone</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              placeholder="Enter your phone number" 
                              {...field} 
                              className="w-full px-4 py-3 rounded-lg focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Interest</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full px-4 py-3 rounded-lg focus:ring-primary">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="classic">Classic Lashes</SelectItem>
                              <SelectItem value="volume">Volume Lashes</SelectItem>
                              <SelectItem value="hybrid">Hybrid Lashes</SelectItem>
                              <SelectItem value="microblading">Microblading</SelectItem>
                              <SelectItem value="lips">Lip Enhancement</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us what you're looking for..." 
                              rows={4} 
                              {...field} 
                              className="w-full px-4 py-3 rounded-lg focus:ring-primary resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
