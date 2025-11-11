import Navigation from '../components/Navigation';
  <Navigation />
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { allProducts, searchProducts } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { Search, Filter, ArrowLeft } from 'lucide-react';

const AllProducts = () => {
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Filter and search products
  const getFilteredProducts = () => {
    let filtered = searchQuery ? searchProducts(searchQuery) : allProducts;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const categories = [...new Set(allProducts.map(product => product.category))];

  const handleAddToCart = (product: any) => {
    addItem(product, 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 py-8 px-6">
        <div className="max-w-screen-2xl mx-auto">
          {/* Back Button and Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-4 p-2 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="text-center">
              <h1 className="text-4xl font-serif font-bold mb-4">All Products</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our complete collection of premium leather goods, handcrafted with excellence since 1998.
              </p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="price-low">Price (Low to High)</SelectItem>
                <SelectItem value="price-high">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {allProducts.length} products
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div onClick={() => navigate(`/product/${product.id}`)}>
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={product.featuredImage}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                          <Badge variant="outline" className="ml-2">
                            {product.category}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {product.shortDescription}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 pt-0">
                      <Button 
                        className="w-full" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllProducts;