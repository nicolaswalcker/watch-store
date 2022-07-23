<template>
  <main class="my-8">
    <div v-if="errorMessage === ''" class="container mx-auto px-6">
      <h3 class="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
      <span class="mt-3 text-sm text-gray-500">200+ Products</span>
      <div
        class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6"
      >
        <product-card
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
    <div v-else role="alert" class="mx-4 w-auto">
      <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        Erro
      </div>
      <div
        class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"
      >
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import ProductCard from '@/components/ProductCard';
export default {
  name: 'TheIndex',
  components: { ProductCard },
  data() {
    return {
      products: [],
      errorMessage: '',
    };
  },
  async created() {
    try {
      this.products = (await this.$axios.get('/api/products')).data.products;
    } catch (error) {
      this.errorMessage = 'Problemas ao carregar a lista!';
    }
  },
};
</script>
