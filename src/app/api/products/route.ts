import { NextRequest, NextResponse } from 'next/server'

// Mock products data - Longxi Hoodie Collection
const mockProducts = [
  {
    id: '1',
    name: 'Flight Hoodie',
    description: 'Soft cotton fleece blend with a smooth finish, featuring a comfortable brushed interior for warmth and lightweight breathability.',
    category: 'hoodies',
    cloth_type: 'Hoodies',
    price: 120.00,
    image_1: 'https://images2.imgbox.com/b2/d2/c5ehDVjh_o.png',
    image_2: 'https://images2.imgbox.com/fc/88/qmdKGg4a_o.png',
    image_3: 'https://images2.imgbox.com/fc/88/qmdKGg4a_o.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black'],
    featured: true,
    stock: 50,
  },
  {
    id: '2',
    name: 'Desert Storm Hoodie',
    description: 'Mixed-media design featuring camo-print polyester blend on sleeves/hood with cream cotton fleece body, combining style and comfort with moisture-wicking properties.',
    category: 'hoodies',
    cloth_type: 'Hoodies',
    price: 120.00,
    image_1: 'https://images2.imgbox.com/c7/36/VDwJqatK_o.jpeg',
    image_2: 'https://images2.imgbox.com/7d/16/Ts4rTssi_o.png',
    image_3: 'https://images2.imgbox.com/7d/16/Ts4rTssi_o.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Brown', 'Tan'],
    featured: true,
    stock: 45,
  },
  {
    id: '3',
    name: 'Midnight Hoodie',
    description: 'Heavyweight cotton-polyester fleece with a slightly textured surface, offering durability and a relaxed, lived-in feel.',
    category: 'hoodies',
    cloth_type: 'Hoodies',
    price: 85.00,
    image_1: 'https://images2.imgbox.com/d1/9b/TnaPdGDW_o.jpeg',
    image_2: 'https://images2.imgbox.com/08/fb/ecSCAKuT_o.png',
    image_3: 'https://images2.imgbox.com/08/fb/ecSCAKuT_o.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    featured: true,
    stock: 40,
  },
  {
    id: '4',
    name: 'Sandstone Hoodie',
    description: 'Premium cotton-rich fleece with a silky-soft hand feel, mid-weight construction that\'s cozy without bulk.',
    category: 'hoodies',
    cloth_type: 'Hoodies',
    price: 85.00,
    image_1: 'https://images2.imgbox.com/2b/37/LbocARm5_o.jpeg',
    image_2: 'https://images2.imgbox.com/b5/02/s4Xfos9l_o.png',
    image_3: 'https://images2.imgbox.com/b5/02/s4Xfos9l_o.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Beige', 'Taupe'],
    featured: true,
    stock: 35,
  },
  {
    id: '5',
    name: 'Cloud Hoodie',
    description: 'Lightweight organic cotton fleece with an ultra-soft, plush texture and excellent drape for all-day comfort.',
    category: 'hoodies',
    cloth_type: 'Hoodies',
    price: 85.00,
    image_1: 'https://images2.imgbox.com/5f/a9/SCpcmimt_o.jpeg',
    image_2: 'https://images2.imgbox.com/5c/b1/NcKJS8NG_o.png',
    image_3: 'https://images2.imgbox.com/5c/b1/NcKJS8NG_o.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Cream', 'Off-White'],
    featured: true,
    stock: 30,
  },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')
  const clothType = searchParams.get('cloth_type')
  const featured = searchParams.get('featured')
  const id = searchParams.get('id')

  try {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const isSupabaseConfigured = supabaseUrl && !supabaseUrl.includes('your-supabase')

    if (!isSupabaseConfigured) {
      // Return mock data
      let filteredProducts = [...mockProducts]
      
      if (id) {
        const product = filteredProducts.find(p => p.id === id)
        return NextResponse.json(product || null)
      }
      
      // Filter by cloth_type (for page classification) - case insensitive
      if (clothType) {
        filteredProducts = filteredProducts.filter(p => p.cloth_type.toLowerCase() === clothType.toLowerCase())
      } else if (category && category !== 'all') {
        // Fallback to category filter for backward compatibility
        filteredProducts = filteredProducts.filter(p => p.category === category)
      }
      
      if (featured === 'true') {
        filteredProducts = filteredProducts.filter(p => p.featured)
      }

      return NextResponse.json(filteredProducts)
    }

    // Use Supabase if configured
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    if (id) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return NextResponse.json(data)
    }

    let query = supabase.from('products').select('*')

    // Filter by cloth_type (for page classification) - case insensitive
    if (clothType) {
      query = query.ilike('cloth_type', clothType)
    } else if (category && category !== 'all') {
      // Fallback to category filter for backward compatibility
      query = query.eq('category', category)
    }

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Products API error:', error)
    // Fallback to mock data on error
    let filteredProducts = [...mockProducts]
    
    if (id) {
      const product = filteredProducts.find(p => p.id === id)
      return NextResponse.json(product || null)
    }
    
    // Filter by cloth_type (for page classification) - case insensitive
    if (clothType) {
      filteredProducts = filteredProducts.filter(p => p.cloth_type.toLowerCase() === clothType.toLowerCase())
    } else if (category && category !== 'all') {
      // Fallback to category filter for backward compatibility
      filteredProducts = filteredProducts.filter(p => p.category === category)
    }
    
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(p => p.featured)
    }

    return NextResponse.json(filteredProducts)
  }
}
