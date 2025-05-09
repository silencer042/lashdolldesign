import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      const result = await storage.createContactMessage(data);
      res.status(201).json({ 
        success: true, 
        message: "Contact message received successfully" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Failed to submit contact form" 
      });
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const data = insertNewsletterSchema.parse(req.body);
      const result = await storage.subscribeToNewsletter(data);
      res.status(201).json({ 
        success: true, 
        message: "Successfully subscribed to newsletter" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid email", 
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Failed to subscribe to newsletter" 
      });
    }
  });

  const httpServer = createServer(app);
  
  return httpServer;
}
