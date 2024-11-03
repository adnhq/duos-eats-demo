'use client'

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import duosLogo from '../duos-lg.png'

export default function Footer() {
  const [email, setEmail] = useState('')

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61566033523024',
      icon: <Facebook size={24} />
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/duos.eats/',
      icon: <Instagram size={24} />
    }
  ]

  const quickLinks = [
    { name: 'Find Restaurants', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Partner with Us', href: '/registration' }
  ]

  return (
    <footer className="bg-white text-gray-800 py-16 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="relative w-48 h-32">
              <Image 
                src={duosLogo}
                alt="DUOS EATS Logo" 
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <p className="text-gray-600 leading-relaxed">
              Discover and book the best dine-in experiences at your favorite local restaurants.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-yellow-500 transition-colors"
                >
                  {social.icon}
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-6 text-gray-800">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-600 hover:text-yellow-500 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-6 text-gray-800">Get in Touch</h4>
            <p className="text-gray-600 mb-4">
              Have questions or feedback? We&apos;d love to hear from you!
            </p>
            <Button
              onClick={() => window.location.href = 'mailto:duos.eats@gmail.com'}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 transition-all"
            >
              Send Message
              <Send size={16} className="ml-2" />
            </Button>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Duos Eats. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}