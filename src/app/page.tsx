'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { ProductDetailModal } from '@/components/product-detail-modal'
import { CartDrawer } from '@/components/cart-drawer'
import { CheckoutModal } from '@/components/checkout-modal'
import { TryOnModal } from '@/components/try-on-modal'
import { ContactModal } from '@/components/contact-modal'
import { VideoModal } from '@/components/video-modal'
import { ArrowRight, Sparkles, Truck, Shield, RefreshCw, Star, Play, ChevronRight, Zap, Diamond, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart'

interface Product {
  id: string
  name: string
  description: string
  category: string
  cloth_type: string
  price: number
  image_1: string
  image_2?: string
  image_3?: string
  sizes: string[]
  colors: string[]
  featured?: boolean
  stock?: number
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [clothType, setClothType] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  
  // Try-on modal state
  const [isTryOnModalOpen, setIsTryOnModalOpen] = useState(false)
  const [tryOnProduct, setTryOnProduct] = useState<Product | null>(null)

  // Video modal state
  const openVideo = useCartStore((state) => state.openVideo)

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const clothTypeParam = clothType !== 'all' ? `&cloth_type=${clothType}` : ''
        const [allRes, featuredRes] = await Promise.all([
          fetch(`/api/products?category=all${clothTypeParam}`),
          fetch('/api/products?featured=true'),
        ])
        const allData = await allRes.json()
        const featuredData = await featuredRes.json()
        setProducts(allData)
        setFeaturedProducts(featuredData)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [clothType])

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const handleOpenTryOn = (product: Product) => {
    setTryOnProduct(product)
    setIsTryOnModalOpen(true)
    setIsProductModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Header
        currentCategory={clothType}
        onCategoryChange={setClothType}
      />
      
      <main className="flex-1 pt-20">
        {/* Hero Section - Luxury Black Gradient */}
        <section className="relative overflow-hidden min-h-[90vh] lg:min-h-[85vh] bg-gradient-to-br from-black via-zinc-950 to-neutral-950">
          {/* Luxury Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
          
          {/* Luxury Glow Effects */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-slate-400/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
          
          {/* Silver Accent Lines */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          {/* Corner Decorations */}
          <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-white/20 rounded-tl-xl" />
          <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-white/20 rounded-tr-xl" />
          <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-white/20 rounded-bl-xl" />
          <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-white/20 rounded-br-xl" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            {/* Desktop Hero */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[85vh] py-12">
              {/* Left Content - Desktop Only */}
              <div className="space-y-6 lg:space-y-8">
                {/* Luxury Badge */}
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                  <Crown className="w-4 h-4 text-slate-300" />
                  <span className="text-sm font-medium tracking-wider text-slate-200">EXCLUSIVE COLLECTION</span>
                  <Diamond className="w-4 h-4 text-slate-300" />
                </div>
                
                {/* Main Heading */}
                <div className="space-y-4">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight">
                    <span className="block text-white">Premium</span>
                    <span className="block bg-gradient-to-r from-white via-slate-300 to-slate-400 bg-clip-text text-transparent">
                      Hoodies
                    </span>
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-white to-slate-400 rounded-full" />
                  <p className="text-lg sm:text-xl text-gray-300 max-w-lg leading-relaxed font-light">
                    Discover our exclusive collection of premium hoodies crafted for the discerning individual. Experience luxury with AI-powered personalization.
                  </p>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button
                    onClick={() => window.location.href = '/upper'}
                    className="group relative h-14 px-10 rounded-full bg-white text-black font-semibold text-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-white/20 hover:scale-[1.02]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Explore Collection
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-14 px-8 rounded-full border-white/30 hover:bg-white/10 hover:border-white/50 font-semibold text-lg bg-transparent text-white backdrop-blur-sm"
                    onClick={openVideo}
                  >
                    <Play className="w-5 h-5 mr-2 text-slate-300" />
                    Watch Video
                  </Button>
                </div>
                

              </div>
              
              {/* Right Content - Product Showcase */}
              <div className="relative hidden lg:block">
                <div className="relative">
                  {/* Main Product Image */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-black/40 z-10" />
                    <Image
                      src="https://images2.imgbox.com/d1/9b/TnaPdGDW_o.jpeg"
                      alt="Midnight Hoodie"
                      fill
                      sizes="(max-width: 1024px) 0vw, 50vw"
                      className="object-cover"
                    />
                    {/* Product Label */}
                    <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full">
                      <span className="text-xs tracking-widest text-slate-300">SIGNATURE PIECE</span>
                    </div>
                    {/* Price Tag */}
                    <div className="absolute bottom-6 right-6 z-20 px-5 py-3 bg-white rounded-full">
                      <span className="text-xl font-bold text-black">$85</span>
                    </div>
                  </div>
                  
                  {/* Floating Secondary Images */}
                  <div className="absolute -right-6 top-24 w-36 aspect-square rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 bg-black">
                    <Image
                      src="https://images2.imgbox.com/08/fb/ecSCAKuT_o.png"
                      alt="Hoodie Detail"
                      fill
                      sizes="144px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  
                  <div className="absolute -left-6 bottom-32 w-32 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 bg-black">
                    <Image
                      src="https://images2.imgbox.com/b2/d2/c5ehDVjh_o.png"
                      alt="Flight Hoodie"
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -right-12 top-12 w-20 h-20 border border-white/10 rounded-full" />
                  <div className="absolute -left-12 bottom-20 w-16 h-16 border border-white/10 rounded-full" />
                </div>
              </div>
            </div>

            {/* Mobile Hero - Luxury Card Design */}
            <div className="lg:hidden min-h-[85vh] flex flex-col justify-center py-6">
              {/* Centered Badge */}
              <div className="flex justify-center pb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                  <Crown className="w-3 h-3 text-slate-300" />
                  <span className="text-[11px] font-medium tracking-wider text-slate-200">EXCLUSIVE</span>
                  <Diamond className="w-3 h-3 text-slate-300" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="flex">
                  {/* Left Side - Text Content */}
                  <div className="w-[40%] p-4 flex flex-col justify-between bg-gradient-to-b from-white/5 to-transparent">
                    <div>
                      <h3 className="text-xl font-bold text-white leading-tight">
                        Premium
                        <span className="block text-slate-300">Hoodies</span>
                      </h3>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-white to-transparent mt-2 rounded-full" />
                      <p className="text-xs text-gray-400 mt-3">
                        Luxury collection with AI try-on
                      </p>
                    </div>
                    
                    <div className="space-y-2 mt-6">
                      <Button
                        onClick={() => window.location.href = '/upper'}
                        className="w-full rounded-full bg-white text-black text-xs font-semibold py-2.5 h-9"
                      >
                        Shop Now
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full rounded-full border-white/30 text-xs py-2 h-9 bg-transparent text-white hover:bg-white/10"
                        onClick={openVideo}
                      >
                        <Play className="w-3 h-3 mr-1 text-slate-300" />
                        Watch Video
                      </Button>
                    </div>
                  </div>
                  
                  {/* Right Side - Image */}
                  <div className="w-[60%]">
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <Image
                        src="https://images2.imgbox.com/d1/9b/TnaPdGDW_o.jpeg"
                        alt="Hoodie Collection"
                        fill
                        sizes="(max-width: 640px) 60vw, 0vw"
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/60" />
                      <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-white rounded-full">
                        <span className="text-xs font-bold text-black">$85</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              

            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-8 lg:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <div>
                <h2 className="text-3xl font-bold text-black">Featured Hoodies</h2>
                <p className="text-gray-500 mt-2">Handpicked styles for you</p>
              </div>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/upper'}
                className="rounded-full hidden sm:flex border-gray-300 hover:bg-gray-100 text-black"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <div className="aspect-[3/4] bg-gray-100 rounded-2xl animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredProducts.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* All Hoodies */}
        <section className="py-8 lg:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 lg:mb-8">
              <h2 className="text-3xl font-bold text-black">
                {clothType === 'all' ? 'All Hoodies' : clothType}
              </h2>
              <p className="text-gray-500 mt-2">
                {products.length} {products.length === 1 ? 'item' : 'items'}
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <div className="aspect-[3/4] bg-gray-200 rounded-2xl animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found in this category</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 lg:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-black rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent)]" />
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent" />
              
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
                  Experience AI Try-On
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
                  See how any hoodie looks on you before making a purchase. 
                  Our AI technology creates realistic personalized previews instantly.
                </p>
                <Button
                  onClick={() => {
                    if (featuredProducts.length > 0) {
                      handleViewDetails(featuredProducts[0])
                    }
                  }}
                  className="rounded-full bg-white text-black hover:bg-gray-100 px-10 py-7 text-lg font-semibold transition-all hover:shadow-2xl hover:shadow-white/20"
                >
                  Try It Now
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 lg:py-16 border-t border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Truck className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-black">Free Shipping</h3>
                <p className="text-gray-500">On all orders over $150</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-black">Secure Payment</h3>
                <p className="text-gray-500">100% secure transactions</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <RefreshCw className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-black">Easy Returns</h3>
                <p className="text-gray-500">30-day return policy</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modals */}
      <CartDrawer />
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onTryOn={handleOpenTryOn}
      />
      <CheckoutModal />
      <ContactModal />
      <VideoModal />
      
      {/* Style Preview Modal */}
      {isTryOnModalOpen && tryOnProduct && (
        <TryOnModal
          productId={tryOnProduct.id}
          productName={tryOnProduct.name}
          productImage={tryOnProduct.image_3 || tryOnProduct.image_1}
          productDescription={tryOnProduct.description}
          productCategory={tryOnProduct.cloth_type}
          sizes={tryOnProduct.sizes}
          onClose={() => {
            setIsTryOnModalOpen(false)
            setTryOnProduct(null)
          }}
        />
      )}
    </div>
  )
}
