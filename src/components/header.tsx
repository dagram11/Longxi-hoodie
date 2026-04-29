'use client'

import { useState, useEffect, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart'
import { cn } from '@/lib/utils'

const categories = [
  { name: 'Hoodies', filter: 'Hoodies', href: '/upper' },
]

// Helper for hydration-safe client-side only rendering
const emptySubscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

interface HeaderProps {
  currentCategory?: string
  onCategoryChange?: (category: string) => void
  showFilters?: boolean
}

export function Header({ currentCategory = 'all', onCategoryChange, showFilters = true }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isMounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot)
  const itemCount = useCartStore((state) => state.getItemCount())
  const openCart = useCartStore((state) => state.openCart)
  const openContact = useCartStore((state) => state.openContact)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const showCartCount = isMounted && itemCount > 0

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-30 transition-all duration-500',
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-black/60 backdrop-blur-sm border-b border-white/5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="LIDYA FASHION"
              className="h-10 w-auto object-contain"
            />
            <span 
              className="text-xl font-bold tracking-tight text-white" 
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              LIDYA FASHION
            </span>
          </Link>

          {/* Desktop Navigation */}
          {showFilters && (
            <nav className="hidden lg:flex items-center gap-8">
              {categories.map((cat) => (
                <Link
                  key={cat.filter}
                  href={cat.href}
                  className={cn(
                    'text-sm font-semibold transition-colors relative py-2 tracking-wide',
                    currentCategory === cat.filter
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  )}
                >
                  {cat.name}
                  {currentCategory === cat.filter && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-white to-slate-400 rounded-full" />
                  )}
                </Link>
              ))}
              <button
                onClick={openContact}
                className="text-sm font-semibold text-white/70 hover:text-white transition-colors py-2 tracking-wide"
              >
                Contact
              </button>
            </nav>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/20"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {showCartCount && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/20"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && showFilters && (
          <div className="lg:hidden py-4 border-t border-white/10 bg-black/98 backdrop-blur-md absolute left-0 right-0 top-full shadow-2xl">
            <nav className="flex flex-col gap-2 px-4">
              {categories.map((cat) => (
                <Link
                  key={cat.filter}
                  href={cat.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-xl text-left text-sm font-semibold transition-colors border border-transparent',
                    currentCategory === cat.filter
                      ? 'bg-white/15 text-white border-white/20'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )}
                >
                  {cat.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  openContact()
                }}
                className="px-4 py-3 rounded-xl text-left text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
