import { 
  users, type User, type InsertUser,
  contactMessages, type ContactMessage, type InsertContact,
  newsletter, type Newsletter, type InsertNewsletter
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContact): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  subscribeToNewsletter(data: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscribers(): Promise<Newsletter[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private newsletterSubscribers: Map<number, Newsletter>;
  private userId: number;
  private messageId: number;
  private subscriberId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.newsletterSubscribers = new Map();
    this.userId = 1;
    this.messageId = 1;
    this.subscriberId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(message: InsertContact): Promise<ContactMessage> {
    const id = this.messageId++;
    const now = new Date().toISOString();
    const contactMessage: ContactMessage = { 
      ...message, 
      id, 
      createdAt: now 
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async subscribeToNewsletter(data: InsertNewsletter): Promise<Newsletter> {
    // Check if email already exists
    const existingSubscriber = Array.from(this.newsletterSubscribers.values()).find(
      (sub) => sub.email === data.email
    );
    
    if (existingSubscriber) {
      return existingSubscriber;
    }
    
    const id = this.subscriberId++;
    const now = new Date().toISOString();
    const subscriber: Newsletter = {
      ...data,
      id,
      createdAt: now
    };
    this.newsletterSubscribers.set(id, subscriber);
    return subscriber;
  }

  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    return Array.from(this.newsletterSubscribers.values());
  }
}

export const storage = new MemStorage();
