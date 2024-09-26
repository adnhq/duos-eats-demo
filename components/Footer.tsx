'use client'

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, ArrowRight, Send } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import duosLogo from '../duos-lg.png'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Signed up with:', email)
    setEmail('')
  }

  return (
    <footer className="bg-white text-gray-800 py-16 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-48 h-32"
            >
              <Image 
                src={duosLogo}
                alt="DUOS EATS Logo" 
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </motion.div>
            <p className="text-gray-600 leading-relaxed">
              Discover and book the best dine-in experiences at your favorite local restaurants.
            </p>
            <div className="flex space-x-4">
              {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  {social === 'Facebook' && <Facebook size={24} />}
                  {social === 'Instagram' && <Instagram size={24} />}
                  {social === 'Twitter' && <Twitter size={24} />}
                  <span className="sr-only">{social}</span>
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-6 text-gray-800">Quick Links</h4>
            <ul className="space-y-4">
              {['Find Restaurants', 'Book a Table', 'About Us', 'Partner with Us', 'Help Center'].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Link href="#" className="flex items-center group text-gray-600 hover:text-yellow-500">
                    <ArrowRight size={16} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:underline">{item}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-6 text-gray-800">Get in Touch</h4>
            <p className="text-gray-600 mb-4">
              Have questions or feedback? We&apos;d love to hear from you!
            </p>
            <Button
              onClick={() => window.location.href = 'mailto:contact@duoseats.com'}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 transition-all"
            >
              Send Message
              <Send size={16} className="ml-2" />
            </Button>
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-200 text-center"
        >
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Duos Eats. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}